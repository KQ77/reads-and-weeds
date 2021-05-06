const { conn } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { STRING, TEXT } = require('sequelize');

const Member = conn.define('member', {
  firstName: {
    type: STRING(40),
  },
  lastName: {
    type: STRING,
  },
  bio: {
    type: TEXT,
  },
  imageUrl: {
    type: STRING,
    defaultValue: ``,
  },
  genre: {
    type: STRING,
  },
  faveBook: {
    type: STRING,
  },
  favePick: {
    type: STRING,
  },
});

Member.authenticate = async function (email, password) {
  const user = await Member.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, process.env.JWT);
  }
  const error = Error('invalid login credentials');
  error.status = 401;
  throw error;
};

Member.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const member = await Member.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (member) {
      return member;
    }
    const error = Error('invalid token');
    error.status = 401;
    throw error;
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

module.exports = { Member };
