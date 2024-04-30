const user = () => {
  let params = location.search;
  const userProfile = Qs.parse(params, { ignoreQueryPrefix: true });
  const { name, room } = userProfile;
  socket.emit("joinRoom", { name, room });
};

user();
