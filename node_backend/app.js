const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post');

mongoose.connect('mongodb+srv://alex:fn21Sm9Mfx6ceK3k@cluster0-abfi5.mongodb.net/test?retryWrites=true')
.then(()=>{
  console.log('Connected to database!');
}).catch(()=>{
  console.log('Connection failure!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post('/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });
})

app.get('/posts', (req, res, next)=>{
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched",
      posts: documents
    });
  });
});

app.delete('/posts/:id',  (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
