const { conn } = require('../db');
const { STRING } = require('sequelize');

const Image = conn.define('image', {
  src: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = { Image };
