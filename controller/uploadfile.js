// Required Modules
var multer = require('multer');
var mongoose = require('mongoose')
const { Uploads } = require('../services/uploadfile')
const uploadServices = new Uploads()
var DIR = process.env.DIR

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({
    storage,
}).single('file')

// Upload the file
const uplaodfile = (req, res) => {
    upload(req, res, async () => {
        const { _id } = req.activeUser
        const { name } = req.body
        const { originalname, filename } = req.file
        const code = Math.floor(100000 + Math.random() * 900000)
        const response = await uploadServices.uploadfile({ name: originalname, filename, code, uploadedBy: mongoose.Types.ObjectId(_id) })
        res.status(response.statuscode).send(response)
    })
}

//get all logged user's uploaded files
const getAllUploadedFiles = async (req, res) => {
    const { _id } = req.activeUser
    const response = await uploadServices.getallUploadedFile(_id)
    res.status(response.statuscode).send(response)
}

//delete uploaded file
const deleteFiles = async (req, res) => {
    const { id } = req.params
    console.log("params id", id)
    const response = await uploadServices.deleteFile(id)
    res.status(response.statuscode).send(response)
}

//download uploaded file
const downloadFiles = async (req, res) => {
    const { id, code } = req.query
    const response = await uploadServices.downloadFile(id, code)
    res.status(response.statuscode).send(response)
}
module.exports = {
    uplaodfile,
    getAllUploadedFiles,
    deleteFiles,
    downloadFiles
}