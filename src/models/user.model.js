let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: String,
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('User', UserSchema)