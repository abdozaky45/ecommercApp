import mongoose, { Schema, model, Types } from "mongoose";
const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    products: [
      {
        _id: false,
        productId: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        orderName: String,
        itemPrice: Number,
        totalPrice: Number,
      },
    ],
    invoice: {
      secure_url: { type: String},
      public_id: { type: String},
    },
    price: { type: Number, required: true },
    address: { type: String, min: 10, required: true },
    phone: { type: String, required: true },
    coupon: {
      id: { type: Types.ObjectId, ref: "Coupon" },
      couponName: String,
      discount: { type: Number, min: 1, max: 100 },
    },
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered", "canceled", "refunded"],
      default: "placed",
    },
    payment: {
      type: String,
      enum: ["visa", "cash"],
      default: "cash",
    },
  },
  { timestamps: true }
);
const orderModel = mongoose.models.Order || model("Order", orderSchema);
export default orderModel;

orderSchema.virtual("finalPrice").get(function () {
 return this.coupon ?
     Number.parseFloat(
      this.price - (this.price * this.coupon.discount) / 100
    ).toFixed(2) : this.price
});
