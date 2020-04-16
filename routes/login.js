const express = require('express');
const router = express.Router();
const users = require('../db/usersDB')

const loginUser = (email, password) => {
  for (const key in users) {
    const user = users[key];
    if (user.email === email) {
      // user was found
      if (user.password === password) {
        // log the user in
        // res.cookie('userId', key);
        req.session.userId = key;
        res.redirect('/');
      } else {
        // password did not match
        // redirect to the login page
      }
    } else {
      // user was not found
      // redirect to register page
    }
  }
}

router.get('/login', (req, res) => {
  res.render("signin");
});
/*
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  res.cookie('username', req.body.username);
  console.log("Cookies :  ", req.body.username);
  res.redirect('/urls');
});
*/
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if(loginUser(email, password)){

  }

});

router.post('/logout', (req,res) => {
  res.clearCookie('username');
  res.redirect('urls')
})

module.exports = router;