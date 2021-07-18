// Required modules
const { UserService } = require('../services/user')
const userService = new UserService()

//user registration
const signUp = async (req, res) => {
    const { name, username, password } = req.body
    const response = await userService.signUp(name, username, password)
    res.status(response.statuscode).send(response)
}

//user logIn
const signIn = async (req, res) => {
    const { username, password } = req.body
    const response = await userService.signIn(username, password)
    res.status(response.statuscode).send(response)
}
module.exports = {
    signUp,
    signIn
}