import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import express from "express";
import bootstrap from "./src/index.Router.js";
import { postModel } from "./DB/models/post.model.js";
const app = express();
const port = process.env.PORT;
bootstrap(express, app);
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
const io = new Server(server, { cors: "*" });
io.on("connection", socket => {
  console.log(`SocketId : ${socket.id}`);
  socket.on("reqPosts",async()=>{
    const posts = await postModel.find({});
    socket.emit("resPosts",posts)
  })
  socket.on("createPost",async (data) => {
    const { title, des } = data;
    const post = await postModel.create({title,des});
    io.emit("newPost",post)
  });
});
