import { Router } from "express";
import * as subCategoryController from "./controller/subCategory.js";
import { auth } from "../../middleware/authtication.middleware.js";
import {autherized} from "../../middleware/authentication.middleware.js"
import { fileObjects, uploadCloud } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validator from "./subCategory.validation.js"
const router = Router({mergeParams:true});
router.post(
  "/create",
  auth,
  autherized("admin"),
  uploadCloud(fileObjects.image).single("subcategory"),
  validation(validator.createSubcategory),
  subCategoryController.createSubcategory
);
export default router;
router.patch(
  "/:subcategoryId",
  auth,
  autherized("admin"),
  uploadCloud(fileObjects.image).single("subcategory"),
  validation(validator.updateSubcategory),
  subCategoryController.updateSubcategory
);
router.delete(
  "/:subcategoryId",
  auth,
  autherized("admin"),
  validation(validator.deletesubcategory),
  subCategoryController.deletesubcategory
);

router.get("/all",subCategoryController.getAllSubcatgoris);