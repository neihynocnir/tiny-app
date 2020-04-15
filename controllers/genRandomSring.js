const generateRandomString = () => {
  return Math.random().toString(36).replace('0.','').slice(0,6);
};

module.exports = generateRandomString;