import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const getPosts = async () => {
    const response = await fetch(
      "https://socialmedia-backend-ed31.onrender.com/post/getfeedposts",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
  };

  const getUsersPosts = async () => {
    const response = await fetch(
      `https://socialmedia-backend-ed31.onrender.com/getuserposts/${userId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUsersPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {posts.map((post) => {
        return <PostWidget key={post._id} post={post} />;
      })}
    </>
  );
};

export default PostsWidget;
