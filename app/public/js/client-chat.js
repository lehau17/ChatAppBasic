var socket = io();

// document.getElementById("form-chat").addEventListener("submit", (e) => {
//   e.preventDefault();
//   let mes = document.getElementById("text-chat").value;
//   socket.emit("sendMessageToServer", mes);
// });

// socket.on("join", (mes) => {
//   console.log(mes);
// });

// socket.on("sendMessageToClient", (mes) => {
//   let ele = document.createElement("div");
//   ele.innerText = mes.message;
//   document.getElementsByClassName("message")[0].appendChild(ele);
// });

// document.getElementById("btn-share-location").addEventListener("click", (e) => {
//   navigator.geolocation.getCurrentPosition((location) => {
//     const { latitude, longitude } = location.coords;
//     socket.emit("shareLocation", { latitude, longitude });
//   });
// });

// socket.on("sendLocationToAllClient", (url) => {
//   let ele = document.createElement("a");
//   ele.href = url;
//   ele.target = "blank";
//   ele.innerText = "Location";
//   document.getElementsByClassName("message")[0].appendChild(ele);
// });

const getUserName = () => {
  let params = location.search;
  const userProfile = Qs.parse(params, { ignoreQueryPrefix: true });
  const { username: name } = userProfile;
  return name;
};

const user = () => {
  let params = location.search;
  const userProfile = Qs.parse(params, { ignoreQueryPrefix: true });
  const { username: name, room } = userProfile;
  socket.emit("joinRoom", { name, room });
};

socket.on("sendList", (listOfUsers) => {
  const mainNode = document.getElementsByClassName(
    "app__list-user--content"
  )[0];
  mainNode.innerHTML = "";
  listOfUsers.forEach((user) => {
    const liElement = document.createElement("li");
    liElement.className = "app__item-user";
    liElement.innerText = user.name;
    mainNode.appendChild(liElement);
  });
  document.getElementsByClassName("app__title")[0].innerText =
    "ROOM: " + listOfUsers[0].room;
});

user();

socket.on("noticeOut", (message) => {
  alert(message);
});

document
  .getElementsByClassName("btn-send ")[0]
  .addEventListener("click", (e) => {
    e.preventDefault();
    let message = document.getElementById("input-messages").value;
    const userName = getUserName();
    socket.emit("sendMessage", { message, userName });
  });

// <div class="message-item">
//   <div class="message__row1">
//     <p class="message__name">Nguyễn Phong Hào</p>
//     <p class="message__date">11/02/2021 - 12:56:01</p>
//   </div>
//   <div class="message__row2">
//     <p class="message__content">
//       hôm nay tui được đi đá banh , mừng qua các bạn ơi
//     </p>
//   </div>
// </div>;
socket.on("sendMessageFromSever", ({ message, createAt, userName }) => {
  let mainNode = document.getElementsByClassName("app__messages")[0];
  let divRow1 = document.createElement("div");
  divRow1.className = "message__row1";
  let pName = document.createElement("p");
  pName.className = "message__name";
  pName.innerText = userName;
  let pDate = document.createElement("p");
  pDate.className = "message__date";
  pDate.innerText = createAt;
  divRow1.appendChild(pName);
  divRow1.appendChild(pDate);
  let divRow2 = document.createElement("div");
  let pContent = document.createElement("p");
  pContent.className = "message__content";
  pContent.innerText = message;
  divRow2.appendChild(pContent);
  let divItem = document.createElement("div");
  divItem.className = "message-item";
  divItem.appendChild(divRow1);
  divItem.appendChild(divRow2);
  mainNode.appendChild(divItem);
});

document.getElementById("btn-share-location").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((location) => {
    const { latitude, longitude } = location.coords;
    const userName = getUserName();
    socket.emit("curentLocation", { latitude, longitude, userName });
  });
});

socket.on("curentLocationUrl", ({ url, createAt, userName }) => {
  let mainNode = document.getElementsByClassName("app__messages")[0];
  let divRow1 = document.createElement("div");
  divRow1.className = "message__row1";
  let pName = document.createElement("p");
  pName.className = "message__name";
  pName.innerText = userName;
  let pDate = document.createElement("p");
  pDate.className = "message__date";
  pDate.innerText = createAt;
  divRow1.appendChild(pName);
  divRow1.appendChild(pDate);
  let divRow2 = document.createElement("div");
  let pContent = document.createElement("p");
  pContent.className = "message__content";
  pContent.innerHTML = `<a href="${url}" target="_blank">My Location</a>`;
  divRow2.appendChild(pContent);
  let divItem = document.createElement("div");
  divItem.className = "message-item";
  divItem.appendChild(divRow1);
  divItem.appendChild(divRow2);
  mainNode.appendChild(divItem);
});
// socket.on("leftRoom", (message) => {
//   alert(message);
// });

// document.getElementById("btn-list-user").addEventListener("click", () => {
//   socket.emit("getListByRoom");
// });

// socket.on("getListByServer", (list) => {
//   list.forEach((e) => console.log(e));
// });
