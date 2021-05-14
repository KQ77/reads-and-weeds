const { conn } = require('../db.js');
const { TEXT, STRING, BOOLEAN } = require('sequelize');

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
