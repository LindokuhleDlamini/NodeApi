let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let PostSchema = new Schema({
    id: ObjectId,
    author: String,
    title: String,
    body: String,
    tags: [{type: String}],
    createdAtUtc: Date,
    comments: [{
        author: {
            type: String,
            require: true,
        },
        body: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true
        }}]
})

module.exports = mongoose.model('Post', PostSchema);