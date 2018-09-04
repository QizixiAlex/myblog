const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
})

app.get('/posts', (req, res, next)=>{
  const posts = [
    {
      id: "server_id1",
      title: "server_title1",
      content: "server_content1"
    },
    {
      id: "server_id2",
      title: "server_title2",
      content: "server_content3"
    }
  ];
  res.status(200).json({
    message: "Posts fetched",
    posts: posts
  });
});

module.exports = app;
