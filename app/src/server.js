const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const port = 3000;
app.use(express.json());
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketio(server);
let count = 1;
io.on("connection", (socket) => {
  socket.on("sendMessageToServer", (mes) => {
    io.emit("sendMessageToClient", mes);
  });
  socket.on("disconnect", () => {
    console.log("Client left connection");
  });
});
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
