import { Schema, model, Types } from "mongoose";
const postSchema = new Schema({
    title:{type:String, required:true},
    des:{type:String,required:true},
    createdBy:{type:Types.ObjectId,ref:"User"},
    updatedBy:{type:Types.ObjectId , ref:"User"}
}, { timestamps: true });
export const postModel = model("Post" , postSchema)