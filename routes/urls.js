const express = require('express');
const router = express.Router();
const urlDatabase = require('../db/urlsDB');
const generateRandomString = require('../controllers/genRandomString');
const userByID = require('../controllers/userByID');
const urlsByUser = require('../controllers/urlsByUser');
const ownerShortURL = require('../controllers/ownerURL');

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

// CHECK that a shortURL exist in DB
const validUrl = (shortURL) => {
  for (let each in urlDatabase) {
    if (each === shortURL) {
      return true;
    }
  }
  return false;
}

// LIST of URLS
router.get('/urls', (req, res) => {
  if (req.session["user_id"]) {
    let templateVars = { 
      user: userByID(req.session.user_id),
      urls: urlsByUser(req.session.user_id)
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
      user: userByID(req.session["user_id"]),
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
  console.log(validUrl(req.params.shortURL));
  if (req.session["user_id"] && validUrl(req.params.shortURL))  {
    let templateVars = { 
      user: userByID(req.session["user_id"]),
      shortURL: req.params.shortURL, 
      longURL: urlDatabase[req.params.shortURL]
    };
    res.render("urls_show", templateVars);
  } else if (req.session["user_id"]  && !validUrl(req.params.shortURL)) {
    res.status(404).send('shortURL does not exist, <a href="/"> urls </a>');
  } else {
    res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
  };
});

// Redirect to the URL
router.get('/u/:shortURL', (req, res) => {
  if (validUrl(req.params.shortURL)){
    let longURL = urlDatabase[req.params.shortURL].longURL;
    res.redirect(`${longURL}`);
  } else {
    res.status(404).send('shortURL does not exist, <a href="/"> urls </a>');
  }
});

// Display the form to update a specific URL
router.get('/urls/:shortURL/update', (req, res) => {
  let templateVars = { 
    user: userByID(req.session["user_id"]),
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render('urls_show', templateVars)
});

// Update the specific URL
router.post('/urls/:shortURL', (req, res) => {
  if (ownerShortURL(req.params.shortURL) === userByID(req.session["user_id"]).id) {
    let user = req.session.user_id;
    let shortURL = req.params.shortURL;
    let longURL = req.body.longURL;
    updateUrl(shortURL, longURL, user);
    res.redirect('/urls');
  } else {
    res.status(403).send('Forbidden, permissions just for the owner');
  };
  if (!req.session["user_id"]) res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
});

// Delete a specific URL
router.post('/urls/:shortURL/delete', (req, res) => {
  if (ownerShortURLs(req.params.shortURL) === userByID(req.session["user_id"]).id) {
    let shortURL = req.params.shortURL;
    deleteUrl(shortURL);
    res.redirect('/urls/');
  } else {
    res.status(403).send('Forbidden, permissions just for the owner');
  };
  if (!req.session["user_id"]) res.status(401).send('Unauthorized, please <a href="/"> Login </a>');
});

module.exports = router;
