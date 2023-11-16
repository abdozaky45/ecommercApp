import nodemailer from "nodemailer";
const sendEmail = async ({
  from = process.env.EMAIL,
  to,
  subject,
  html,
  attachments,
} = {}) => {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: `zaki code! 👻" <${from}>`,
    to,
    subject,
    text: "zaki code!",
    html,
    attachments,
  });
  return info.accepted.length < 1 ? false : true;
};
export default sendEmail;
