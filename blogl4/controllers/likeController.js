// import models
const Post = require("../models/postModels");
const Like = require("../models/likeModels");

// like a post
exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;

        const like = new Like({
            post,
            user,
        });
        const savedLike = await like.save();

        // update the post collection basis of this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {returnDocument: "after" }).populate("likes").exec();

        res.json({
            post: updatedPost,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error while liking post",
        });
    }
};


// unlike a post
exports.unlikePost = async (req, res) =>{
    try {
        const { post, like } = req.body;
        // find and delete the like collection me se
        const deletedLike = await Like.findByIdAndDelete({post: post, _id: like});

        // update the post collection basis of this
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {returnDocument: "after" });

        res.json({
            post: updatedPost,
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error while unliking post",
        });
    }
}

exports.dummyLink = (req, res) => {
    res.send("This is a dummy link for testing the like controller");
};