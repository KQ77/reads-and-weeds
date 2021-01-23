const { conn } = require('./db');
const { STRING, TEXT } = require('sequelize');

const Member = conn.define('member', {
  firstName: {
    type: STRING(40),
  },
  lastName: {
    type: STRING,
  },
  bio: {
    type: TEXT,
  },
  imageUrl: {
    type: STRING,
    defaultValue: ``,
  },
  genre: {
    type: STRING,
  },
  faveBook: {
    type: STRING,
  },
  favePick: {
    type: STRING,
  },
});

module.exports = { Member };
