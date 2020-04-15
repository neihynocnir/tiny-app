const express = require('express');
const router = express.Router();
const users = require('../db/usersDB');


router.get('/register', (req, res) => {
  res.render("registration");
});

router.post('/register', (req,res) => {

})


module.exports = router;
