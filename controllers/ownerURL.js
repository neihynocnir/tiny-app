const urlsDB = require('../db/urlsDB');

// Find the owner of a shortURL
const ownerURL = (shortURL) => {
  for (let each in urlsDB) {
    if (each === shortURL) {
      let userID = urlsDB[each].userID;
      return userID;
    }
  }
  return undefined;
};


module.exports = ownerURL;
