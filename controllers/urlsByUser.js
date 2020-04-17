const urlsDB = require('../db/urlsDB');

// list the urls that belongs to an specific userID
const urlsByUser = (userID) => {
  let urlsUser = {};
  for (let shortUrl in urlsDB) {
    if (urlsDB[shortUrl].userID === userID) {
      urlsUser[shortUrl] = urlsDB[shortUrl];
    }
  }
  return urlsUser;
};

module.exports = urlsByUser;