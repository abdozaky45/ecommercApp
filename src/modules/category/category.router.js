import { Router } from "express";
import * as categoryController from "./controller/category.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validator from "./category.validation.js";
import { auth } from "../../middleware/authtication.middleware.js";
import { autherized } from "../../middleware/authentication.middleware.js";
import { uploadCloud, fileObjects } from "../../utils/multer.js";
import subcategoryRouter from "./../subCategory/subCategory.router.js";
import productRouter from "../product/product.router.js"
const router = Router();
router.use("/:categoryId/subcategory", subcategoryRouter);
router.use("/:categoryId/product", productRouter);
router.post(
  "/create",
  auth,
  autherized("admin"),
  uploadCloud(fileObjects.image).single("category"),
  validation(validator.createCategory),
  categoryController.createCategory
);
export default router;
router.patch(
  "/:categoryId",
  auth,
  autherized("admin"),
  uploadCloud(fileObjects.image).single("category"),
  validation(validator.updateCategory),
  categoryController.updateCategory
);
router.delete(
  "/:categoryId",
  auth,
  autherized("admin"),
  validation(validator.deleteCategory),
  categoryController.deleteCategory
);
router.get("/all",categoryController.getAllCategory);
