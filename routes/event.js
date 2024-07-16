const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const { authMiddleware } = require('../middlewares/index.js')

const eventController = require('../controllers/event.js')

router.post("/",
    authMiddleware.isLoggedIn,
    authMiddleware.isApproved,
    wrapAsync(eventController.addEvent)
)

router.get('/new',
    authMiddleware.isLoggedIn,
    authMiddleware.isApproved,
    eventController.renderNewForm
)

router.get('/:eventId', eventController.showEvent);

module.exports = router;