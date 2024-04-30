const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const {
  createMessageWithTime,
  createUrlWithTime,
} = require("./utils/MessageWithTime");
const { addUser, getUserByRoom, removeUser } = require("./utils/users");
const { createUrlMap } = require("./utils/mapUrl");
const app = express();
const port = 3000;
app.use(express.json());
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketio(server);
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ name, room }) => {
    socket.join(room);
    addUser(socket.id, name, room);
    io.to(room).emit("sendList", getUserByRoom(room));
    socket.on("sendMessage", (dataFromUser) => {
      const messageWithTime = createMessageWithTime(dataFromUser);
      io.to(room).emit("sendMessageFromSever", messageWithTime);
    });

    socket.on("curentLocation", ({ latitude, longitude, userName }) => {
      const url = createUrlMap({ latitude, longitude });
      io.to(room).emit(
        "curentLocationUrl",
        createUrlWithTime({ url, userName })
      );
    });
  });
  socket.on("disconnect", () => {
    const { room, name } = removeUser(socket.id);
    io.to(room).emit("sendList", getUserByRoom(room));
    io.to(room).emit("noticeOut", `User ${name} disconnected from ${room}`);
  });
});
server.listen(port, () => {
  console.log(`listening on ${port}`);
});

// socket.emit("join", "welcome");
// socket.broadcast.to(room).emit("join", `${name} other client connected`);
// socket.on("sendMessageToServer", (mes) => {
//   io.to(room).emit("sendMessageToClient", createMessageWithTime(mes));
// });

// socket.on("shareLocation", (location) => {
//   const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
//   io.to(room).emit("sendLocationToAllClient", url);
// });
// socket.on("disconnect", () => {
//   removeUser(socket.id);
//   io.to(room).emit("leftRoom", `${name} disconnected`);
// });
// socket.on("getListByRoom", () => {
//   console.log(room);
//   socket.emit("getListByServer", getUserByRoom(room));
// });
