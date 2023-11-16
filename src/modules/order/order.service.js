import CartModel from "../../../DB/models/cart.model.js";
import productModel from "../../../DB/models/product.model.js";

// clear cart
export const clearCart = async (userId) => {
  await CartModel.findOneAndUpdate({ user: userId }, { products: [] });
};
// update stock
export const updateStock = async (products,placeOrder) => {
  /*
  placeOrder >>> true Or false ,
  true >> place order
  false >> cancel order
   */
 if(placeOrder){
  for (const product of products) {
    await productModel.findByIdAndUpdate(product.productId, {
      $inc: {
        availableItems: -product.quantity,
        soldItems: product.quantity,
      },
    });
  }
 }else{
  for (const product of products) {
    await productModel.findByIdAndUpdate(product.productId, {
      $inc: {
        availableItems: product.quantity,
        soldItems: -product.quantity,
      },
    });
  }
 }
};
