if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport'); // Assuming passport configuration is in config/passport.js
const connectDB = require('./config/db'); // Assuming database connection configuration is in config/db.js
const sessionOptions = require('./config/session'); // Assuming session configuration is in config/session.js

// Middleware functions
const { errorHandler } = require('./middlewares/index');
// Routes
const routes = require('./routes/index');
const { env } = require('process');

// Set up view engine and middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.engine("ejs", ejsMate);

// Connect to database
connectDB();

// Configure sessions and flash messages
app.use(session(sessionOptions));
app.use(flash());

// Initialize and use Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Set locals for views
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; // Assuming passport sets req.user for authenticated users
    next();
});
app.use(errorHandler);

// Use middleware functions
app.use('/', routes); // Adjust the route prefix as per your routes configuration

// Error handling middleware

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`);
});