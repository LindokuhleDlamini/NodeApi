module.exports = (app) => {
    const user = require('../controllers/user.controller.js')

    app.get('/user/:userId', user.findOne)

    app.post('/user', user.create)

    app.put('/user/:userId', user.update)
}