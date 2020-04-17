const users = require('../db/usersDB');

// Find User by email
const userByEmail = (email) => {
  for (let key in users) {
    let user = users[key];
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
};

module.exports = userByEmail;