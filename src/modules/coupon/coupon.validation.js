import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";
export const createCoupon = joi
  .object({
    discount: joi.number().min(1).max(100).required(),
    expiredAt: joi.date().greater(Date.now()).required(),
  })
  .required();
export const updateCoupon = joi
  .object({
    couponName: joi.string().length(8).required(),
    discount: joi.number().min(1).max(100),
    expiredAt: joi.date().greater(Date.now()),
  })
  .required();

  export const deleteCoupon = joi
    .object({
      couponName: joi.string().length(8).required(),
    })
    .required();
