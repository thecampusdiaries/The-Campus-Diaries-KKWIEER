const MongoStore = require('connect-mongo');

const sessionOptions = {
    store: MongoStore.create({
        mongoUrl: process.env.ATLASDB_URL,
        crypto: {
            secret: process.env.SECRET
        },
        touchAfter: 24 * 60 * 60
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

module.exports = sessionOptions;
