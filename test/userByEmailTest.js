const { assert } = require('chai');
const { userByEmail } = require('../controllers/userByEmail');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('userByEmail', function() {
  it('should return a user for a valid email', function() {
    const user = userByEmail("user@example.com")
    const expectedOutput = "userRandomID";
    assert.equal(user, expectedOutput);
  });
});