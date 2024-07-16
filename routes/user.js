const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');

const passport = require('passport');
const multer = require('multer');
const { storage_profile } = require('../cloudeConfig.js');
const pic_upload = multer({ storage: storage_profile });

const wrapAsync = require('../utils/wrapAsync.js');

const { authMiddleware } = require('../middlewares/index.js')

router.route('/signup')
    .get(userController.getSignupForm)
    .post(wrapAsync(
        userController.signup
    ))

router.route('/login')
    .get(userController.getLoginForm)
    .post(
        authMiddleware.saveRedirectUrl,
        passport.authenticate('local', {
            failureRedirect: '/users/login',
            failureFlash: true
        }),
        userController.login
    );

router.get('/logout',
    authMiddleware.isLoggedIn,
    userController.logout
);

router.get('/:userId/profile',
    userController.showUser
);

router.route('/:userId/profile/edit')
    .get(
        authMiddleware.isLoggedIn,
        userController.renderEditProfileForm
    )
    .put(
        authMiddleware.isLoggedIn,
        pic_upload.single('post[image]'),
        wrapAsync(userController.editProfile)
    );

module.exports = router;

/*
    * GET   /signup:    Displaying the login form.
    * POST  /signup:    Handling sign-up form submission.
    
    * GET   /login:     Displaying the login form.
    * POST  /login:     Handling login form submission and authentication.

    * GET   /logout:    Logging out a logged-in user.
    
    * GET   /:userId/profile:       Displaying user profile based on userId.
    
    * GET   /:userId/profile/edit:  Displaying form to edit user profile.
    * PUT   /:userId/profile/edit:  Handling form submission to edit user profile.
*/
