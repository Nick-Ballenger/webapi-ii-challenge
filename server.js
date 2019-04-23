const express = require('express');

const PostRouter = require('./data/router.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
  <h1>LOTR Trivia</h1>
  `);
});

server.use('/api/posts', PostRouter);

module.exports = server;
