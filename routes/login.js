const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userByEmail = require('../controllers/userByEmail');

// authentication of User
const authUser = (email, password) => {
  const user = userByEmail(email);
  // if we got a user back and the passwords match then return the userObj
  if (user && bcrypt.compareSync(password, user.password)) {
    // user is authenticated
    return user;
  } else {
    // Otherwise return false
    return false;
  }
};

// redirect according with user 
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
  user = authUser(email, password);
  if (!userByEmail(email)){
    res.status(401).send('User does not exist please go and <a href="/register">register</a>');
  };
  if (user) {
    req.session['user_id'] = user.id; 
    res.redirect('/urls/');
  } else {
    res.status(401).send('Password did not match try again <a href="/">login</a>');
  }; 
});

// Logout
router.post('/logout', (req,res) => {
  req.session['user_id'] = null;
  res.redirect('/login')
})

module.exports = router;