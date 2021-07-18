const bodyparser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { bCrypt, secretKey } = require('./constants')

function setDefaultMiddleware(APP) {
    //Enable CORS
    APP.use(cors({ credentials: true, origin: true }))
    APP.use(function (req, res, next) {
        var allowedOrigins = [`http://localhost:${process.env.PORT}`];
        var origin = req.headers.origin;
        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'origin,Content-Type, Authorization,X-Requested-With,Accept');
        res.header('Access-Control-Allow-Credentials', true);
        return next();
    });

    //Bodyparsing (JSON and Multi-Form)
    APP.use(bodyparser.json({ limit: '1000mb' }))
    APP.use(bodyparser.urlencoded({ limit: '1000mb', extended: true }))
}

async function generateJwtToken(username, id) {
    const result = await jwt.sign({ username, id }, secretKey, { expiresIn: '24h' })
    return result
}

async function encrypt(password) {
    const pass = await bcrypt.hash(password, bCrypt.salt)
    return pass;
}

async function compare(password, hash) {
    const result = await bcrypt.compare(password, hash)
    return result;
}
module.exports = {
    setDefaultMiddleware,
    encrypt,
    compare,
    generateJwtToken
}