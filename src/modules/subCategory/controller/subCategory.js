import categoryModel from "../../../../DB/models/category.model.js";
import subCategoryModel from "../../../../DB/models/subCategory.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import slugify from "slugify";

export const createSubcategory = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new Error("image is required", { cause: 400 }));

  const category = await categoryModel.findById(req.params.categoryId);
  if (!category) return next(new Error("in-valid category", { cause: 404 }));

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.FOLDER_CLOUD_NAME}/subcategory` }
  );

  const subcategory = await subCategoryModel.create({
    subcategoryName: req.body.subcategoryName,
    slug: slugify(req.body.subcategoryName),
    image: { secure_url, public_id },
    createdBy: req.user.id,
    categoryId: req.params.categoryId,
  });
  return res.json({ success: true, result: subcategory });
});
export const updateSubcategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findById(req.params.categoryId);
  if (!category) return next(new Error("in-valid-categoryId", { cause: 400 }));
  const subcategory = await subCategoryModel.findOne({
    _id: req.params.subcategoryId,
    categoryId: req.params.categoryId,
  });
  if (!subcategory)
    return next(
      new Error("in-valid-subcategoryId or categoryId", { cause: 400 })
    );

  //check owner
  if (req.user.id.toString() !== subcategory.createdBy.toString())
    return next(new Error("not authorized !!"));

  subcategory.subcategoryName = req.body.subcategoryName
    ? req.body.subcategoryName
    : subcategory.subcategoryName;

  subcategory.slug = req.body.subcategoryName
    ? slugify(req.body.subcategoryName)
    : subcategory.slug;

  if (req.file) {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      public_id: subcategory.image.public_id,
    });
    subcategory.image.secure_url = secure_url;
  }
  await subcategory.save();
  return res.json({ success: true, result: subcategory });
});

export const deletesubcategory = asyncHandler(async (req, res, next) => {
  const categoryId = await categoryModel.findById(req.params.categoryId);
  if (!categoryId)
    return next(new Error("in-valid-categoryId", { cause: 400 }));
  const subcategory = await subCategoryModel.findOne({
    _id: req.params.subcategoryId,
    categoryId: req.params.categoryId,
  });
  if (!subcategory)
    return next(
      new Error("in-valid-subcategoryId or categoryId", { cause: 400 })
    );
  //check owner
  if (req.user.id.toString() !== subcategory.createdBy.toString())
    return next(new Error("not authorized !!"));

  await cloudinary.uploader.destroy(subcategory.image.public_id);

  await subCategoryModel.findByIdAndDelete(req.params.subcategoryId);

  return res.json({ success: true, result: true });
});

export const getAllSubcatgoris = asyncHandler(async (req, res, next) => {
  const subCategory = await subCategoryModel.find().populate("categoryId");
  return res.json({ success: true, result: subCategory });
});
