import dotenv from "dotenv";
import Express from "express";
import { Server } from "socket.io";
import router from "./routes";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
const app = Express();
const Port = process.env.PORT || 5500;
const io = new Server(Number(8000), {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

mongoose
  .connect("mongodb://localhost:27017/WebRTC")
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("error in mongoose connection");
  });
app.use(Express.json());
app.use(router);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("room:join", (data) => {
    console.log(data);
    const { roomNo, email } = data;
    io.to(roomNo).emit("user:joined", { email, id: socket.id });
    socket.join(roomNo);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }: { to: string; offer: any }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });
  socket.on("call:accepted", ({ to, ans }: { to: string; ans: any }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });
  socket.on("peer:nego:needed", ({ to, offer }: { to: string; offer: any }) => {
    console.log("peer:nego:needed", offer.type, to);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
  socket.on("peer:nego:done", ({ to, ans }: { to: string; ans: any }) => {
    console.log("peer:nego:final", ans.type, to);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
