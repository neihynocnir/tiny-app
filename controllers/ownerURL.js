const urlsDB = require('../db/urlsDB');

// Find the owner of a shortURL
const ownerURL = (shortURL) => {
  for (let each in urlsDB) {
    if (each === shortURL) {
      return (urlsDB[each].userID); 
    } 
  }
  return null;
}

module.exports = ownerURL;
