import mongoose from "mongoose";
const connect = async () => {
  return await mongoose
    .connect(process.env.DB_URL)
    .then((result) => {
      console.log("CONNECT>>>>>>>>>Done<<<<<<<<<< ");
    })
    .catch((error) => {
      console.log(`error connection ${error}`);
    });
};
export default connect;