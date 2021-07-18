//required Modules
const { uplaodfile, getAllUploadedFiles, deleteFiles, downloadFiles } = require('../controller/uploadfile')
const { appRoutes } = require('../config/constants')
const authMiddleware = require('../middleware/auth')

//application routes := upload file
const setUploadFileRoute = (app) => {
    app.post(`${appRoutes.uploadfile}/uploadfile`, authMiddleware, uplaodfile)
    app.get(`${appRoutes.uploadfile}/getallfiles`, authMiddleware, getAllUploadedFiles)
    app.get(`${appRoutes.uploadfile}/downloadfiles`, authMiddleware, downloadFiles)
    app.delete(`${appRoutes.uploadfile}/deletefiles/:id`, authMiddleware, deleteFiles)

}

module.exports = {
    setUploadFileRoute
}