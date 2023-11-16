import { fileURLToPath } from "url";
import CartModel from "../../../../DB/models/cart.model.js";
import couponModel from "../../../../DB/models/coupon.model.js";
import orderModel from "../../../../DB/models/order.model.js";
import productModel from "../../../../DB/models/product.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import createInvoice from "../../../utils/createinvoice.js";
import path from "path";
import cloudinary from "../../../utils/cloudinary.js";
import sendEmail from "../../../utils/sendEmail.js";
import { clearCart, updateStock } from "../order.service.js";
import Stripe from "stripe";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const createOrder = asyncHandler(async (req, res, next) => {
  //data
  const { payment, coupon, address, phone } = req.body;
  let checkCoupon;
  let orderProducts = [];
  let orderPrice = 0;
  // check coupon
  if (coupon) {
    checkCoupon = await couponModel.findOne({
      couponName: coupon,
      expiredAt: { $gt: Date.now() },
    });
    if (!coupon) return next(new Error("in-Valid coupon!", { cause: 400 }));
  }
  // check cart
  const cart = await CartModel.findOne({ user: req.user.id });
  const products = cart.products;
  if (products.length < 1)
    return next(new Error("Empty Cart !!", { cause: 400 }));
  // check product
  for (let i = 0; i < products.length; i++) {
    // product exist
    const product = await productModel.findById(products[i].productId);
    if (!product) return next(new Error("product not found!", { cause: 400 }));
    // check Stock
    // availableItems && quantity > product > Cart
    if (!product.inStock(products[i].quantity))
      return next(
        new Error(
          `${product.productName} out of stock only ${product.availableItems} items are left `,
          { casue: 400 }
        )
      );
    orderProducts.push({
      productId: product._id,
      quantity: products[i].quantity,
      orderName: product.productName,
      itemPrice: product.finalPrice,
      totalPrice: products[i].quantity * product.finalPrice,
    });
    orderPrice += products[i].quantity * product.finalPrice;
  }
  // create orderF
  const order = await orderModel.create({
    user: req.user._id,
    products: orderProducts,
    address,
    phone,
    coupon: {
      id: checkCoupon?.id,
      couponName: checkCoupon?.couponName,
      discount: checkCoupon?.discount,
    },
    payment,
    price: orderPrice,
  });
  // create invoice
  const user = req.user;
  const invoice = {
    shipping: {
      name: user.userName,
      address: order.address,
      city: "Cairo",
      country: "Egypt",
    },
    items: order.products,
    // Price before discount
    subtotal: order.price,
    // final price
    paid: order.finalPrice,
    invoice_nr: order._id,
  };
  const pdFpath = path.join(
    __dirname,
    `../../../../invoiceTemp/${order._id}.pdf`
  );
  createInvoice(invoice, pdFpath);
  // upload cloudinary
  const { secure_url, public_id } = await cloudinary.uploader.upload(pdFpath, {
    folder: `${process.env.FOLDER_CLOUD_NAME}/order/invoice/${user._id}`,
  });
  // add invoice to order
  order.invoice = { secure_url, public_id };
  await order.save();

  // send email
  const SendEmail = await sendEmail({
    to: user.email,
    subject: "order invoice",
    attachments: [{ path: secure_url, contentType: "application/pdf" }],
  });
  console.log(SendEmail);
  if (SendEmail) {
    //update Stock
    updateStock(order.products, true);
    // clear Cart
    clearCart(user._id);
  }
  // stripe payment
  if(payment == "visa"){
    const stripe = new Stripe(process.env.STRIPE_KEY);
  let existCoupon;
  if (order.coupon.couponName !== undefined) {
    existCoupon = await stripe.coupons.create({
      percent_off: order.coupon.discount,
      duration: "once",
    });
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
    line_items: order.products.map((product) => {
      return {
        price_data: {
          currency: "Egp",
          product_data: {
            name: product.name,
            //  images: [product.productId.defaultImage.secure_url],
          },
          unit_amount: product.itemPrice * 100,
        },
        quantity: product.quantity,
      };
    }),
    coupons: existCoupon ? [{ coupon: existCoupon.id }] : [],
  });
  return res.json({
    success: true,
    result:session.url
  });
  }
  // response
  return res.json({
    success: true,
    message: "order placed successfully! check inbox",
  });
});

// cancel order
export const cancelOrder = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findById(req.params.orderId);
  if (!order) return next(new Error("in-valid order", { cause: 400 }));
  if (order.status == "shipped" || order.status == "delivered")
    return next(new Error("can not cancel order", { cause: 400 }));
  order.status = "canceled";
  await order.save();
  updateStock(order.products, false);

  return res.json({ success: true, message: "order canceled" });
});
