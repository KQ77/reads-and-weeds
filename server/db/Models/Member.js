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
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  bio: {
    type: TEXT,
  },
  imageUrl: {
    type: STRING,
    defaultValue: '/images/defaultProfile.png',
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

Member.addHook('beforeSave', async (member) => {
  if (member.changed('password')) {
    member.password = await bcrypt.hash(member.password, 5);
  }
});

Member.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET);
};

Member.authenticate = async function ({ email, password }) {
  const member = await Member.findOne({ where: { email } });
  if (!member) {
    const error = new Error('a user with that email does not exist');
    error.status = 401;
    throw error;
  }
  console.log(await bcrypt.compare(password, member.password));
  if (member && (await bcrypt.compare(password, member.password))) {
    return member.generateToken();
  }
  const error = Error('invalid login credentials');
  error.status = 401;
  throw error;
};

Member.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
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
    const error = Error('invalid credentials');
    error.status = 401;
    throw error;
  }
};

module.exports = { Member };
