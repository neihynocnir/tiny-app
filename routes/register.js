const express = require('express');
const router = express.Router();
const users = require('../db/usersDB');
const generateRandomString = require('../controllers/genRandomSring');
const findUserByEmail = require('../controllers/findUserByEmail');


const registerUser = (email, password) => {
  if (!findUserByEmail(email)) {
    let newID = generateRandomString();
    users[newID] = { id: newID, email: email, password: password }
    return newID;
  }
}

router.get('/register', (req, res) => {
  res.clearCookie('user_id')
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
