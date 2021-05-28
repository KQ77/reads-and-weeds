const { conn } = require('../db');
const { STRING } = require('sequelize');

const Request = conn.define('request', {});

module.exports = { Request };
