const { conn } = require('./db.js');
const { STRING, BOOLEAN, INTEGER, TEXT } = require('sequelize');

const Book = conn.define('book', {
  title: {
    type: STRING,
    allowNull: false,
  },
  author: {
    type: STRING,
    allowNull: false,
  },
  smallImg: {
    type: TEXT,
  },
  thumbnail: {
    type: TEXT,
  },
  isCurrent: {
    type: BOOLEAN,
    defaultValue: false,
  },
  year: {
    type: INTEGER,
  },
  pages: {
    type: INTEGER,
  },
  genre: {
    type: STRING,
  },
  description: {
    type: TEXT,
  },
  apiId: {
    type: STRING,
  },
});

module.exports = { Book };
