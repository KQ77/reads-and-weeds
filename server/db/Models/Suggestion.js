const { conn } = require('../db.js');
const { STRING } = require('sequelize');

const Suggestion = conn.define('suggestion', {
  bookId: STRING,
});

module.exports = { Suggestion };
