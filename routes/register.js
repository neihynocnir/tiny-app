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
  res.cookie('user_id', registerUser(email, password)); 
  console.log(users);
  res.redirect('/urls/');
})

module.exports = router;
