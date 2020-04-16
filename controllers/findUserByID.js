const users = require('../db/usersDB');

const findUserByID = (userID) => {
  for (let key in users) {
    if (users[key].id === userID){
      return (users[key]);
    }
  } 
  return false
}

module.exports = findUserByID;