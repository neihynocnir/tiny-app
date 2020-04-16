const express = require('express');
const router = express.Router();
const urlDatabase = require('../db/urlsDB');
const generateRandomString = require('../controllers/genRandomString');
const findUserByID = require('../controllers/findUserByID')

// CREATE an new URL in DB
const addNewUrl = (shortURL, longURL) => {
  !longURL.includes('http') ? longURL = 'http://' + longURL : longURL;
  urlDatabase[shortURL] = longURL;
};

// UPDATE an URL in DB
const updateUrl = (shortURL, longURL) => {
  urlDatabase[shortURL] = longURL;
};

// DELETE an URL in DB
const deleteUrl = (shortURL) => {
  delete urlDatabase[shortURL];
};

// LIST of URLS
router.get('/urls', (req, res) => {
  let templateVars = { 
    user: findUserByID(req.session["user_id"]),
    urls: urlDatabase
  };
  res.render("urls_index", templateVars);
});

// Display the form to add a new URL
router.get('/urls/new', (req, res) => {
  let templateVars = { 
    user: findUserByID(req.session["user_id"]),
  };
  res.render("urls_new", templateVars);
});

// Add the new URL
router.post('/urls',(req,res) => {
  let shortURL = generateRandomString();
  let longURL = req.body.longURL;
  addNewUrl(shortURL,longURL);
  res.redirect(`/urls/${shortURL}`);
});

// Display a specific URL
router.get('/urls/:shortURL', (req, res) => {
  let templateVars = { 
    user: findUserByID(req.session["user_id"]),
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render("urls_show", templateVars);
});

// Redirect to the URL
router.get('/u/:shortURL', (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(`${longURL}`);
});

// Display the form to update a specific URL
router.get('/urls/:shortURL/update', (req, res) => {
  let templateVars = { 
    user: findUserByID(req.session["user_id"]),
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render('urls_show', templateVars)
});

// Update the specific URL
router.post('/urls/:shortURL', (req, res) => {
  let shortURL = req.params.shortURL;
  let longURL = req.body.longURL;
  updateUrl(shortURL, longURL);
  res.redirect('/urls');
});

// Delete a specific URL
router.post('/urls/:shortURL/delete', (req, res) => {
  let shortURL = req.params.shortURL;
  deleteUrl(shortURL);
  res.redirect('/urls/');
});

module.exports = router;
