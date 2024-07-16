const ExpressError = require('../utils/ExpressError');
const { postSchema } = require('../schema');

// Middleware to validate incoming listing data
module.exports.validatePost = (req, res, next) => {
    let { error } = postSchema.validate(req.body);                   // Validate req.body against listingSchema
    if (error) {
      let errMsg = error.details.map(el => el.message).join(',');     // Format error messages
      throw new ExpressError(400, errMsg);                            // Throw an error if validation fails
    } else {
      return next();                                                  // Proceed to the next middleware if validation passes
    }
  };