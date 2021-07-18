// Required modules
require('dotenv').config()
const express = require('express')
const APP = express()
const { connectToDB } = require('./config/dbconfig')
const { setDefaultMiddleware } = require('./config/helper')
const { setUserroute } = require('./route/user')
const { setUploadFileRoute } = require('./route/uploadfile')

// mongodb connection
connectToDB()

//setting default middleware
setDefaultMiddleware(APP)

//Application Routes
setUserroute(APP),
setUploadFileRoute(APP)

//Server Start
APP.listen(process.env.PORT, () => {
    console.log(`Server Started on port : ${process.env.PORT}`)
})