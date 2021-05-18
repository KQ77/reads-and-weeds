const { conn } = require('../db.js');
const { STRING, BOOLEAN, INTEGER, TEXT } = require('sequelize');
const { Member } = require('./Member');
const { Comment } = require('./Comment');
const { Rating } = require('./Rating');

const Book = conn.define('book', {
  number: {
    type: INTEGER,
    allowNull: false,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isCurrent: {
    type: BOOLEAN,
    defaultValue: false,
  },
  gbId: {
    type: STRING,
  },
});

module.exports = { Book };
