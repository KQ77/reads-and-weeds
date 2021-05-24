//write a function that checks for req.cookies.token -- if there, validate user by token

//if not able to validate - throw error - set error on front end in state
const { Member, Club } = require('./db/seed/seed');

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

const hasAccess = async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.clubId);
    if (club.private === false) {
      return next();
    }
    //if club is private, but the members of this club include member making request
    if (club.members.find((member) => member.id === req.member.id)) {
      return next();
    } else {
      const error = new Error(
        `Unauthorized. This club's information is available only to club members`
      );
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, hasAccess };
