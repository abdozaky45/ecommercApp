import { Router } from "express";
import * as brandController from "./controller/brand.js";
import { auth } from "../../middleware/authtication.middleware.js";
import { autherized } from "../../middleware/authentication.middleware.js";
import { fileObjects, uploadCloud } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validator from "./brand.validation.js";

const router = Router();
router.post(
  "/create",
  auth,
  autherized("admin"),
  uploadCloud(fileObjects.image).single("brand"),
  validation(validator.createBrand),
  brandController.createBrand
);

router.patch(
  "/:brandId",
  auth,
  autherized("admin"),
  uploadCloud(fileObjects.image).single("brand"),
  validation(validator.updateBrand),
  brandController.updateBrand
);

router.delete(
  "/:brandId",
  auth,
  autherized("admin"),
  validation(validator.deleteBrand),
  brandController.deleteBrand
);

router.get("/all", brandController.getAllBrand);
export default router;
