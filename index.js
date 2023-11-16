import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bootstrap from "./src/index.Router.js";
const app = express();
const port = process.env.PORT;
bootstrap(express, app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
