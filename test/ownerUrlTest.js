const { assert } = require('chai');
const { ownerURL } = require('../controllers/ownerURL');


const testUrlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "bgfaJ4" },
  afg8Tx: { longURL: "https://www.google.ca", userID: "bgfaJ4" },
  i3BoGr: { longURL: "https://www.google.com", userID: "aJ48lW" },
  onh6yg: { longURL: "https://www.semana.com", userID: "aJ48lW" }
};;

describe('ownerURL', function() {
  it('should return the ID of the owner of a specific shortURL', function() {
    let ownerID = ownerURL('b6UTxQ')
    let expectedOutput = "bgfaJ4";
    assert.equal(ownerID, expectedOutput);
  });
});