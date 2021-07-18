//Required Modules
const mongoose = require('mongoose')
const schema = mongoose.Schema

//Creating User Schema
const userSchema = new schema(
    {
        name: { type: String },
        username: { type: String },
        password: { type: String },
        createdAt: { type: Date, default: Date.now }
    }
)

module.exports = {
    userSchema: mongoose.model('user', userSchema)
}