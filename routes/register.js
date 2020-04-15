const express = require('express');
const router = express.Router();

const usersDb = [
  { email: "coco@mail.com", password: "ladraladra" },
  { email: "suri@mail.com", password: "gatita" },
];

router.get('/register', (req, res) => {
  res.render("registration");
});


module.exports = router;
