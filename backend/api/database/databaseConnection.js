const Sequelize = require('sequelize');
const databaseConfig = require('../../config/databaseConfig');

const databaseConnection = new Sequelize(databaseConfig);

module.exports = databaseConnection;