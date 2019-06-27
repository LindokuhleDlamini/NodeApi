const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(db.url, {useNewUrlParser: true}).then(() => {
        console.log('DB connected');
    }).catch(err => {
        console.log('Could not connect to Database. error..', err);
        process.exit();
    }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./routes/user.js')(app);
require('./routes/post.js')(app);
app.listen(PORT, () => console.info(`Server running on ${PORT}`));