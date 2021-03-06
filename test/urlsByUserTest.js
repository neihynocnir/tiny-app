const { assert } = require('chai');
const  urlsByUser  = require('../controllers/urlsByUser');

const testUrlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "bgfaJ4" },
  afg8Tx: { longURL: "https://www.google.ca", userID: "bgfaJ4" },
  i3BoGr: { longURL: "https://www.google.com", userID: "aJ48lW" },
  onh6yg: { longURL: "https://www.semana.com", userID: "aJ48lW" }
};

describe('urlsByUser', function() {
  it('should return the list of urls for a specific userID', function() {
    const urlsUser = urlsByUser('aJ48lW')
    const expectedOutput =  { 
      i3BoGr: {longURL: "https://www.google.com",userID: "aJ48lW"},
      onh6yg: {longURL: "https://www.semana.com", userID: "aJ48lW"}}
    assert.deepEqual(urlsUser, expectedOutput);
  });

  it('should return empty list of urls for a specific userID that does not have urls', function() {
    const urlsUser = urlsByUser('testab')
    const expectedOutput =  {}
    assert.deepEqual(urlsUser, expectedOutput);
  });
});