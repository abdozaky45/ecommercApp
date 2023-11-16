import { Router } from "express";
import { auth } from "../../middleware/authtication.middleware.js";
import { autherized } from "../../middleware/authentication.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validator from "./cart.validation.js";
import * as cartController from "./controller/cart.js";
const router = Router();
router.post(
  "/add",
  auth,
  validation(validator.cartSchema),
  cartController.createCart
);

router.get("/", auth, cartController.getAllProductsCart);

router.patch(
  "/update",
  auth,
  validation(validator.cartSchema),
  cartController.updateCart
);

router.patch(
  "/:productId",
  auth,
  validation(validator.removeProductFromCart),
  cartController.removeProductFromCart
);

router.put("/clear", auth, cartController.clearCart);

export default router;
