var buildResponse = require('../utils/util')
var {verifyToken} = require( '../utils/auth')

async function verify(requestBody) {
  
  if (!requestBody.token) {
    return buildResponse(401, { 
      verified: false,
      message: 'incorrect request body'
    })
  }

  const token = requestBody.token;
  const verification = await verifyToken(token);
  if (!verification.verified) {
    return buildResponse(401, verification );
  }

  return buildResponse(200, {
    verified: true,
    message: 'success',
    token: token
  })
}
module.exports = verify;
