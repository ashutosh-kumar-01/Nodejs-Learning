//import model
const Post = require("../models/postModels");
const Comment = require("../models/commentModels");

// business logic
exports.createComment = async (req, res) => {
  try {

    const { post, user, body } = req.body;

    // create comment object
    const comment = new Comment({
      post,
      user,
      body,
    });

    // save comment
    const savedComment = await comment.save();

    // update post with comment
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { returnDocument: "after" }
    ).populate("comments");

    res.json({
      post: updatedPost,
    });

  } catch (error) {
    console.log(error); // helpful for debugging
    return res.status(500).json({
      error: "Error while creating comment",
    });
  }
};