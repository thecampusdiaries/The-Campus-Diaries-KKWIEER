const ExpressError = require('../utils/ExpressError');
const { commentSchema } = require('../schema');

// Middleware for validating review data using Joi
module.exports.validateComment = (req, res, next) => {
    let { error } = commentSchema.validate(req.body);                    // Joi schema validations
    if (error) {
      let errMsg = error.details.map(el => el.message).join(",");
      throw new ExpressError(400, errMsg);                            // Throw 400 error with Joi validation message
    } else {
      next(); 														// Proceed to the next middleware
    }
  };