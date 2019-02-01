let express = require('express')
let router = express.Router()
let UserModel = require('../models/user.model')

module.exports = (app) => {
    const user = require('../controllers/user.controller.js')

    app.get('/user:/userId', user.findOne)

    app.post('/user/:userId', user.create)

    app.put('/user/:userId', user.update)
}