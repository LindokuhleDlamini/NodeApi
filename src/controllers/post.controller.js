const post = require('../models/post.model.js');

exports.findAll = (req, res) => {
    post.find()
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong"
        });
    });
};

exports.findOne = (req, res) => {
    post.findById(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "No post for the provided Id" + req.params.postId
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind == "ObjectId") {
            return res.status(404).send({
                message: "No post for the provided Id" + req.params.postId
            })
        }
        return res.status(500).send({
            message: err.message || "something went wrong"
        });
    })
}

exports.create = (req, res) => {
    if (req.body.content) {
        const post = new post({
            author: req.body.author,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            createdAtUtc: req.body.createdAtUtc,
            comments: req.body.comments
        })

        post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            if(err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "No post for the provided Id" + req.params.postId
                })
            }
            res.status(500).send({
                message: err.message || "something went wrong"
            })
        })
    }

    return res.status(400).send({
        message: "No post for the provided Id"
    })
}

exports.delete = (req, res) => {
    post.findByIdAndRemove(req.params.postId)
    .then(post => {
        if (!post) {
            return res.status(400).send({
                message: "No post for the provided Id"
            })
        }
    }).catch(err => {
        if(err.kind == "ObjectId") {
            return res.status(404).send({
                message: "No post for the provided Id" + req.params.postId
            })
        }
        res.status(500).send({
            message: err.message || "Error update failed"
        })
    })

    return res.status(400).send({
        message: "No post for the provided Id"
    })
};




exports.update = (req, res) => {
    if (req.body.content) {
        const comment = {
            "author": req.body.comment.author? req.body.comment.author: "",
            "content": req.body.comment.content? req.body.comment.content: "",
        };

        const tags = {
            "type": req.body.tags.type
        }

        post.findOneAndUpdate({
            id: req.params.postId
        }, {
            author: !req.body.author? req.body.author:"",
            title: !req.body.author? req.body.author:"",
            content: !req.body.author? req.body.author:"",
            $push: {comment: comment},
            $push: {tags: tags}
        })
        .then((post) => {
            if (!post) {
                return res.status(400).send({
                    message: "No post for the provided Id"
                })
            }

            res.send(post)
        }).catch(err => {
            if(err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "No post for the provided Id" + req.params.postId
                })
            }
            res.status(500).send({
                message: err.message || "Error update failed"
            })
        })
    }

    return res.status(400).send({
        message: "No post for the provided Id"
    })
};