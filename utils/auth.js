var jwt = require('jsonwebtoken')
var User = require('../models/user')
function generateToken(userInfo) {
  if (!userInfo) {
    return null;
  }

  return jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}
 async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, async (error, response) => {
    if (error) {
      return {
        verified: false,
        message: 'invalid token'
      }
    }

    const foundUser = await User.findOne({_id: response.userID})
    if (foundUser === null) {
      return {
        verified: false,
        message: 'invalid user'
      }
    }

    return {
      verified: true,
      message: 'verifed'
    }
  })
}
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
}

