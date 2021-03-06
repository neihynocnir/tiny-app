const { assert } = require('chai');
const  userByID  = require('../controllers/userByID');
const  users  = require('../db/usersDB');


describe('userByID', function() {
  it('should return a user for valid ID', function() {
    const user = userByID('bgfaJ4')
    const expectedOutput = users.bgfaJ4;
    assert.equal(user, expectedOutput);
  });

  it('should return undefined for an invalid ID', function() {
    const user = userByID('testab')
    const expectedOutput = undefined;
    assert.equal(user, expectedOutput);
  });
});