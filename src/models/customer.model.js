let mongoose = require('mongoose')

const db = "mongodb://lindor:Password11@ds155091.mlab.com:55091/lindor"

mongoose.connect(db, {useNewUrlParser: true})

//console.log("Schema")
let CustomerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)