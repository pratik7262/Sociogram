import {
  DeleteOutline,
  EditOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPosts } from "../../state";
import { convertBase64 } from "../../Utils/base64";

const MyPostWidget = ({ img }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [imgName, setImgName] = useState("");
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(undefined);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const addPost = async () => {
    const data = {
      userId: _id,
      description: post,
      postImg: image,
    };
    setLoading(true);
    const responce = await fetch(
      "https://socialmedia-backend-ed31.onrender.com/post/",
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const posts = await responce.json();
    setLoading(false);
    dispatch(setPosts({ posts: posts }));
    setIsImage(null);
    setPost("");
  };

  return (
    <>
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage img={img} />
          <InputBase
            placeholder="what's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box mt="1rem" border={`1px solid ${medium}`}>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={async (acceptedFiles) => {
                const file = acceptedFiles[0];
                setImgName(file.name);
                const base64 = await convertBase64(file);
                setImage(base64);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <>
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      bgcolor={`2px solid ${palette.primary.main}`}
                      p="1rem"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <>
                          <Typography>Add Image</Typography>
                        </>
                      ) : (
                        <>
                          <FlexBetween gap="3rem">
                            <Typography>{imgName}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        </>
                      )}
                    </Box>
                    {image && (
                      <IconButton
                        onClick={() => {
                          setImage(null);
                        }}
                        sx={{ width: "15%" }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    )}
                  </FlexBetween>
                </>
              )}
            </Dropzone>
          </Box>
        )}

        <Divider sx={{ margin: "1.25rem 0" }} />

        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            {loading && <CircularProgress size={24} />}
            <Button
              disabled={!post}
              onClick={addPost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              Post
            </Button>
          </Stack>
        </FlexBetween>
      </WidgetWrapper>
    </>
  );
};

export default MyPostWidget;
