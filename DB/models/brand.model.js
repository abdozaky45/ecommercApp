import mongoose, { Schema, Types, model } from "mongoose";
const brandSchema = new Schema(
  {
    brandName: { type: String, min: 5, max: 20, required: true },
    slug: { type: String, required: true },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const brandModel = mongoose.models.Brand || model("Brand", brandSchema);
export default brandModel;
