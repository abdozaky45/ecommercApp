import slugify from "slugify";
import productModel from "../../../../DB/models/product.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { nanoid } from "nanoid";
import categoryModel from "../../../../DB/models/category.model.js";
import subCategoryModel from "../../../../DB/models/subCategory.model.js";
import brandModel from "../../../../DB/models/brand.model.js";
export const createProduct = asyncHandler(async (req, res, next) => {
  //   const {
  //     productName,
  //     description,
  //     availableItems,
  //     price,
  //     discount,
  //     category,
  //     subcategory,
  //     brand,
  //   } = req.body;
  const category = await categoryModel.findById(req.body.category);
  if (!category) return next(new Error("category Not found!!", { cause: 404 }));

  const subcategory = await subCategoryModel.findById(req.body.subcategory);
  if (!subcategory)
    return next(new Error("subcategory Not found!!", { cause: 404 }));

  const brand = await brandModel.findById(req.body.brand);
  if (!brand) return next(new Error("brand Not found!!", { cause: 404 }));

  if (!req.files) return next(new Error("image is required", { cause: 400 }));
  const cloudFolder = nanoid();
  let images = [];
  for (const file of req.files.subImages) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { folder: `${process.env.FOLDER_CLOUD_NAME}/products/${cloudFolder}` }
    );
    images.push({ secure_url: secure_url, public_id: public_id });
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.defaultImage[0].path,
    { folder: `${process.env.FOLDER_CLOUD_NAME}/products/${cloudFolder}` }
  );

  const product = await productModel.create({
    ...req.body,
    slug: slugify(req.body.productName),
    cloudFolder,
    createdBy: req.user.id,
    defaultImage: { secure_url, public_id },
    images,
  });

  console.log(`discount: ${product.finalPrice}`);
  return res.status(201).json({ success: true, result: product });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.productId);
  if (!product) return next(new Error("product not found!!", { cause: 400 }));

  if (req.user.id.toString() !== product.createdBy.toString())
    return next(new Error("authorized not found !!", { cause: 400 }));

  const imagesArr = product.images;
  const public_ids = imagesArr.map((imageObj) => imageObj.public_id);
  public_ids.push(product.defaultImage.public_id);
  console.log(public_ids);

  const result = await cloudinary.api.delete_resources(public_ids);
  console.log(result);

  await cloudinary.api.delete_folder(
    `${process.env.FOLDER_CLOUD_NAME}/products/${product.cloudFolder}`
  );

  await productModel.findByIdAndDelete(req.params.productId);
  return res.json({ success: true, Message: "deleted product" });
});

export const getAllProduct = asyncHandler(async (req, res, next) => {
  if(req.params.categoryId){
    const category = await categoryModel.findById(req.params.categoryId);
    if(!category) return next(new Error("not found category!",{casue:400}));

    const product = await productModel.findOne( {category:req.params.categoryId});
    if (!product)
      return next(new Error("not found category!", { casue: 400 }));
    const products = await productModel
      .find({
        category: req.params.categoryId,
      })
      .paginate(req.query.page);
     return res.json({ success: true, result: products });
  }

  const product = await productModel
    .find({ ...req.query })
    .paginate(req.query.page)
    .customSelect(req.query.fields)
    .sort(req.query.sort);
  return res.json({ success: true, result: product });
});

export const SingleProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.productId);
  if (!product) return next(new Error("in-valid productId!!"));
  const singleProduct = await productModel.findById(req.params.productId);
  return res.json({ success: true, result: singleProduct });
});






// const { productName } = req.query;
  //const product = await productModel.find({ productName: { $regex:productName} });
  //pagination
  // const { page } = req.params;
  // const limit = 2;
  // const skip = limit * (page - 1);   //2*
  // const product = await productModel.find({}).skip(skip).limit(limit);
  //select
  // const {search} = req.query
  //const { key } = req.query;
  //const product = await productModel.find().select(`-_id ${key}`);
  //$$$$$$$$$$$$$$$$$ regex options $$$$$$$$$$$$$$$$$
  //const product = await productModel.find().sort(key);
  // const product = await productModel.find({
  //   $or: [
  //     { productName: { $regex: key, $options: "i" } },
  //     { description: { $regex: key, $options: "i" } },
  //   ],
  // });

  //$$$$$$$$$$$$$$$$$ Filter{ strictQuery: true} $$$$$$$$$$$$$$$$$
  // const product = await productModel.find({ ...req.query });

  //$$$$$$$$$$$$$$$$$ pagination{skip,limit,page} $$$$$$$$$$$$$$$$$
  // let { page } = req.query;
  // const limit = 2;
  // page = !page || page < 1 || isNaN(page) ? 1 : page;
  // console.log(page);
  // const skip = limit * (page - 1);
  // console.log(skip);
  // const product = await productModel.find().skip(skip).limit(limit);
  //$$$$$$$$$$$$$$$$$ selections $$$$$$$$$$$$$$$$$
  //  const { key } = req.query;
  //  const modelsKey = Object.keys(productModel.schema.paths) //[productName , discount , price]

  //  const queryKeys = key.split(" "); //[...req.query>productName,price]

  //  const matchedKeys = queryKeys.filter((key)=>modelsKey.includes(key));
