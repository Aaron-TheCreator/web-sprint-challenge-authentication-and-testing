const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./auth/errorHandler.js');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!


server.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Auth API"
    })
});

server.use(errorHandler);

module.exports = server;
