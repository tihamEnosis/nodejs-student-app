const { Sequelize } = require('sequelize');
const node_env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[node_env];

const sequelize = new Sequelize(config);

module.exports = sequelize;