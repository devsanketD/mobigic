let jwt = require('jsonwebtoken'); // import package
let { statusCode } = require('../config/constants')
function isAuthenticate(req, res, next) {
    let token = req.headers['authorization'];// get token from headers
    //check if token is present or not 

    if (token == undefined) {
        // if there is no token
        // return an error\consoe
        console.log('error')
        return res.send({
            success: false,
            message: 'No token provided.',
            sessionEnd: true,
            statuscode: statusCode.TOKENNOTFOUND
        });
    }
    else if (token.split(' ')[1] != null) {
        //If token present then validate and check for expiration
        jwt.verify(token.split(' ')[1], 'json web token', function (err, tokenData) {
            if (err) {
                //if it gets error then that means token has expired.
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    sessionEnd: true,
                    statuscode: statusCode.TOKENEXPIRE
                });
            } else {
                // token is validated and it is still alive
                // get user data with respect to passed token and add user information to request
                req.tokenData = tokenData;
                console.log("tokenData :", tokenData)
                req.activeUser = {
                    _id: tokenData.id
                }
                // you can create functions like this to allow only perticular role to in.
                next();
            }
        });
    }


}
module.exports = isAuthenticate;
