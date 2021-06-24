var register = require('./service/register')
var login = require('./service/login')
var verify = require('./service/verify')
var buildResponse = require('./utils/util')
var mongoose = require('mongoose')
var healthPath = '/health';
var registerPath = '/register';
var loginPath = '/login';
var verifyPath = '/verify';

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then( ()=>{
    console.log("Database connected")
  }).catch( error => {
    console.log(error)
  });
 mongoose.set("useCreateIndex", true)

exports.handler = async (event) => {
    console.log('Request Event: ', event);
    let response;
    switch(true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === registerPath:
            const registerBody = JSON.parse(event.body);
            response = await register(registerBody);
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = await login(loginBody);
            break;
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body);
            response = await verify(verifyBody);
            break;
        default:
            response = buildResponse(404, '404 Not Found');
    }
    return response;
};

