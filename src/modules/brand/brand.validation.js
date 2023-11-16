import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";
export const createBrand =joi.object({
    brandName:joi.string().min(5).max(20).required(),
    createdBy:joi.string().custom(isValidObjectId),
}).required();

export const updateBrand =joi.object({
    brandName:joi.string().min(5).max(20),
    brandId:joi.string().custom(isValidObjectId).required(),
}).required();

export const deleteBrand = joi
  .object({
    brandId: joi.string().custom(isValidObjectId).required(),
  })
  .required();
  