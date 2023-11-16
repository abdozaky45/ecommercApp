import couponModel from "../../../../DB/models/coupon.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import voucher_codes from "voucher-code-generator";
export const createCoupon = asyncHandler(async (req, res, next) => {
  const code = voucher_codes.generate({ length: 8 }); //return Array[]
  const coupon = await couponModel.create({
    couponName: code[0],
    discount: req.body.discount,
    expiredAt: new Date(req.body.expiredAt).getTime(),
    createdBy: req.user.id,
  });
  return res.status(201).json({ success: true, result: coupon });
});

export const updateCoupon = asyncHandler(async (req, res, next) => {
  if (req.user.id !== coupon.createdBy.toString())
    return next(new Error("you are not the owner!!", { cause: 400 }));

  const coupon = await couponModel.findOne({
    couponName: req.params.couponName,
  });
  if (!coupon) return next(new Error("in-valid-code!!", { cause: 400 }));
  const expiredCoupon = await couponModel.findOne({
    expiredAt: { $gt: Date.now() },
  });

  if (!expiredCoupon)
    return next(new Error("This coupon is not valid", { cause: 400 }));

  coupon.discount = req.body.discount ? req.body.discount : coupon.discount;

  coupon.expiredAt = req.body.expiredAt
    ? new Date(req.body.expiredAt).getTime()
    : coupon.expiredAt;
  await coupon.save();
  return res.status(201).json({ success: true, result: coupon });
});

export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await couponModel.findOne({
    couponName: req.params.couponName,
  });
  if (!coupon) return next(new Error("in-valid-code!!", { cause: 400 }));

  if (req.user.id !== coupon.createdBy.toString())
    return next(new Error("you are not the owner!!", { cause: 400 }));

  await couponModel.findOneAndDelete({
    couponName: req.params.couponName,
  });

  return res.status(201).json({ success: true, Message: "coupon deleted" });
});

export const getAllCoupons = asyncHandler(async (req, res, next) => {
  const coupons = await couponModel.find();
  return res.status(201).json({ success: true, result: coupons });
});
