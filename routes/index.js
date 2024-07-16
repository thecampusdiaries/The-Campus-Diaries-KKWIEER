const express = require('express');
const router = express.Router();

const ExpressError = require('../utils/ExpressError')

const adminRouter = require('./admin.js');
const postsRouter = require('./post');
const commentsRouter = require('./comment');
const usersRouter = require('./user');
const googleAuthRouter = require('./googleAuth');
const eventRouter = require('./event.js');

const wrapAsync = require('../utils/wrapAsync.js');

const logger = require('../middlewares/logger.js')

router.use(logger.logPath)

router.use('/admin', adminRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/events', eventRouter)
router.use('/posts/:id/comments', commentsRouter);
router.use('/', googleAuthRouter);

router.get('/', (req, res) => {
    res.redirect('/explore');
});

const Event = require('../models/event.js')
router.get('/explore', wrapAsync(
    async (req, res) => {
        const events = await Event.find()
            .populate({
                path: 'posts',
                populate: {
                    path: 'owner',
                    select: 'username' // Select only the username of the owner
                }
            })
            .populate('organizer', 'username') // Select only the username of the organizer
            .exec();

        res.render('index', { events });
    }
))

router.all("*", (req, res, next) => {
    console.error(`Page not found: ${req.originalUrl}`);
    next(new ExpressError(404, "This page does not exist."));
});

module.exports = router;