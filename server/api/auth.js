const router = require('express').Router();
const { Member } = require('../db/seed/seed');

router.post('/login', async (req, res, next) => {
  try {
    console.log(
      await Member.authenticate(req.body),
      'member.authenticate req.body result'
    );
    res.cookie('token', await Member.authenticate(req.body), {
      httpOnly: true,
      secure: false,
    });
    res.send();
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  console.log('in register route on backend');
  try {
    const { email, password, firstName, lastName } = req.body;
    //check if member already exists
    let member = await Member.findOne({ where: { email } });
    //if member exists, throw error saying so
    if (member) {
      const error = new Error('a member with that email already exists');
      error.status = 401;
      throw error;
    }
    //else create new member and generate JWT
    member = await Member.create({ email, password, firstName, lastName });
    const token = await member.generateToken();
    //set httpOnly cookie in response
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production' ? true : false,
      secure: false,
    });
    res.send();
  } catch (err) {
    next(err);
  }
});

//GET api/auth/member
router.get('/member', async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      console.log('there is a token here');
      //send back the member associated with that token
      res.send(await Member.findByToken(token));
    } else {
      console.log('there is no token');
      //if no token -- res.redirect to auth?  try this first
      res.status(200).send({});
    }
  } catch (err) {
    next(err);
  }
});

router.post('/logout', async (req, res, next) => {
  res.clearCookie('token');
  res.status(204).send();
});

module.exports = router;
