const { conn } = require('../db.js');
const { TEXT } = require('sequelize');

const Comment = conn.define('comment', {
  text: {
    type: TEXT,
  },
});

module.exports = { Comment };
