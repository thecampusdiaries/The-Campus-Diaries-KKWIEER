const express = require('express');
const router = express.Router();

const passport = require('passport')

const googleAuthRouter = require('../controllers/googleAuth.js')

// Route to initiate OAuth with Google
router.get('/auth/google', googleAuthRouter.googleAuth);

// Google OAuth callback route
router.get('/auth/google/callback', googleAuthRouter.googleAuthCallback);

module.exports = router;
