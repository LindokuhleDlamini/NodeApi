let express = require('express')

let router = express.Router()

router.get('/person', (req, res) => {
    if(req.query.name) {
        res.send(`Person request ${req.query.name} age ${req.query.age}`)
    }
    else {
        res.send('Person request')
    }
    
})

router.get('/person/:name', (req, res) => {
    res.send(`Person request ${req.params.name}`)
})

router.get('/error', (req, res) => {
    throw new Error('Error')
})

module.exports = router