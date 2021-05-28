const { conn } = require('../db.js');
const { TEXT, STRING, BOOLEAN, TIME } = require('sequelize');

const Club = conn.define('club', {
  name: {
    type: STRING,
    allowNull: false,
  },
  location: {
    type: STRING,
  },
  meetDate: {
    type: STRING,
    defaultValue: 'TBD',
  },
  tagline: {
    type: STRING,
  },
  private: {
    type: BOOLEAN,
    allowNull: false,
  },
  displayImage: {
    type: STRING,
    defaultValue: '/images/defaultClub.jpeg',
  },
});

module.exports = { Club };
