import connect from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import brandRouter from "./modules/brand/brand.router.js";
import cartRouter from "./modules/cart/cart.router.js";
import categoryRouter from "./modules/category/category.router.js";
import couponRouter from "./modules/coupon/coupon.router.js";
import productRouter from "./modules/product/product.router.js";
import subCategoryRouter from "./modules/subCategory/subCategory.router.js";
import orderRouter from "./modules/order/order.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import morgan from "morgan";
const bootstrap = (express, app) => {
  if (process.env.Node_ENV === "dev") {
    app.use(morgan("dev"));
  }
  CORS
  const whiteList = ["Website-URL", "Application-URL"];
  app.use((req, res, next) => {
     // confirm email
     if(req.originalUrl.includes("/auth/confirmEmail")){
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader("Access-Control-Allow-Methods","GET"); 
      return next();
     }
    if(!whiteList.includes(req.header("origin"))){
      return next(new Error("Blocked-By-CORS!!"))
    }
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","*"); 
    res.setHeader("Access-Control-Allow-Private-Network",true); 
    return next();
  });
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/category", categoryRouter);
  app.use("/subcategory", subCategoryRouter);
  app.use("/brand", brandRouter);
  app.use("/product", productRouter);
  app.use("/coupon", couponRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);
  app.all("*", (req, res, next) => {
    return next(new Error("in-valid Router!!!", { cause: 404 }));
  });
  connect();
  app.use(globalErrorHandling);
};
export default bootstrap;
