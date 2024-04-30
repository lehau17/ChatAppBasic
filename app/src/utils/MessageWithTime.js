var format = require("date-format");
const createMessageWithTime = ({ message, userName }) => {
  return {
    message,
    userName,
    createAt: format("dd/MM/yyyy hh:mm:ss", new Date()),
  };
};

const createUrlWithTime = ({ url, userName }) => {
  return {
    url,
    userName,
    createAt: format("dd/MM/yyyy hh:mm:ss", new Date()),
  };
};
module.exports = { createMessageWithTime, createUrlWithTime };
