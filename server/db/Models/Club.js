const { conn } = require('../db.js');
const { TEXT, STRING, BOOLEAN, INTEGER } = require('sequelize');

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
  adminId: {
    type: INTEGER,
  },
  description: {
    type: STRING,
  },
  private: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  displayImage: {
    type: STRING,
    defaultValue: '/images/defaultClub.jpeg',
  },
});

module.exports = { Club };
