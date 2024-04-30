const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const createMessageWithTime = require("./utils/MessageWithTime");
const app = express();
const port = 3000;
app.use(express.json());
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketio(server);
let count = 1;
io.on("connection", (socket) => {
  socket.emit("join", "welcome");
  socket.broadcast.emit("join", "other client connected");
  socket.on("sendMessageToServer", (mes) => {
    io.emit("sendMessageToClient", createMessageWithTime(mes));
  });

  socket.on("shareLocation", (location) => {
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    io.emit("sendLocationToAllClient", url);
  });
  socket.on("disconnect", () => {
    console.log("Client left connection");
  });
});
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
