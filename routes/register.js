const express = require('express');
const router = express.Router();
const users = require('../db/usersDB');
const generateRandomString = require('../controllers/genRandomSring');


router.get('/register', (req, res) => {
  res.render("registration");
});

router.post('/register', (req,res) => {
  let userID = generateRandomString();
  const { email, password } = req.body;
  console.log (userID);
  console.log(email);
  res.redirect('/urls/');
})

module.exports = router;
