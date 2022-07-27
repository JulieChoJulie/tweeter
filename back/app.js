const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./models');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const passportconfig = require('./passport');

dotenv.config();

const app = express();
passportconfig();

db.sequelize.sync()
    .then(() => {
        console.log('db connect success');
    })
    .catch(console.error);

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
})));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/api', (req, res) => {
    res.send('hello api');
});

app.get('/api/posts', (req, res) => {
    res.json([
        {
            id:1, content: 'hello'
        },
        {id: 2, content: 'hello2'}
    ])
});

app.post('/api/', (req, res) => {
    res.json([{ id: 1, nickname: 'julie'}])
});

app.delete('/api/', (req, res) => {
    res.json({ id: 1 })
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('server on!')
})