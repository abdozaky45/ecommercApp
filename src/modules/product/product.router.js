import { Router } from "express";
import * as prouductController from "./controller/product.js";
import { auth } from "../../middleware/authtication.middleware.js";
import { autherized } from "../../middleware/authentication.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validator from "./product.validation.js";
import { fileObjects, uploadCloud } from "../../utils/multer.js";
const router = Router({mergeParams:true});
router.post(
  "/create",
  auth,
  autherized("admin"),
  uploadCloud(fileObjects.image).fields([
    { name: "defaultImage", maxCount: 1 },
    { name: "subImages", maxCount: 3 },
  ]),
  validation(validator.createProduct),
  prouductController.createProduct
);

router.delete(
  "/:productId",
  auth,
  autherized("admin"),
  validation(validator.productIdSchema),
  prouductController.deleteProduct
);

router.get("/all", prouductController.getAllProduct);

router.get(
  "/:productId",
  validation(validator.productIdSchema),
  prouductController.SingleProduct
);
export default router;
