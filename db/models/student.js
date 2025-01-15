'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');

const sequelize = require('./sequelize.js');

module.exports = sequelize.define(
  'Student',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    age: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    gender: {
      allowNull: false,
      type: Sequelize.STRING
    },
    path: {
      type: Sequelize.STRING
    },
    initialFileName: {
      type: Sequelize.STRING
    },
    modifiedFileName: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    tableName: 'students'
  }
);