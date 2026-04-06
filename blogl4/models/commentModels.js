// import mongoose
const mongoose = require("mongoose");

// route handler
const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // reference to Post model
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

// export the model
module.exports = mongoose.model("Comment", commentSchema);