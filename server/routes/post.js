import express from "express";
import {
  createPost,
  getFeedPost,
  getUserPosts,
  likePost,
  deletePostCollection,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/getfeedposts", getFeedPost);
router.get("/getuserposts/:userId", getUserPosts);

router.patch("/like/:id", verifyToken, likePost);

router.get("/dropcollection", deletePostCollection);
export default router;
