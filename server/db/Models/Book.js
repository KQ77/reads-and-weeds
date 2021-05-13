const { conn } = require('../db.js');
const { STRING, BOOLEAN, INTEGER, TEXT } = require('sequelize');

const Book = conn.define('book', {
  number: {
    type: INTEGER,
    allowNull: false,
  },
  isCurrent: {
    type: BOOLEAN,
    defaultValue: false,
  },
  gbId: {
    type: STRING,
  },
  // year: {
  //   type: INTEGER,
  // },
  // pages: {
  //   type: INTEGER,
  // },
  // genre: {
  //   type: STRING,
  // },
  // description: {
  //   type: TEXT,
  // },
  // title: {
  //   type: STRING,
  //   allowNull: false,
  // },
  // author: {
  //   type: STRING,
  //   allowNull: false,
  // },
  // smallImg: {
  //   type: TEXT,
  // },
  // thumbnail: {
  //   type: TEXT,
  // },
});

module.exports = { Book };
