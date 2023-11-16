import mongoose, { Schema, Types, model } from "mongoose";
const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      min: 5,
      max: 20,
      required: true,
    },
    slug: { type: String, required: true },
    image: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    brandId: { type: Types.ObjectId, ref: "Brand" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
categorySchema.virtual("Subcategory", {
  ref: "Subcategory",
  localField: "_id", // category model > primary key
  foreignField: "categoryId", // _id = categoryId >>>>> subcategory model
});
const categoryModel =
  mongoose.models.Category || model("Category", categorySchema);
export default categoryModel;
