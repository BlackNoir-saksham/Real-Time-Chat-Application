const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected with ID >> ", socket.id);

  socket.on("join_room", (data) => {
    // data is roomId from front end
    socket.join(data);
    console.log(
      `User with ID: ${socket.id} Joined Room: ${data} .`
    );
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.roomId).emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User with ID Disconnected >> ", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER is RUNNING");
});
