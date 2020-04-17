const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const users = require('../db/usersDB');
const generateRandomString = require('../controllers/genRandomString');
const userByEmail = require('../controllers/userByEmail');

// CREATE a new USER in DB
const registerUser = (email, password) => {
  if (!userByEmail(email)) {
    const salt = bcrypt.genSaltSync(saltRounds);
    let newID = generateRandomString();
    users[newID] = { 
      id: newID, 
      email: email, 
      password: bcrypt.hashSync(password, salt), }
    return newID;
  };
}
// Display the form to Create User
router.get('/register', (req, res) => {
  req.session['user_id'] = null; 
  res.render("registration");
});

// Create user 
router.post('/register', (req,res) => {
  const { email, password } = req.body;
  userID = registerUser(email, password);
  if (userID) {
    req.session['user_id'] = userID; 
    console.log(users);
    res.redirect('/urls/');
  } else {
    res.status(400);
    throw new Error('user already exist')
  }
})

module.exports = router;
