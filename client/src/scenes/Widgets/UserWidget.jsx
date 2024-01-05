import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";
import UserImage from "../../components/UserImage";
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const UserWidget = ({ userId, img }) => {
  // const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // const getUser = async () => {
  //   const response = await fetch(`https://socialmedia-backend-ed31.onrender.com/users/${userId}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: token,
  //     },
  //   });

  //   const data = await response.json();
  //   setUser(data);
  //   console.log("1");
  // };

  // useEffect(() => {
  //   getUser();
  //   // eslint-disable-next-line
  // }, []);

  if (!user) {
    return;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <>
      <WidgetWrapper>
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          // onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage img={img} />
            <Box>
              <Typography
                variant="h4"
                fontWeight="500"
                color={dark}
                sx={{
                  "&: hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>

        <Divider />

        <Box padding="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>

        <Divider />

        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={main}>Who Viewed Your Profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween mb="0.5rem">
            <Typography color={main}>Impression On Your Post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>

        <Divider />

        <Box padding="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight={500} mb="1rem">
            Social Network
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight={500}>
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img src="../assets/linkedin.png" alt="linkedin" />
              <Box>
                <Typography color={main} fontWeight={500}>
                  LinkedIn
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    </>
  );
};

export default UserWidget;
