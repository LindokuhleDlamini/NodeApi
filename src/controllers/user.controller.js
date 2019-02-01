const user = require('../models/user.model.js')

exports.findOne = (req, res) => {
    post.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No user for the provided Id" + req.params.userId
            });
        }
        res.send(post);
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
    if (req.body.content) {
        const user = new user({
            name: req.body.name,
            email: req.body.email,
        })
        user.save()
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
    }

    return res.status(400).send({
        message: "No user for the provided Id"
    })
}

exports.update = (req, res) => {
    if (req.body.content) {
        user.findOneAndUpdate({
            id: req.params.postId
        }, {
            name: req.body.name? req.body.name: "",
            email: req.body.email? req.body.email: "",
        })
        .then((user) => {
            if (!user) {
                return res.status(400).send({
                    message: "No user for the provided Id"
                })
            }

            res.send(user)
        }).catch(err => {
            if(err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "No user for the provided Id" + req.params.userId
                })
            }
            res.status(500).send({
                message: err.message || "Error update failed"
            })
        })
    }

    return res.status(400).send({
        message: "No user for the provided Id"
    })
};