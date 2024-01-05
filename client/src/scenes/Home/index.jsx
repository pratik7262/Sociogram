import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import AdvertWidget from "../Widgets/AdvertWidget";
import FriendListWidget from "../Widgets/FriendsListWidget";
import MyPostWidget from "../Widgets/MyPostWidget";
import PostsWidget from "../Widgets/PostsWidget";
import UserWidget from "../Widgets/UserWidget";

const Home = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const { _id, image } = useSelector((state) => state.user);
  return (
    <div>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget img={image} userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mb={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget img={image} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Home;
