const { assert } = require('chai');
const  userByEmail  = require('../controllers/userByEmail');
const  users  = require('../db/usersDB');

describe('userByEmail', function() {
  it('should return a user for a valid email', function() {
    const user = userByEmail("user@example.com")
    const expectedOutput = users.bgfaJ4;
    assert.equal(user, expectedOutput);
  });
});