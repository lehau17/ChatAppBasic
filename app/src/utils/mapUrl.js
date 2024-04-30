const createUrlMap = ({ latitude, longitude }) => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};

module.exports = { createUrlMap };
