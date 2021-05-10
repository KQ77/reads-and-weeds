const { conn } = require('../db');

const ClubMembers = conn.define('clubmembers', {});

module.exports = { ClubMembers };
