const express = require('express');
const router = express.Router();


/* --- LOGIN ROUTES ---
--------------------- */

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