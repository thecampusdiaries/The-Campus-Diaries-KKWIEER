const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync.js');

const { authMiddleware, postMiddleware, userMiddleware } = require('../middlewares/index.js')
const postController = require('../controllers/post.js')

const multer = require('multer')
const { storage } = require('../cloudeConfig.js')
const upload = multer({ storage })

router.post('/',
    authMiddleware.isLoggedIn,
    authMiddleware.isApproved,
    upload.single('post[image]'),
    wrapAsync(postController.createPost)
);

router.get('/new',
    authMiddleware.isLoggedIn, // Middleware to check if user is logged in,
    authMiddleware.isApproved,
    wrapAsync(postController.renderPostForm) // Async wrapper for rendering post form
);

router
    .route("/:id")
    .get(wrapAsync(
        postController.showPost)
    )
    .put(
        authMiddleware.isLoggedIn,
        userMiddleware.isOwner,
        upload.single('post[image]'),
        wrapAsync(postController.updatePost)
    )
    .delete(
        authMiddleware.isLoggedIn,
        userMiddleware.isOwner,
        wrapAsync(postController.deletePost)
    );

router.get('/:id/edit',
    authMiddleware.isLoggedIn,
    userMiddleware.isOwner,
    postController.renderEditForm
);

router.post('/:id/like',
    authMiddleware.isLoggedIn,
    wrapAsync(postController.likePost)
);

module.exports = router;

/*
    * POST      /           : Creates a new post with image upload.

    * GET       /new        : Renders a form to create a new post.

    * GET       /:id        : Retrieves details of a specific post.
    * PUT       /:id        : Updates details of a specific post.
    * DELETE    /:id        : Deletes a specific post.
    
    * GET       /:id/edit   : Renders a form to edit a specific post.

    * POST      /:id/like   : Likes a specific post.
*/
