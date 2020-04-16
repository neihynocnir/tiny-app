const users = require('../db/usersDB');

const findUserbyEmail = (email) => {
  for (let key in users){
    let user = users[key];
    if (user.email === email) {
      return user;
    } 
  } 
  return false;
}

module.exports = findUserbyEmail;