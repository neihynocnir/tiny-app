const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render("signin");
});

router.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  console.log("Cookies :  ", req.body.username);
  res.redirect('/urls');
});

router.post('/logout', (req,res) => {
  res.clearCookie('username');
  res.redirect('urls')
})

module.exports = router;