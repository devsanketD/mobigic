//Application Constants
module.exports = {
    bCrypt: {
        salt: 10
    },
    secretKey: 'json web token',
    appRoutes: {
        user: '/user',
        uploadfile: '/upload'
    },
    statusCode: {
        SUCCESS: 200,
        NOTFOUND: 404,
        USEREXISTS: 411,
        USERNOTEXISTS: 412,
        INVALIDCRED: 413,
        TOKENEXPIRE: 414,
        TOKENNOTFOUND: 415
    }
}