const post = require('../models/post.model.js');
const mongoose = require('mongoose')

exports.find = (req, res) => {
    post.find()
    .limit(10)
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'No posts found'
        });
    });
};

exports.findOne = (req, res) => {
    if (req.params.postId)
    {
        post.findById(req.params.postId)
        .then(post => {
            if(!post) {
                return res.status(404).send({
                    message: `No post for the provided Id ${req.params.postId}`
                });
            }
            res.send(post);
        }).catch(err => {
            if(err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: `No post for the provided Id' ${req.params.postId}`
                })
            }
            return res.status(500).send({
                message: err.message || 'Post not found'
            });
        })
    } else {
        return res.status(400).send({
            message: 'Post not found'
        })
    }
};

exports.create = (req, res) => {
    if (req.body) {
        let newPost = new post({
            _id: mongoose.Types.ObjectId(),
            author: req.body.author ? req.body.author : null,
            title: req.body.title ? req.body.title : null,
            body: req.body.content ? req.body.content : null,
            tags: req.body.tags ? [req.body.tags] : null,
            createdAtUtc: Date.now()
        })
        newPost.save()
        .then(data => {
            console.log(data)
            return res.send(data);
        }).catch(err => {
            if(err.kind == 'ObjectId') {
                return res.status(404, {
                    message: err.message || 'Post could not be added' 
                }).send()
            }
            res.status(500).send({
                message: 'Post creation failed'
            })
         })
    } else {
        return res.status(400).send({
            message: 'No content provided'
        })
    }
};

exports.delete = (req, res) => {
    if (req.params.postId) {
        post.findByIdAndRemove(req.params.postId)
        .then(post => {
            if (!post) {
                return res.status(400).send({
                    message: 'No post for the provided Id'
                })
            } else {
                return res.send(`post with Id ${req.params.postId} has been deleted`)
            }
        }).catch(err => {
            if(err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: `No post for the provided Id ${req.params.postId}`
                })
            }
            return res.status(500).send({
                message: err.message || 'Error deletion failed'
            })
        })
    } else {
        return res.status(400).send({
            message: 'No post Id provided'
        })
    }
};

exports.update = (req, res) => {
    if (req.params.postId) {
        const postUpdate = {};
        const commentObj = {};
        if(req.body.comment)
        {
            if (req.body.comment.author) commentObj.author = req.body.comment.author;
            if (req.body.comment.content) commentObj.body = req.body.comment.content;
            postUpdate.$push = {comments: commentObj}
        }

        if (req.body.author) postUpdate.author = req.body.author;
        if (req.body.title) postUpdate.title = req.body.title;
        if (req.body.content) postUpdate.body = req.body.content;
        if (req.body.tags) postUpdate.$push = {tags: req.body.tags};

        post.findOneAndUpdate({
            _id: req.params.postId
        }, postUpdate )
        .then((post) => {
            if (!post) {
                return res.status(400).send({
                    message: 'No post for the provided Id'
                })
            } else{
                return res.send(post)
            }
        }).catch(err => {
            if(err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: `No post for the provided Id catch ${req.params.postId}`
                })
            }
            res.status(500).send({
                message: err.message || 'Error update failed'
            })
        })
    } else {
        return res.status(400).send({
            message: 'No post Id provided'
        })
    }
};