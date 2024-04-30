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
  socket.on("joinRoom", ({ name, room }) => {
    socket.join(room);
    socket.emit("join", "welcome");
    socket.broadcast.to(room).emit("join", `${name} other client connected`);
    socket.on("sendMessageToServer", (mes) => {
      io.to(room).emit("sendMessageToClient", createMessageWithTime(mes));
    });

    socket.on("shareLocation", (location) => {
      const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      io.to(room).emit("sendLocationToAllClient", url);
    });
    socket.on("disconnect", () => {
      io.to(room).emit("leftRoom", `${name} disconnected`);
    });
  });
});
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
