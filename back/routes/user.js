const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();


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

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.status(200).send('OK');
})

module.exports = router;