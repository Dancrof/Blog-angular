const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const Home = require('../models/Home');
const Post = require('../models/Post');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello Word'))

router.post('/signup', async(req, res) => {

    const {
        username,
        email,
        password,
        fechaNacimiento,
        ubicacion,
        estadoCivil,
        trabajo,
        telefono
    } = req.body;

    const newUser = new User({
        username: username,
        email: email,
        password: password,
        fechaNacimiento: fechaNacimiento,
        ubicacion: ubicacion,
        estadoCivil: estadoCivil,
        trabajo: trabajo,
        telefono: telefono
    });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretkey')

    res.status(200).json({ token: token })
})

router.post('/post', async(req, res) => {

    const { title, description, postTime } = req.body;

    const newPost = new Post({ title: title, description: description, postTime: postTime });
    await newPost.save();

    const token = jwt.sign({ _id: newPost._id }, 'secretkey')

    res.status(200).json({ token: token })
})

router.post('/login', async(req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) return res.status(401).send("The email doesn't exists");
    if (user.password !== password) return res.status(401).send("The password is incorrect");
    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token: token });
})

router.get('/home', (req, res) => {
    res.json([

        {
            _id: 1,
            description: 'Welcome to My Blog',
            photo: 'Photo Where',
            date: '2021-04-19'
        }
    ])
})

router.get('/post', verifyToken, (req, res) => {
    res.json([

        {
            _id: 1,
            title: "MI primer post",
            description: "dwadawwdadsdadwadadwadañsadwq2wad",
        }
    ])
})

router.get('/profile', verifyToken, (req, res) => {

    res.json([{
        _id: 1,
        username: "bryanKiller",
        email: "bryankiller@me.com",
        fechaNacimiento: "1999-04-27",
        ubicacion: "Ecuador",
        estadoCivil: "Soltero",
        trabajo: "albañil",
        telefono: "099999999",
        password: "123456"
    }])
})

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('authorization denies');
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token == 'null') {
        return res.status(401).send('authorization denies');
    }

    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload._id;
    next();
}