module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');

    app.get('/posts', posts.find);

    app.get('/post/:postId', posts.findOne);

    app.post('/post', posts.create);

    app.put('/post/:postId', posts.update);

    app.delete('/post/:postId', posts.delete);
}
