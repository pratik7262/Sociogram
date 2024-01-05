import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { setPost } from "../../state";
import WigetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import FlexBetween from "../../components/FlexBetween";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

const PostWidget = ({ post }) => {
  const [isComment] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(post.likes[loggedInUserId]);
  const likeCount = Object.keys(post.likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLikes = async () => {
    const response = await fetch(
      `https://socialmedia-backend-ed31.onrender.com/post/like/${post._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
        }),
      }
    );

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  console.log(post);

  return (
    <>
      <WigetWrapper m="2rem 0">
        <Friend
          friendId={post.user._id}
          name={`${post.user.firstName} ${post.user.lastName}`}
          subtitle={post.user.location}
          img={post.user.image}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {post.description}
        </Typography>
        {post.postImg && (
          <img
            width="100%"
            height="auto"
            alt="post"
            src={post.postImg}
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLikes}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
            {/* <FlexBetween gap="0.3rem">
              <IconButton
                onClick={() => {
                  setIsComment(!isComment);
                }}
              >
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{post.comment.length}</Typography>
            </FlexBetween> */}
          </FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComment && (
          <Box mt="0.5rem">
            {post.comments.map((comment) => {
              return (
                <Box key={`${post.user.firstName}-${post._id}`}>
                  <Divider />
                  <Typography
                    sx={{ color: main, margin: "0.5rem 0", pl: "1rem" }}
                  >
                    {comment}
                  </Typography>
                </Box>
              );
            })}
            <Divider />
          </Box>
        )}
      </WigetWrapper>
    </>
  );
};

export default PostWidget;
