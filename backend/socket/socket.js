import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

export const getReciverSocketId = (reciverId) => userSocketMap[reciverId];

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId; // get the userId from frontend (socketContext)
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  //   io.emit() is used to send events to all connected clients
  io.emit("Get online Users", Object.keys(userSocketMap));

  // socket.on() is used to listen for events. can be used both on client and server side
  socket.on("disconnect", () => {
    // disconnect event
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("Get online Users", Object.keys(userSocketMap));
  });
});

export { app, io, server };
