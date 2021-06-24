var buildResponse = require( '../utils/util')
var bcrypt = require('bcryptjs')
var {generateToken} = require('../utils/auth')
var  User = require('../models/user')

async function login(user) {
  const username = user.username;
  const password = user.password;
  if (!user || !username || !password) {
    return buildResponse(401, {
      message: 'username and password are required'
    })
  }

  const foundUser = await User.findOne({username: username})
  if (!foundUser) {
    return buildResponse(403, { message: 'user does not exist'});
  }

  if (!bcrypt.compareSync(password.toString(), foundUser.password)) {
    return buildResponse(403, { message: 'password is incorrect'});
  }

  const userInfo = {
    userID: foundUser._id,
  }


  const token = generateToken(userInfo)

  const response = {
    user: foundUser._id,
    token: token
  }
  return buildResponse(200, response);
}
module.exports = login 
