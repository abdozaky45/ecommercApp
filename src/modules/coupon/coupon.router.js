import { Router } from "express";
import { auth } from "../../middleware/authtication.middleware.js";
import { autherized } from "../../middleware/authentication.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validator from "./coupon.validation.js";
import * as couponController from "./controller/coupon.js";
const router = Router();
router.post(
  "/create",
  auth,
  autherized("admin"),
  validation(validator.createCoupon),
  couponController.createCoupon
);
router.patch(
  "/:couponName",
  auth,
  autherized("admin"),
  validation(validator.updateCoupon),
  couponController.updateCoupon
);

router.delete(
  "/:couponName",
  auth,
  autherized("admin"),
  validation(validator.deleteCoupon),
  couponController.deleteCoupon
);

router.get("/", couponController.getAllCoupons);
export default router;
