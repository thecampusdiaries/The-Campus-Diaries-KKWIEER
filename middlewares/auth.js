const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");

// Auth
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl
    req.flash('error', `Please log in to perform the action.`);
    return res.redirect('/users/login');
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl
  }
  return next()
}

module.exports.isApproved = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role == 'organizer' && !user.isProfileComplete) {
    req.flash('error', `Sorry @${user.username}, You can't post yet.`);
    return res.render('admin/awaitApproval.ejs', { user: user , username: user.username});
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if(req.user.email === 'thecampusdiariesofficial@gmail.com') {
    return next();
  }
  throw new ExpressError(403, 'Access denied')
}