import mongoose, { Schema, Types, model } from "mongoose";
const subCategorySchema = new Schema(
  {
    subcategoryName: { type: String, required: true, min: 5, max: 20 },
    slug: { type: String, required: true },
    image: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    brandId: { type: Types.ObjectId, ref: "Brand"},
  },
  {
    timestamps: true,
  }
);
const subCategoryModel =
  mongoose.models.Subcategory || model("Subcategory", subCategorySchema);
export default subCategoryModel;
