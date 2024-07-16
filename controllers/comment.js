const Post = require('../models/post.js')
const Comment = require('../models/comment.js');

module.exports.writeComment = async (req, res) => {
    let post = await Post.findById(req.params.id);
    let newComment = new Comment(req.body.comment);
    newComment.author = req.user._id
    post.comments.push(newComment);
    await newComment.save();
    await post.save();
    req.flash("success", "Comment Added Successfully !!")
    res.redirect(`/posts/${req.params.id}`)
}

module.exports.deleteComment = async (req, res) => {
    let { id, commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    await Post.findByIdAndUpdate(id, {
        $pull: {
            comments: commentId
        }
    });
    req.flash("success", "Comment Deleted Successfully !!")
    res.redirect(`/posts/${id}`);
}

module.exports.likeComment = async (req, res) => {

    let post = await Post.findById(req.params.id);

    const { commentId } = req.params;
    const reqComment = await Comment.findById(commentId);

    const userId = req.user._id;    // like karel to user

    if (!reqComment) {
        req.flash('error', 'Cannot find that comment!');
        return res.redirect(`/posts/${req.params.id}`);
    }

    const likedIndex = reqComment.likedBy.indexOf(userId);

    if (likedIndex === -1) {    // If user has not liked the post yet, like it
        reqComment.likes += 1;
        reqComment.likedBy.push(userId);
    } else {    // If user has already liked the post, unlike it
        reqComment.likes -= 1;
        reqComment.likedBy.splice(likedIndex, 1);
    }
    await reqComment.save();

    await post.save();
    res.redirect(`/posts/${req.params.id}`);
}

module.exports.replyToComment = async (req, res) => {
    const { id, commentId } = req.params
    const parentComment = await Comment.findById(commentId)
    const newReply = new Comment(req.body.comment)
    newReply.author = req.user._id

    await newReply.save()

    parentComment.replies.push(newReply._id)
    await parentComment.save()

    req.flash('success', 'Reply added successfully.')
    res.redirect(`/posts/${id}`)

}