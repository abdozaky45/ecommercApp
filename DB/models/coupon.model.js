import mongoose, { Schema, model, Types } from "mongoose";

const couponSchema = new Schema(
  {
    couponName: { type: String, min: 4, max: 10,required: true },
    discount: { type: Number, min: 1, max: 100, required: true },
    expiredAt: { type: Number, required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const couponModel = mongoose.models.Coupon || model("Coupon", couponSchema);
export default couponModel;
