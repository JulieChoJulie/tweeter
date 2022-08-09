const express = require('express');
const { Op } = require('sequelize');
const { Hashtag, Post, Image, Comment, User } = require('../models');
const router = express.Router();

router.get('/:tag/posts', async(req, res, next) => {
    try {
        let where = {};
        let postsLength = undefined;
        const lastId = parseInt(req.query.lastId, 10);
        console.log(lastId);
        console.log('------------------------')
        if (lastId) { // when it's not initial loading
            console.log(lastId);
            console.log('***********************')
            where.id = { [Op.lt]: lastId }
        } else { // initial loading
            const hashtagPosts = await Post.findAll({
                include: [{
                    model: Hashtag,
                    where: { name: decodeURIComponent(req.params.tag) }
                }]
            });
           postsLength = hashtagPosts.length;
        }
       
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: Hashtag,
                where: { name: decodeURIComponent(req.params.tag) },
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                order: [[Comment, 'createdAt', 'DESC']],
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id']
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }],
        });



        res.status(200).json({ posts, postsLength });
    
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;