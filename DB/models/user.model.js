import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    profileImage: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dvferafsw/image/upload/v1691613235/ecommerceDefault/user/profilePic_qatrem.jpg",
      },
      publicId: {
        type: String,
        default: "ecommerceDefault/user/profilePic_qatrem",
      },
    },
    coverImages: [
      {
        url: {
          type: String,
          required: true,
        },
        PublicId: {
          type: String,
          required: true,
        },
      },
    ],
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "not specified",
      enumValues: ["male", "famele", "not specified"],
    },
    phone: String,
    status: {
      type: String,
      default: "offline",
      enumValues: ["online,offline"],
    },
    role: {
      type: String,
      default: "user",
      enumValues: ["user","admin"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    forgetCode: String,
    activationCode: String,
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
