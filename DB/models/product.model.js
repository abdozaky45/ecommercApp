import mongoose, { Schema, Types, model } from "mongoose";
const productSchema = new Schema(
  {
    productName: { type: String, min: 5, max: 20, required: true },
    slug: { type: String, required: true },
    description: { type: String, default: "description" },
    images: [
      {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    defaultImage: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    availableItems: { type: Number, min: 1, required: true },
    soldItems: { type: Number, default: 0 },
    price: { type: Number, min: 1, required: true },
    discount: { type: Number, min: 1, max: 100 },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: Types.ObjectId, ref: "Subcategory", required: true },
    brand: { type: Types.ObjectId, ref: "Brand", required: true },
    cloudFolder: { type: String, unqiue: true },
  },
  {
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.virtual("finalPrice").get(function () {
  return Number.parseFloat(
    this.price - (this.price * this.discount || 0) / 100
  ).toFixed(2);
});

productSchema.query.paginate = function (page) {
  // this >>>>> query
  // return query
  page = !page || page < 1 || isNaN(page) ? 1 : page;
  const limit = 2;
  const skip = limit * (page - 1);
  return this.skip(skip).limit(limit);
};

productSchema.query.customSelect = function (fields) {
  // this >>>>> query
  // return query
  if (!fields) return this;
  const modelKeys = Object.keys(productModel.schema.paths);
  const queryKeys = fields.split(" ");
  const matchedKeys = queryKeys.filter((key) => modelKeys.includes(key));
  return this.select(matchedKeys);
};
productSchema.methods.inStock = function (requiredQuantity) {
  return this.availableItems >= requiredQuantity ? true : false;
};
const productModel = mongoose.models.Product || model("Product", productSchema);
export default productModel;
