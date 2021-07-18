//required module
const { signUp, signIn } = require('../controller/user_controller')
const { appRoutes } = require('../config/constants')

//application routes := user
const setUserroute = (app) => {
    app.post(`${appRoutes.user}/signup`, signUp)
    app.post(`${appRoutes.user}/signin`, signIn)
}

module.exports = {
    setUserroute
}