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
        USEREXISTS: 601,
        USERNOTEXISTS: 602,
        INVALIDCRED: 603,
        TOKENEXPIRE: 604,
        TOKENNOTFOUND: 605
    }
}