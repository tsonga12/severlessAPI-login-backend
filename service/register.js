var bcrypt = require('bcryptjs')
var buildResponse = require('../utils/util')
var User = require('../models/user')

async function register(userInfo) {
  var username = userInfo.username
  var password = userInfo.password
  if (!username || !password) {
    return buildResponse(401, {
      message: 'All fields are required'
    })
  }

  const foundUser = await User.findOne({username: username.toLowerCase()})
  if (foundUser) {
    return buildResponse(401, {
      message: 'username already exists in our database. please choose a different username'
    })
  }
  //const salt = bcrypt.genSaltSync(10);
  const encryptedPW = bcrypt.hashSync(password.toString(), 10);
  const user = new User({
    username: username.toLowerCase().trim(),
    password: encryptedPW
  })


  const saveUserResponse = await user.save()
  if (!saveUserResponse) {
    return buildResponse(503, { message: 'Server Error. Please try again later.'});
  }

  return buildResponse(200, { userID: saveUserResponse._id });
}

module.exports = register
