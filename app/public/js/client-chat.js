var socket = io();
document.getElementById("form-chat").addEventListener("submit", (e) => {
  e.preventDefault();
  let mes = document.getElementById("text-chat").value;
  socket.emit("sendMessageToServer", mes);
});

socket.on("join", (mes) => {
  console.log(mes);
});

socket.on("sendMessageToClient", (mes) => {
  let ele = document.createElement("div");
  ele.innerText = mes;
  document.getElementsByClassName("message")[0].appendChild(ele);
});

document.getElementById("btn-share-location").addEventListener("click", (e) => {
  navigator.geolocation.getCurrentPosition((location) => {
    const { latitude, longitude } = location.coords;
    socket.emit("shareLocation", { latitude, longitude });
  });
});

socket.on("sendLocationToAllClient", (url) => {
  let ele = document.createElement("a");
  ele.href = url;
  ele.target = "blank";
  ele.innerText = "Location";
  document.getElementsByClassName("message")[0].appendChild(ele);
});
