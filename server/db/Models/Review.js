const { conn } = require('../db.js');
const { TEXT, DECIMAL } = require('sequelize');

const Review = conn.define('review', {
  text: {
    type: TEXT,
  },
  rating: {
    type: DECIMAL,
    max: 10,
    min: 1,
  },
});

module.exports = { Review };
