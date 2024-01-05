import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

const Friend = ({ friendId, name, subtitle, img }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id, friends } = useSelector((state) => state.user);
  console.log(friends);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = false; // friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `https://socialmedia-backend-ed31.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Autharization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage img={img} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            fontWeight="500"
            sx={{
              "& hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography fontSize="0.75rem" color={medium}>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        // onClick={patchFriend}
        sx={{ p: "0.6rem", backgroundColor: primaryLight }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ backgroundColor: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ backgroundColor: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
