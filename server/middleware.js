//write a function that checks for req.cookies.token -- if there, validate user by token

//if not able to validate - throw error - set error on front end in state
const { Member, Club } = require('./db/seed/seed');

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
  //need a component with both login/sign up if u click a link it switches what it shows -- then
};
//if a club is private, checks to see if requesting member is a member of that club
const hasAccess = async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.clubId, { include: [Member] });
    if (club.private) {
      if (club.members.find((member) => member.id === req.member.id)) {
        return next();
      } else {
        const error = new Error(
          `Unauthorized. Must be a member of this club to perform this action`
        );
        error.status = 401;
        throw error;
      }
    }
    return next();
  } catch (err) {
    next(err);
  }
};
//checks to see that req.user.role is 'admin'
const isAdmin = async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.clubId || req.body.clubId);
    if (club.adminId === req.member.id) {
      return next();
    } else {
      const error = new Error(
        'Unauthorized. Must be group administrator to perform this action'
      );
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, hasAccess, isAdmin };
