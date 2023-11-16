import { Router } from "express";
import { auth } from "../../middleware/authtication.middleware.js";
import { autherized } from "../../middleware/authentication.middleware.js";
import * as orderController from "./controller/order.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validator from "./order.validation.js";

const router = Router();
router.post(
  "/create",
  auth,
  validation(validator.createOrder),
  orderController.createOrder
);

router.patch(
  "/:orderId",
  auth,
  validation(validator.cancelOrder),
  orderController.cancelOrder
);
export default router;
