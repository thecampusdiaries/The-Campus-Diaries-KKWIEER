const passport = require('passport');
const User = require('../models/user'); // Adjust the path as necessary

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/users/login', failureFlash: true }, async (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/users/login'); }

    req.logIn(user, async (err) => {
      if (err) { return next(err); }
      console.log(user)
      // Check if the user is new by verifying if the profile is incomplete
      const isNewUser = user.profile.bio === null || !user.profile.profileImage || !user.profile.profileImage.url;

      if (isNewUser) {
        req.flash('success', `@${user.username}, successfully signed up with Google`);
        req.session.save(() => {
          return res.render('user/editUserProfile.ejs', { user, fromSignUp: true, imgUrl: user.profile.profileImage.url });
        });
      } else {
        req.flash('success', `Welcome back, ${user.username}`);
        req.session.save(() => {
          return res.redirect('/explore');
        });
      }
    });
  })(req, res, next);
};
