import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";
export const createOrder = joi
  .object({
    address: joi.string().min(10).required(),
    phone: joi.string().length(11).required(),
    coupon: joi.string().length(8),
    payment: joi.string().valid("visa", "cash").required(),
  })
  .required(); 
export const cancelOrder = joi.object({
  orderId : joi.string().custom(isValidObjectId).required()
});