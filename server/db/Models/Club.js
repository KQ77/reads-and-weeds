const { conn } = require('../db.js');
const { TEXT, STRING } = require('sequelize');

const Club = conn.define('club', {
  name: {
    type: STRING,
    allowNull: false,
  },
  location: {
    type: STRING,
  },
  tagline: {
    type: STRING,
  },
});

module.exports = { Club };
