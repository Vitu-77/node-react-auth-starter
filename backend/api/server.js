require("dotenv-safe").config();

const express = require('express');
const server = express();
const cors = require('cors');
const corsConfig = require('../config/corsConfig');
const PORT = process.env.PORT || 3333;

const userRoute = require('./routes/users');
const podcastRoute = require('./routes/podcasts');
const commentsRoute = require('./routes/comments');
const authenticationRoute = require('./routes/authentication');

const initModels = require('./database/initModels');

initModels();

server.use(cors(corsConfig));

server.use(express.static('uploads'));
server.use(express.json());

server.use(userRoute);
server.use(podcastRoute);
server.use(commentsRoute);
server.use(authenticationRoute);

server.listen(PORT, () => {
    console.log(`> Server listenning on the port ${PORT}`);
});