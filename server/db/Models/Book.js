const { conn } = require('../db.js');
const { STRING, BOOLEAN, INTEGER, TEXT, DATE } = require('sequelize');
const { Rating } = require('./Rating');

const Book = conn.define('book', {
  // number: {
  //   type: INTEGER,
  //   allowNull: false,
  // },
  dateFinished: {
    type: DATE,
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
