import CartModel from "../../../../DB/models/cart.model.js";
import productModel from "../../../../DB/models/product.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const createCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const product = await productModel.findById(productId);
  if (!product) return next(new Error("product not found", { casue: 400 }));
  // if (quantity > product.availableItems)
  //   return next(
  //     new Error(
  //       `Sory , only ${product.availableItems} items left one the stock! `
  //     )
  //   );
  if (!product.inStock(quantity))
    return next(
      new Error(
        `Sory , only ${product.availableItems} items left one the stock! `
      )
    );
  const isProductInCart = await CartModel.findOne({
    user: req.user.id,
    "products.productId": productId,
  });
  if (isProductInCart) {
    isProductInCart.products.forEach((productObj) => {
      if (
        productObj.productId.toString() == productId.toString() &&
        productObj.quantity + quantity < product.availableItems
      ) {
        productObj.quantity = productObj.quantity + quantity;
      }
    });
    await isProductInCart.save();
    return res.status(201).json({
      success: true,
      result: isProductInCart,
      message: "product added successfully !",
    });
  } else {
    const cart = await CartModel.findOneAndUpdate(
      { user: req.user.id },
      { $push: { products: { productId, quantity } } },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      result: cart,
      message: "product added successfully !",
    });
  }

  //  const cart= await CartModel.findOne({ user: req.user.id });
  //   cart.products.push({ productId, quantity });
  //   await cart.save();
});

export const getAllProductsCart = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.find().populate([
    {
      path: "products.productId",
      select:
        "-_id defaultImage.secure_url images.secure_url productName description price discount  finalPrice",
    },
  ]);
  return res.status(201).json({
    success: true,
    result: cart,
  });
});

export const updateCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const product = await productModel.findById(productId);
  if (!product) return next(new Error("product not found", { casue: 400 }));

  if (!product.inStock(quantity))
    return next(
      new Error(
        `Sory , only ${product.availableItems} items left one the stock! `
      )
    );

  const cart = await CartModel.findOneAndUpdate(
    { user: req.user.id, "products.productId": productId },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );
  return res.status(201).json({
    success: true,
    result: cart,
  });
});

export const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { products: { productId: req.params.productId } } },
    { new: true }
  );
  return res.status(201).json({
    success: true,
    result: cart,
    Message: "product removed successfully!",
  });
});

export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user.id },
    { products: [] },
    { new: true }
  );
  return res.status(201).json({
    success: true,
    result: cart,
    Message: "product cleared successfully!",
  });
});
