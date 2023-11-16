import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const createCategory = joi
  .object({
    categoryName: joi.string().min(5).max(20).required(),
    createdBy: joi.string().custom(isValidObjectId),
  })
  .required();
export const updateCategory = joi
  .object({
    categoryName: joi.string().min(5).max(20),
    categoryId:joi.string().custom(isValidObjectId).required()
  })
  .required();
  export const deleteCategory =joi.object({
    categoryId:joi.string().custom(isValidObjectId).required(),
  }).required();