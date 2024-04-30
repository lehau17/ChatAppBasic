var socket = io();

document.getElementById("form-chat").addEventListener("submit", (e) => {
  e.preventDefault();
  let mes = document.getElementById("text-chat").value;
  socket.emit("sendMessageToServer", mes);
});

socket.on("sendMessageToClient", (mes) => {
  let ele = document.createElement("div");
  ele.innerText = mes;
  document.getElementsByClassName("message")[0].appendChild(ele);
});
