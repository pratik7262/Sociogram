import Post from "../models/Post.js";
// import User from "../models/User";

export const createPost = async (req, res) => {
  try {
    const { userId, description, postImg } = req.body;
    const newPost = new Post({
      user: userId,
      description,
      postImg,
      likes: {},
    });

    await newPost.save();
    const posts = await Post.find().populate(
      "user",
      "firstName lastName image location"
    );
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getFeedPost = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "user",
      "firstName lastName image location"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).populate(
      "user",
      "firstName lastName image location"
    );

    res.status(200).json(posts);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    ).populate("user", "firstName lastName image location");

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const deletePostCollection = async (req, res) => {
  const post = await Post.collection.drop();
  res.json({ post, message: "Collection droped" });
};
