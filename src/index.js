let express = require('express')
let app = express()
let path = require('path')
let bodyParser = require('body-parser')
const db = require('./db.js');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(db.url, {useNewUrlParser: true}).then(() => {
    console.log('DB connected');
}).catch(err => {
    console.log('Could not connect to Database. error..', err);
    process.exit();
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT= process.env.PORT || 3000
require('./routes/user')(app);
require('./routes/post.js')(app);
app.listen(PORT, () => console.info(`Server running on ${PORT}`))