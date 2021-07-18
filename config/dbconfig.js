//required modules
const mongoose = require('mongoose')

//create DB connection
function connectToDB() {
    mongoose.connect('mongodb://localhost:27017/mobigic',
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Connected To Database")
            }
        })
}

module.exports = {
    connectToDB
}