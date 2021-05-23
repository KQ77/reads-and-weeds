//write a function that checks for req.cookies.token -- if there, validate user by token

//if not able to validate - throw error - set error on front end in state
const { Member } = require('./db/seed/seed');

// const isLoggedIn = async (req, res, next) => {
//   try {
//     if (req.cookies.token) {
//       const member = await Member.findByToken(req.cookies.token);
//       if (member) return next();
//     }
//     //if there is not a token...
//     else {
//       const error = new Error('Not authorized. Please log in to continue');
//       error.status = 401;
//       throw error;
//     }
//   } catch (err) {
//     next(err);
//   }
// };
const isLoggedIn = async (req, res, next) => {
  try {
    if (req.member) {
      return next();
    }
    const error = new Error('Not authorized');
    error.status = 401;
    res.clearCookie('token');
    throw error;
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn };
