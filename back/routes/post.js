const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

try {
    fs.accessSync('uploads');
} catch (err) {
    console.log('No existing uploads folder. creating..');
    fs.mkdirSync('uploads');
    console.log('uploads folder has been created.');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
        done(null, 'uploads');
         }, 
        filename(req, file, done) { // dog.png
            const ext = path.extname(file.originalname); // extension .png
            const basename = path.basename(file.originalname, ext); // filename dog
            done(null, basename + '_' + new Date().getTime() + ext); // dog15184712891.png
        } ,
    }),
    limit: { fileSize: 20 * 1024 * 1024 }, //20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ 
                where: { name: tag.slice(1).toLowerCase() } 
            }))); // [[hello, true], [react, false]]
            await post.addHashtags(result.map((h) => h[0]));
        }

        if (req.body.image) {
            if (Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                await post.addImages(images);
            } else {
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: User, // post writer
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // comment writer
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id']
            }],
        });
        res.status(201).json(fullPost);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('The post is not found.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: post.id,
            UserId: req.user.id
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send('The post is not found.');
        }
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.patch('/:postId/unlike', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send('The post is not found.');
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/:postId', isLoggedIn ,async (req, res, next) => {
    try {
        await Post.destroy({
            where: { id: parseInt(req.params.postId), UserId: req.user.id }
        });
        res.status(200).json({ PostId: parseInt(req.params.postId) });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
    try {
        res.json(req.files.map((f) => f.filename));
    } catch (err) {
        console.error(err);
        next(err); 
    }
})


module.exports = router