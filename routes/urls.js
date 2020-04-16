const express = require('express');
const router = express.Router();
const urlDatabase = require('../db/urlsDB');
const generateRandomString = require('../controllers/genRandomSring');
const findUserByID = require('../controllers/findUserByID')

const addNewUrl = (shortURL, longURL) => {
  !longURL.includes('http') ? longURL = 'http://' + longURL : longURL;
  urlDatabase[shortURL] = longURL;
};

const updateUrl = (shortURL, longURL) => {
  urlDatabase[shortURL] = longURL;
};

const deleteUrl = (shortURL) => {
  delete urlDatabase[shortURL];
};

router.get('/', (req, res) => {
  res.redirect('/urls');
});

router.get('/urls', (req, res) => {
  let templateVars = { 
    user: findUserByID(req.cookies["user_id"]),
    urls: urlDatabase
  };
  res.render("urls_index", templateVars);
});

router.get('/urls/new', (req, res) => {
  let templateVars = { 
    user: findUserByID(req.cookies["user_id"]),
  };
  res.render("urls_new", templateVars);
});

router.post('/urls',(req,res) => {
  let shortURL = generateRandomString();
  let longURL = req.body.longURL;
  addNewUrl(shortURL,longURL);
  res.redirect(`/urls/${shortURL}`);
});

router.get('/urls/:shortURL', (req, res) => {
  let templateVars = { 
    user: findUserByID(req.cookies["user_id"]),
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render("urls_show", templateVars);
});

router.get('/u/:shortURL', (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(`${longURL}`);
});

router.get('/urls/:shortURL/update', (req, res) => {
  let templateVars = { 
    user: findUserByID(req.cookies["user_id"]),
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render('urls_show', templateVars)
});

router.post('/urls/:shortURL', (req, res) => {
  let shortURL = req.params.shortURL;
  let longURL = req.body.longURL;
  updateUrl(shortURL, longURL);
  res.redirect('/urls');
});

router.post('/urls/:shortURL/delete', (req, res) => {
  let shortURL = req.params.shortURL;
  deleteUrl(shortURL);
  res.redirect('/urls/');
});

module.exports = router;
