const Joi = require("joi")

module.exports.postSchema = Joi.object({
	post: Joi.object({
		title: Joi.string().required(),
		caption: Joi.string().required(),
		image: Joi.string().allow("", null)
	}).required()
})

// FOlder 48 : Reviews validation
module.exports.commentSchema = Joi.object({
	comment: Joi.object({
		text: Joi.string().required(),
	}).required()
})