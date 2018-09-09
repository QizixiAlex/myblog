const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

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
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})

app.use('/posts', postsRoutes);

module.exports = app;
