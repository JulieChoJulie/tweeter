const express = require('express');
const router = express.Router();
const { Post, Comment, Image } = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: {id: post.id },
            include: [{
                model: Image, 
            }, {
                mode: Comment,
            }, {
                model: User,
            }]
        })
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            id: req.params.postId
        });
        if (!post) {
            return res.status(403).send('The post is not found.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id
        });
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router