import slugify from "slugify";
import brandModel from "../../../../DB/models/brand.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const createBrand = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new Error("image is reqiured!!", { cause: 400 }));

  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.FOLDER_CLOUD_NAME}/brand` }
  );

  const brand = await brandModel.create({
    brandName: req.body.brandName,
    slug: slugify(req.body.brandName),
    image: { public_id, secure_url },
    createdBy: req.user.id,
  });

  return res.status(201).json({ success: true, result: brand });
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const brand = await brandModel.findById(req.params.brandId);
  if (!brand) return next(new Error("in-valid brandId", { cause: 400 }));

  if (req.user.id.toString() !== brand.createdBy.toString())
    return next(new Error("not autherized !!!", { cause: 404 }));

  brand.brandName = req.body.brand ? req.body.brand : brand.brandName;

  brand.slug = req.body.brand ? slugify(req.body.brand) : brand.slug;

  if (req.file) {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      public_id: brand.image.public_id,
    });
    brand.image.secure_url = secure_url;
  }
  await brand.save();
  return res.status(201).json({ success: true, result: brand });
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const brand = await brandModel.findById(req.params.brandId);
  if (!brand) return next(new Error("in-valid brandId", { cause: 400 }));

  if (req.user.id.toString() !== brand.createdBy.toString())
    return next(new Error("not autherized !!!", { cause: 404 }));

  await cloudinary.uploader.destroy(brand.image.public_id);

  await brandModel.findByIdAndDelete(req.params.brandId);

  return res.json({ success: true, Message: "Deleted brand" });
});

export const getAllBrand = asyncHandler(async(req,res,next)=>{
const brand = await brandModel.find();
return res.json({success:true ,result:brand});
})