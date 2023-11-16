import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const createSubcategory = joi
  .object({
    subcategoryName: joi.string().min(5).max(20).required(),
    categoryId: joi.string().custom(isValidObjectId).required(),
    //createdBy: joi.string().custom(isValidObjectId),
  })
  .required();
export const updateSubcategory = joi
  .object({
    subcategoryName: joi.string().min(5).max(20),
    categoryId: joi.string().custom(isValidObjectId).required(),
    subcategoryId: joi.string().custom(isValidObjectId).required(),
  })
  .required();
export const deletesubcategory = joi
  .object({
    categoryId: joi.string().custom(isValidObjectId).required(),
    subcategoryId: joi.string().custom(isValidObjectId).required(),
  })
  .required();
