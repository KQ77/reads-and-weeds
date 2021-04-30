const { conn } = require('../db.js');
const { TEXT } = require('sequelize');

const Suggestion = conn.define('suggestion', {
  text: {
    type: TEXT,
  },
});

module.exports = { Suggestion };
