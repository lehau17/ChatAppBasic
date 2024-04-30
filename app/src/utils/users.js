let userList = [{}];

const getUserByRoom = (room) => {
  return userList.filter((user) => room === user.room);
};

const addUser = (id, name, room) => {
  const newUser = {
    id,
    name,
    room,
  };
  userList.push(newUser);
};

const removeUser = (id) => {
  const userDelete = userList.filter((user) => user.id === id)[0];
  userList = userList.filter((user) => user.id !== id);
  return userDelete;
};

module.exports = {
  addUser,
  getUserByRoom,
  removeUser,
};
