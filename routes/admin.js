const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

const { authMiddleware } = require('../middlewares/index.js')

const adminController = require('../controllers/admin.js')

router.get('/approvals',
    authMiddleware.isLoggedIn,
    authMiddleware.isAdmin,
    wrapAsync(adminController.getApprovals)
)

router.post("/approve-club",
    authMiddleware.isLoggedIn,
    authMiddleware.isAdmin,
    wrapAsync(adminController.approve)
);

router.post('/approve-all',
    authMiddleware.isLoggedIn,
    authMiddleware.isAdmin,
    wrapAsync(adminController.approveAll)
)

module.exports = router;