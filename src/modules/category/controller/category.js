import { asyncHandler } from "../../../utils/errorHandling.js";
import categoryModel from "../../../../DB/models/category.model.js";
import slugify from "slugify";
import cloudinary from "../../../utils/cloudinary.js";
import subCategoryModel from "../../../../DB/models/subCategory.model.js";
export const createCategory = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new Error("image is required", { cause: 400 }));
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.FOLDER_CLOUD_NAME}/category` }
  );
  const category = await categoryModel.create({
    categoryName: req.body.categoryName,
    slug: slugify(req.body.categoryName),
    createdBy: req.user.id,
    image: { secure_url, public_id },
  });
  return res.status(201).json({ success: true, category });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findById(req.params.categoryId);
  if (!category) return next(new Error("category not found!!", { cause: 400 }));

  //check owner
  if (req.user.id.toString() !== category.createdBy.toString())
    return next(new Error("not authorized !!"));
  category.categoryName = req.body.categoryName
    ? req.body.categoryName
    : category.categoryName;
  category.slug = req.body.categoryName
    ? slugify(req.body.categoryName)
    : category.slug;
  if (req.file) {
    // update pic cloudinary
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      public_id: category.image.public_id,
    });
    category.image.secure_url = secure_url;
  }
  await category.save();
  return res.json({ success: true, result: category });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findById(req.params.categoryId);
  if (!category) return next(new Error("category not found!!", { cause: 400 }));

  //check owner
  if (req.user.id.toString() !== category.createdBy.toString())
    return next(new Error("not authorized !!"));
  // delete cloud
  await cloudinary.uploader.destroy(category.image.public_id);
  //delete all category and subcategory
  await categoryModel.findByIdAndDelete(req.params.categoryId);

  await subCategoryModel.deleteMany({ categoryId: req.params.categoryId }); // category._id

  return res.json({ success: true, Message: "Deleted category" });
});

export const getAllCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.find().populate({
    path: "Subcategory",
    select: " name slug image ",
    populate: "createdBy", //nested populate
  });
  return res.json({ success: true, Result: category });
});
