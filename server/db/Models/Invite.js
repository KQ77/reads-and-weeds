const { conn } = require('../db.js');
const { INTEGER, UUIDV4, UUID, STRING } = require('sequelize');
const Invite = conn.define('invite', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },

  senderId: {
    type: INTEGER,
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { Invite };
