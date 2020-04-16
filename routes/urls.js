const express = require('express');
const router = express.Router();
const urlDatabase = require('../db/urlsDB');
const generateRandomString = require('../controllers/genRandomString');
const findUserByID = require('../controllers/findUserByID');
const findUrlsUser = require('../controllers/findUrlByUser');

// CREATE an new URL in DB
const addNewUrl = (shortURL, longURL, user) => {
  !longURL.includes('http') ? longURL = 'http://' + longURL : longURL;
  urlDatabase[shortURL] = { longURL: longURL, userID: user };
};

// UPDATE an URL in DB
const updateUrl = (shortURL, longURL, user) => {
  urlDatabase[shortURL] = { longURL: longURL, userID: user };
};

// DELETE an URL in DB
const deleteUrl = (shortURL) => {
  delete urlDatabase[shortURL];
};

// LIST of URLS
router.get('/urls', (req, res) => {
  if (req.session["user_id"]) {
    let templateVars = { 
      user: findUserByID(req.session["user_id"]),
      urls: findUrlsUser(user.id)
    };
    res.render("urls_index", templateVars);
  } else {
    res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
  };
});

// Display the form to add a new URL
router.get('/urls/new', (req, res) => {
  if (req.session["user_id"]) {
    let templateVars = { 
      user: findUserByID(req.session["user_id"]),
    };
    res.render("urls_new", templateVars);
  } else {
    res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
  };
});

// Add the new URL
router.post('/urls',(req,res) => {
  if (req.session["user_id"]) {
    let shortURL = generateRandomString();
    let longURL = req.body.longURL;
    let user = req.session.user_id;
    addNewUrl(shortURL,longURL, user);
    res.redirect(`/urls/${shortURL}`);
  } else {
    res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
  }
});

// Display a specific URL
router.get('/urls/:shortURL', (req, res) => {
  if (req.session["user_id"]) {
    let templateVars = { 
      user: findUserByID(req.session["user_id"]),
      shortURL: req.params.shortURL, 
      longURL: urlDatabase[req.params.shortURL]
    };
    res.render("urls_show", templateVars);
  } else {
    res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
  };
});

// Redirect to the URL
router.get('/u/:shortURL', (req, res) => {
  let longURL = urlDatabase[req.params.shortURL].longURL;
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
  if (req.session["user_id"]) {
    let user = req.session.user_id;
    console.log(user);
    let shortURL = req.params.shortURL;
    let longURL = req.body.longURL;
    updateUrl(shortURL, longURL, user);
    res.redirect('/urls');
  } else {
    res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
  }
});

// Delete a specific URL
router.post('/urls/:shortURL/delete', (req, res) => {
  if (req.session["user_id"]) {
    let shortURL = req.params.shortURL;
    deleteUrl(shortURL);
    res.redirect('/urls/');
  } else {
    res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
  }
});

module.exports = router;
