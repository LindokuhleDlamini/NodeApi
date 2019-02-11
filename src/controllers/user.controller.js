const user = require('../models/user.model.js')
const mongoose = require('mongoose')

exports.findOne = (req, res) => {
    user.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No user for the provided Id" + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind == "ObjectId") {
            return res.status(404).send({
                message: "No user for the provided Id" + req.params.userId
            })
        }
        return res.status(500).send({
            message: err.message || "something went wrong"
        });
    })
}

exports.create = (req, res) => {
    if (req.body) {
        const newUser = new user({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name ? req.body.name : null,
            email: req.body.email ? req.body.email : null,
        })
        newUser.save()
        .then(user => {
            res.send(user);
        }).catch(err => {
            if(err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "No user for the provided Id" + req.params.userId
                })
            }
            res.status(500).send({
                message: err.message || "something went wrong"
            })
        })
    } else {
        return res.status(400).send({
            message: "User creation failed"
        })
    }
}

exports.update = (req, res) => {
    if (req.params.userId) {
        const UserUpdate = {};
        
        if (req.body.name) UserUpdate.name = req.body.name;
        if (req.body.email) UserUpdate.email = req.body.email;

        user.findOneAndUpdate({
            _id: req.params.userId
        }, UserUpdate)
        .then((user) => {
            if (!user) {
                return res.status(400).send({
                    message: "No user for the provided Id"
                })
            } else {
                res.send(user);
            }
        }).catch(err => {
            if(err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "No user for the provided Id" + req.params.userId
                })
            } else {
                res.status(500).send({
                    message: err.message || "Error update failed"
                })
            }
        })
    } else {
        return res.status(400).send({
            message: "No user Id provided"
        })
    }
};