const userList = [{}];

const getUserByRoom = (room) => {
  return userList.filter((user) => room === user.room);
};

const addUser = (name, room) => {
  const newUser = {
    id: Math.random(),
    name,
    room,
  };
  userList.push(newUser);
};

module.exports = {
  addUser,
  getUserByRoom,
};
