let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let PostSchema = new Schema({
    id: ObjectId,
    author: String,
    title: String,
    content: String,
    tags: [{type: String}],
    createdAtUtc: Date,
    comments: [{
        author: String,
        content: String,
        createdAtUtc: Date
    }]
})

module.exports = mongoose.model('Post', PostSchema);