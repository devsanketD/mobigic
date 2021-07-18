// Required Modules
const mognoose = require('mongoose')
const schema = mognoose.Schema

//Creating upload file Schema
const uploadsSchema = new schema(
    {
        name: { type: String },
        code: { type: Number },
        filename: { type: String },
        uploadedBy: { type: schema.Types.ObjectId, ref: 'user' },
        createdAt: { type: Date, default: Date.now }
    }
)

module.exports = {
    uploadsSchema: mognoose.model('uploads', uploadsSchema)
}