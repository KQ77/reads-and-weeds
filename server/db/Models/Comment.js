const { conn } = require('../db.js');
const { TEXT } = require('sequelize');

const Comment = conn.define('comment', {
  comment: {
    type: TEXT,
  },
});

module.exports = { Comment };
