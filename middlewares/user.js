const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params
    let post = await Post.findById(id)

    if (!post.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this post")
        return res.redirect(`/explore/${id}`)
    }
    return next()
}

module.exports.isAuthor = async (req, res, next) => {
    let { id, commentId } = req.params
    let comment = await Comment.findById(commentId)

    if (!comment.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this comment")
        return res.redirect(`/explore/${id}`)
    }
    return next()
}