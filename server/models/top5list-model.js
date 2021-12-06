const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String },
        views: {type: Number, required: true},
        likes: {type: [(String, String)], required: true},
        dislikes: {type: [(String, String)], required: true},
        comments: {type: [(String, String)], required: true},
        date: {type: String, required: true},
        publish: {type: Boolean, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
