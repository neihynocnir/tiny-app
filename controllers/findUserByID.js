const users = require('../db/usersDB');

// Find User by ID 
const findUserByID = (userID) => {
  for (let key in users) {
    if (users[key].id === userID){
      return (users[key]);
    }
  } 
  return undefined
}

module.exports = findUserByID;