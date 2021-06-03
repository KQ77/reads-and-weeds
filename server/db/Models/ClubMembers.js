const { conn } = require('../db');
const { DATEONLY } = require('sequelize');
const ClubMembers = conn.define('clubmembers', {
  joinDate: {
    type: DATEONLY,
    defaultValue: Date.now(),
  },
});

module.exports = { ClubMembers };
