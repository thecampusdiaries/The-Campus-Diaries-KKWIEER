const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

const { userMiddleware, commentMiddleware, authMiddleware } = require('../middlewares/index.js')

const commentController = require('../controllers/comment.js')

// Post Review Route: Add new review to the database
router.post("/",
    authMiddleware.isLoggedIn,
    commentMiddleware.validateComment,
    wrapAsync(commentController.writeComment)
);

// Delete Review Route
router.delete("/:commentId",
    authMiddleware.isLoggedIn,
    userMiddleware.isAuthor,
    wrapAsync(commentController.deleteComment)
);

router.post("/:commentId/like",
    authMiddleware.isLoggedIn,
    wrapAsync(commentController.likeComment)
)

router.post('/:commentId/reply',
    authMiddleware.isLoggedIn,
    wrapAsync(commentController.replyToComment)
)

module.exports = router;