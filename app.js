const express = require("express");
const path = require("path");
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require("./database/model/Post");
const fileUpload = require("express-fileupload");


const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
app.use(fileUpload());
app.use(express.static('public'));

app.use(expressEdge);

app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', async(req, res) => {

    const posts = await Post.find({})
        //console.log(posts);
    res.render('index', {
        posts
    });
});

app.get('/post/new', (req, res) => {
    res.render('create');
});

app.post('/post/store', (req, res) => {
    Post.create(req.body, (err, post) => {
        res.redirect("/");
    });

});
app.get('/post/:id', async(req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});
// app.post("/posts/store", (req, res) => {
//     const {
//         image
//     } = req.files

//     image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
//         Post.create({
//             ...req.body,
//             image: `/posts/${image.name}`
//         }, (error, post) => {
//             res.redirect('/');
//         });
//     })
// });


app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log("APP Listing on port  " + port);
});