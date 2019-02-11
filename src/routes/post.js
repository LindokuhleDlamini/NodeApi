module.exports = (app) => {
    const post = require('../controllers/post.controller.js');

    app.get('/posts', post.find);

    app.get('/post/:postId', post.findOne);

    app.post('/post', post.create);

    app.put('/post/:postId', post.update);

    app.delete('/post/:postId', post.delete);
}
