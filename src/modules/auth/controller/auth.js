import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwk from "jsonwebtoken";
import sendEmail from "../../../utils/sendEmail.js";
import {
  forgetPASS,
  signUpTemp,
  signUpTempConfirm,
} from "../../../utils/html.js";
import tokenModel from "../../../../DB/models/token.model.js";
import randomstring from "randomstring";
import CartModel from "../../../../DB/models/cart.model.js";

export const register = asyncHandler(async (req, res, next) => {
  const { userName, email, password, gender, phone } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist)
    return next(new Error("Email already Exist", { cause: 409 }));
  const hashPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const activationCode = crypto.randomBytes(64).toString("hex");
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
    gender,
    phone,
    activationCode,
  });
  const linkConfirmEmail = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${activationCode}`;
  const linkNewConfirmEmail = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${activationCode}`;
  const isSend = await sendEmail({
    to: user.email,
    subject: "ConfirmEmail",
    html: signUpTemp(linkConfirmEmail, linkNewConfirmEmail),
  });
  return isSend
    ? res.json({ succes: true, Message: "check inbox !", result: user })
    : next(new Error("wrong please try agian", { cause: 400 }));
});
export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { activationCode } = req.params;
  const user = await userModel.findOneAndUpdate(
    { activationCode },
    {
      isConfirmed: true,
      $unset: { activationCode: 1 },
    }
  );
  if (!user) return next(new Error("user not found!", { cause: 404 }));
  // create Cart:
  await  CartModel.create({user:user._id});
  return res.json({ Message: "/Login" });
});

export const newCofirmEmail = asyncHandler(async (req, res, next) => {
  const { activationCode } = req.params;
  const user = await userModel.findOne({ activationCode });
  if (!user) return next(new Error("/register", { cause: 404 }));
  if (user.isConfirmed) return res.json({ success: true, Message: "/login" });
  const linkCofirmEmail = 
  `${req.protocol}://${req.headers.host}/auth/confirmEmail/${user.activationCode}`;

  const isSend = await sendEmail({
    to: user.email,
    subject: "confirmEmail",
    html: signUpTempConfirm(linkCofirmEmail),
  });
  
  return isSend
    ? res.json({ succes: true, Message: "check inbox !", result: user })
    : next(new Error("wrong please try agian", { cause: 400 }));
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }); // {},null
  if (!user) return next(new Error("Email is not found", { cause: 404 }));
  if (!user.isConfirmed)
    return next(new Error("Unactivated account!,", { cause: 400 }));
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword)
    return next(new Error("in-valid Email or Password", { cause: 400 }));
  const token = jwk.sign(
    { id: user._id, userName: user.userName },
    process.env.TOKEN_SIGNATURE,
    { expiresIn: "2d" }
  );
  await tokenModel.create({
    token,
    user: user._id,
    agent: req.headers["user-agent"],
  });
  user.status = "online";
  await user.save();
  return res
    .status(200)
    .json({ success: true, Message: "/profile", auth: token });
});

export const forgetPass = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email }); // null , {}
  if (!user) return next(new Error("in-valid Email", { cause: 404 }));
  const code = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  user.forgetCode = code;
  await user.save();
  const isSend = await sendEmail({
    to: user.email,
    subject: "code Forget Password",
    html: forgetPASS(code),
  });
  return isSend
    ? res.json({
        succes: true,
        Email: "check inbox",
        Message: "/resetPassword",
      })
    : res.json({ message: "Error" });
});

export const resetPasswod = asyncHandler(async (req, res, next) => {
  const { forgetCode, password } = req.body;
  const user = await userModel.findOne({ forgetCode }); // {} , null
  if (!user) return next(new Error("in-valid Forget Code", { cause: 400 }));
  const updateUser = await userModel.updateOne({ $unset: { forgetCode: 1 } });
  const hashPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  user.password = hashPassword;
  await user.save();
  const tokens = await tokenModel.find({ user: user._id });
  tokens.forEach(async (token) => {
    token.isValid = false;
    await token.save();
  });
  return res.json({ success: true, Message: "/login" });
});
