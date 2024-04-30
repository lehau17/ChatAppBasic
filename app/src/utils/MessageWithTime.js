var format = require("date-format");
const createMessageWithTime = (message) => {
  return {
    message,
    createAt: format("dd/MM/yyyy HH:mm:ss", new Date()),
  };
};
module.exports = createMessageWithTime;
