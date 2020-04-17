const express = require('express');
const router = express.Router();
const userByEmail = require('../controllers/userByEmail');

// base page
router.get('/', (req, res) => {
  (req.session["user_id"]) ? res.redirect('/urls') : res.redirect('/login');
});

// Display the form to login
router.get('/login', (req, res) => {
  res.render("signin");
});

// Login 
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  user = userByEmail(email);
  if (user) {
    if (user.password === password) {
      req.session['user_id'] = user.id; 
      res.redirect('/urls/');
    } 
    res.redirect('/login'); // password did not match try again
  } 
  res.redirect('/register'); // user was not found go to register
});

// Logout
router.post('/logout', (req,res) => {
  req.session['user_id'] = null;
  res.redirect('/login')
})

module.exports = router;