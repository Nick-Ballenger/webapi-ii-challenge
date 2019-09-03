

const server = require('./server');

const port = 9001

server.listen(port, () => {
    console.log(`Server running on port ${port} and it's power level is over 9000!`)
}) 