const Comment = require('../models/Comment');
const Podcast = require('../models/Podcast');
const User = require('../models/User');
const databaseConnection = require('./databaseConnection');

const initModels = async ( ) => {
    await Comment.init(databaseConnection);
    await Podcast.init(databaseConnection);
    await User.init(databaseConnection);

    await Comment.associate(databaseConnection.models);
}

module.exports = initModels;