const { userSchema } = require('../model/user')
const { statusCode } = require('../config/constants')
const { encrypt, compare, generateJwtToken } = require('../config/helper')
class UserService {
    async signUp(name, username, password) {
        try {
            const isUserExists = await this.userExists(username)
            if (!isUserExists) {
                const encPassword = await encrypt(password)
                await userSchema.create({ name, username, password: encPassword })
                return {
                    success: true,
                    msg: "Registration Successfull",
                    statuscode: statusCode.SUCCESS
                }
            } else {
                return {
                    success: false,
                    msg: "User Already Exists",
                    statuscode: statusCode.USEREXISTS
                }
            }
        } catch (err) {
            throw err
        }

    }
    async userExists(username) {
        try {
            const user = await userSchema.findOne({ username })
            if (user) {
                return true
            }
            return false
        } catch (err) {
            throw err
        }

    }
    async signIn(username, password) {
        const user = await userSchema.findOne({ username })
        if (!user) {
            return {
                success: false,
                msg: "username does not exists",
                statuscode: statusCode.USERNOTEXISTS
            }
        } else {
            const validpassword = await compare(password, user.password)
            if (!validpassword) {
                return {
                    success: false,
                    msg: "invalid password",
                    statuscode: statusCode.INVALIDCRED
                }
            } else {
                const token = await generateJwtToken(username, user._id)
                return {
                    success: true,
                    msg: "login successfull",
                    token: token,
                    statuscode: statusCode.SUCCESS
                }
            }
        }
    }
}

module.exports = {
    UserService
}