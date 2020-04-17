const urlsDB = require('../db/urlsDB')

const urlsByUser = (userID) => {
  let urlsUser = {};
  for (let shortUrl in urlsDB) {
    if (urlsDB[shortUrl].userID === userID){
      urlsUser[shortUrl] = urlsDB[shortUrl]
    }
  }
  return urlsUser
};

module.exports = urlsByUser;