const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/database');
const User = require('./models/Users');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const salt = bcrypt.genSaltSync(10);
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const secret = process.env.SECRET;

// client url
console.log(process.env.CLIENT_URL);
console.log(process.env.SECRET);

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
        return res.status(400).json('User not found');
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('Wrong Credentials');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, (err, info) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    const { token } = req.cookies;
    res.cookie('token', '').json('OK');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, secret, async (err, info) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });
        const { title, summary, content } = req.body;
        const posDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json({ posDoc });
    });
});

app.get('/posts', async (req, res) => {
    res.json(await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20));
});

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, async (err, info) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('You are not the Author');
        }

        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newPath ? newPath : postDoc.cover;
        try {
            await postDoc.save();
            res.json(postDoc);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });
});

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server Started at PORT", port);
});
