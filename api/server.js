// implement your server here
// require your posts router and connect it here
const express = require('express')
const server = express();

const postRouter = require('./posts/posts-router')

server.use(express.json());
server.use('/api/posts', postRouter)





//default endpoint
server.get('/', (req, res) => {
    res.send(`
      <h2>BLOG_API</h>
      <p>Welcome to the sick blog API bro</p>
    `);
  });

module.exports = server;