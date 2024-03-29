const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const fullUser = await User.findOne({
                where: { id: req.user.id },
                attributes: ['id', 'nickname', 'email'],
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, { 
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            });
            res.status(200).json(fullUser);
        } else {
            res.status(200).json(null);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.post('/login', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(err);
                return next(loginErr);
            }
            const fullUser = await User.findOne({
                where: { id: user.id },
                attributes: ['id', 'nickname', 'email'],
                include: [{
                    model: Post,
                }, {
                    model: User,
                    as: 'Followings'
                }, {
                    model: User,
                    as: 'Followers'
                }]
            });
            return res.status(200).json(fullUser);
        });
    })(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (exUser) {
            return res.status(403) .send('The email is already in use.');
        } 

        const hashedPassword = await bcrypt.hash(req.body.password,10);
        await User.create({
            email:req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        
        res.status(201).send('ok');

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout((err)=> {
        if (err) { return next(err); }
        res.status(500);
    });
    res.status(200).send('OK');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname
        }, {
            where: { id: req.user.id }
        });
;        res.status(200).json({ nickname: req.body.nickname });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const followings = await user.getFollowings({
            limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followings);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const followers = await user.getFollowers({
            limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followers);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:userId', async (req, res, next) => {
    try {
        const fullUser = await User.findOne({
            where: { id: req.params.userId },
            attributes: ['id', 'nickname', 'email'],
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, { 
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        });
        if (fullUser) {
            const data = fullUser.toJSON();
            data.Posts = data.Posts.length; // protect the user's
            data.Followings = data.Followings.length;
            data.Followers = data.Followers.length;
            res.status(200).json(data);    
        } else {
            res.status(404).json('The user was not found.');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            return res.status(404).send('The user is not found.');
        }
        await user.addFollowers(req.user.id);
;       res.status(200).json({ id: parseInt(req.params.userId) });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            return res.status(404).send('The user is not found.');
        }
;       await user.removeFollowers(req.user.id);
;       res.status(200).json({ id: parseInt(req.params.userId) });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/:userId/follower', isLoggedIn, async (req, res, next) => {
    try {
        const follower = await User.findOne({ where: { id: req.params.userId } });
        if (!follower) {
            return res.status(404).send('The user is not found.');
        }
;       await follower.removeFollowings(req.user.id);
;       res.status(200).json({ id: parseInt(req.params.userId) });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:userId/posts', async(req, res, next) => {
    try {
        let where = { UserId: req.params.userId };
        if (parseInt(req.query.lastId, 10)) {
            // if it is not initial loading
            const lastId = parseInt(req.query.lastId, 10);
            where.id = { [Op.lt]: lastId }
         }

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
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
        res.status(200).json(posts);
    
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;