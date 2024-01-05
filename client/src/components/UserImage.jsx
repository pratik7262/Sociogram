import { Box } from "@mui/material";
import React from "react";

const UserImage = ({ img, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        alt="user img"
        src={img}
        width={size}
        height={size}
        style={{ objectFit: "cover", borderRadius: "50%" }}
      />
    </Box>
  );
};

export default UserImage;
