import mongoose, { Schema, model, Types } from "mongoose";
const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true
    },
    user: {
      type: Types.ObjectId,
      ref: "User"
    },
    isValid: {
      type: Boolean,
      default: true
    },
    agent: String, //name
    expiredIn: String,
  },
  { timestamps: true }
);
const tokenModel = mongoose.models.Token || model("Token", tokenSchema);
export default tokenModel;
 