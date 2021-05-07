const router = require('express').Router();
const { Member } = require('../db/seed/seed');
// const express = require('express');
// router.use(express.json());

router.post('/login', async (req, res, next) => {
  try {
    res.cookie('JWT', await Member.authenticate(req.body), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    res.send();
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if member already exists
    let member = await Member.findOne({ where: { email } });
    //if member exists, throw error saying so
    if (member) {
      const error = new Error('member with that email already exists');
      error.status = 401;
      throw error;
    }
    //else create new member and generate JWT
    member = await Member.create({ email, password });
    const token = await member.generateToken();
    //set httponly cookie in response
    res.cookie('JWT', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    res.send();
  } catch (err) {
    next(err);
  }
});

router.get('/member', async (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    console.log(token, 'token');
    //send back the member associated with that token
    res.send(await Member.findByToken(token));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
