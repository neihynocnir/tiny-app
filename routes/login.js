const express = require('express');
const router = express.Router();
const findUserByEmail = require('../controllers/findUserByEmail');

router.get('/', (req, res) => {

  // res.redirect('/login');
  res.redirect('/urls');
});


router.get('/login', (req, res) => {
  res.render("signin");
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  user = findUserByEmail(email);
  if (user) {
    if (user.password === password) {
      req.session['user_id'] = user.id; 
      res.redirect('/urls/');
    } 
    res.redirect('/login'); // password did not match try again
  } 
  res.redirect('/register'); // user was not found go to register
});

router.post('/logout', (req,res) => {
  req.session['user_id'] = null;
  res.redirect('/login')
})

module.exports = router;