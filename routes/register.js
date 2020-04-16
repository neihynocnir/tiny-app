const express = require('express');
const router = express.Router();
const users = require('../db/usersDB');
const generateRandomString = require('../controllers/genRandomSring');

const registerUser = (email, password) => {
  let newID = generateRandomString();
  for (let key in users){
    let user = users[key];
    if (user.email === email) {
      return false;
    } 
  }
  users[newID] = { id: newID, email: email, password: password }
  return newID;
}

router.get('/register', (req, res) => {
  res.render("registration");
});

router.post('/register', (req,res) => {
  const { email, password } = req.body;
  userID = registerUser(email, password);
  if (userID) {
    res.cookie('user_id', userID); 
    console.log(users);
    res.redirect('/urls/');
  } else {
    res.status(400);
    throw new Error('user already exist')
  }
})

module.exports = router;
