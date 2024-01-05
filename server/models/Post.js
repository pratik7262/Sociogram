import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: String,
    postImg: { type: String, default: null },
    likes: { type: Map, of: Boolean },
    comment: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
