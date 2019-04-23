const express = require('express');

const RouterPosts = require('./');

const server = express();

server.use(express.json())

server.use('/api/posts', RouterPosts)

//test
server.get('/', (req, res) => {
    res.send(`
    <h2> LOTR trivia </h2>
    `)
})

module.exports = server