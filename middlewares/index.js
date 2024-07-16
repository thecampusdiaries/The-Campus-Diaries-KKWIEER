// middlewares/index.js

const userMiddleware = require('./user');
const postMiddleware = require('./post');
const commentMiddleware = require('./comment');
const authMiddleware = require('./auth');
const errorHandler = require('./errorHandler')
const logger = require('./logger')

module.exports = {
  userMiddleware,
  postMiddleware,
  commentMiddleware,
  authMiddleware,
  errorHandler,
  logger
};
