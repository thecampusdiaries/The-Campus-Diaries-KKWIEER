const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const generateUniqueUsername = require('../utils/generateUniqueUsername');

passport.use(new LocalStrategy(User.authenticate()));

const callbackURL = process.env.NODE_ENV === 'production'
    ? "https://the-campus-diaries-kkwieer.onrender.com/auth/google/callback"
    : "http://localhost:8080/auth/google/callback";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                const baseUsername = profile.displayName.replace(/\s+/g, '').toLowerCase();
                const uniqueUsername = await generateUniqueUsername(baseUsername);

                user = new User({
                    googleId: profile.id,
                    username: uniqueUsername,
                    email: profile.emails[0].value,
                    profile: {
                        profileImage: {
                            url: profile.photos[0].value,
                            filename: uniqueUsername + '-googleimage'
                        }
                    }
                });
                await user.save();
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
