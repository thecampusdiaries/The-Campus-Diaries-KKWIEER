const { required } = require("joi");
const Comment = require("./comment.js")
const User = require("./user.js")

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        // required: true
    },
    image: {
        url: String,
        filename: String
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }

});

postSchema.post("findOneAndDelete", async (post) => {
    if (post)
        await Comment.deleteMany({ _id: { $in: post.comments } })
})
const Post = mongoose.model("Post", postSchema);

module.exports = Post;