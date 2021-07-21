const { uploadsSchema } = require('../model/uploadfile')
const { statusCode } = require('../config/constants')
const fs = require('fs')
var DIR = process.env.DIR

class Uploads {
    async uploadfile({ name, filename, code, uploadedBy }) {
        try {
            await uploadsSchema.create({ name, filename, link: `http://localhost:4200/showimage?link=http://localhost:4000/${filename}`, code, uploadedBy })
            return {
                success: true,
                msg: "File Uploaded Successfull",
                statuscode: statusCode.SUCCESS
            }
        } catch (err) {
            throw err
        }
    }

    async getallUploadedFile(uploadedBy) {
        try {
            const result = await uploadsSchema.find({ uploadedBy })

            if (result.length) {
                var finalarr = []

                for (let i = 0; i < result.length; i++) {
                    var promise = new Promise((resolve, reject) => {
                        var obj = {
                            id: result[i]._id,
                            name: result[i].name,
                            filename: result[i].filename,
                            code: result[i].code,
                            shareLink: result[i].link
                        }
                        finalarr.push(obj)
                        resolve(finalarr)
                    })
                }
                promise.then((data) => {
                })
                return {
                    success: true,
                    data: finalarr,
                    statuscode: statusCode.SUCCESS
                }
            } else {
                return {
                    success: false,
                    msg: "data not found",
                    statuscode: statusCode.NOTFOUND
                }
            }
        } catch (err) {
            throw err
        }
    }
    async getsinglefile(_id) {
        try {
            const result = await uploadsSchema.findOne({ _id })
            return result
        } catch (err) {
            throw err
        }
    }

    async deleteFile(_id) {
        const file = await this.getsinglefile(_id)
        await uploadsSchema.findByIdAndDelete(_id)
        fs.unlink(`${DIR}/${file.filename}`, (err => {
            if (err) {
                throw err
            }
        }))
        return {
            success: true,
            msg: "File Deleted Successfull",
            statuscode: statusCode.SUCCESS
        }

    }

    async downloadFile(_id, code) {
        const result = await uploadsSchema.findOne({ _id, code })
        console.log(result)
        if (result && result.code == code) {
            return {
                success: true,
                data: result,
                statuscode: statusCode.SUCCESS
            }
        } else {
            return {
                success: false,
                msg: "Incorrect Secret Code",
                statuscode: statusCode.INVALIDCRED
            }

        }
    }

    async checkCode(filename, code) {
        const result = await uploadsSchema.findOne({ filename, code })
        console.log(result)
        if (result && result.code == code) {
            return {
                success: true,
                msg: {
                    link: `http://localhost:4000/${result.filename}`,
                    filename: result.name
                },
            }
        } else {
            return {
                success: false,
                msg: "Incorrect Secret Code",
            }
        }
    }
}

module.exports = {
    Uploads
}