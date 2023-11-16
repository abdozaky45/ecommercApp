import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";
export const createProduct = joi
  .object({
    productName: joi.string().min(5).max(20).required(),
    description: joi.string(),
    availableItems: joi.number().min(1).required(),
    soldItems: joi.number(),
    price: joi.number().min(1).required(),
    discount: joi.number().min(1).max(100),
    category: joi.string().custom(isValidObjectId),
    subcategory: joi.string().custom(isValidObjectId),
    brand: joi.string().custom(isValidObjectId),
  })
  .required();

// delete product + read single product
export const productIdSchema = joi
  .object({
    productId: joi.string().custom(isValidObjectId).required(),
  })
  .required();
