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
  userList = userList.filter((user) => user.id !== id);
};

module.exports = {
  addUser,
  getUserByRoom,
  removeUser,
};
