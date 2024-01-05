import {
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import { EditOutlined } from "@mui/icons-material";
import * as yup from "yup";
import { setLogin } from "../../state";
import { convertBase64 } from "../../Utils/base64";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  image: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const registerInitialValues = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  location: "",
  occupation: "",
  image: "",
};

const loginInitialVaues = {
  email: "",
  password: "",
};

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [imgName, setImgName] = useState("");
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    setLoading(true);
    const responce = await fetch(
      "https://socialmedia-backend-ed31.onrender.com/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const json = await responce.json();
    onSubmitProps.resetForm();
    if (json.success) {
      toast.success("Registration Done Successfully");
      setPageType("login");
      setLoading(false);
    } else {
      toast.error(json.message);
      setLoading(false);
    }
  };

  const login = async (values, onSubmitProps) => {
    setLoading(true);
    const responce = await fetch(
      "https://socialmedia-backend-ed31.onrender.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const json = await responce.json();
    onSubmitProps.resetForm();
    if (json.success) {
      dispatch(setLogin({ user: json.user, token: json.token }));
      toast.success("Loged In Successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setLoading(false);
    } else {
      toast.error(json.message);
      setLoading(false);
    }
  };

  const handleOnSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <>
      <Formik
        onSubmit={handleOnSubmit}
        validationSchema={isLogin ? loginSchema : registerSchema}
        initialValues={isLogin ? loginInitialVaues : registerInitialValues}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <Grid spacing={2} container>
                {isRegister && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={
                          Boolean(touched.firstName) &&
                          Boolean(errors.firstName)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={
                          Boolean(touched.lastName) && Boolean(errors.lastName)
                        }
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        fullWidth
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={
                          Boolean(touched.location) && Boolean(errors.location)
                        }
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        fullWidth
                        label="Occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        error={
                          Boolean(touched.occupation) &&
                          Boolean(errors.occupation)
                        }
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Box
                        border={
                          !values.image
                            ? `2px solid ${palette.neutral.medium}`
                            : `2px solid ${palette.primary.main}`
                        }
                      >
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={async (acceptedFiles) => {
                            const file = acceptedFiles[0];
                            setImgName(file.name);
                            const base64 = await convertBase64(file);
                            setFieldValue("image", base64);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <>
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
                                {!values.image ? (
                                  <>
                                    <Typography>Add Image</Typography>
                                  </>
                                ) : (
                                  <>
                                    <FlexBetween>
                                      <Typography>{imgName}</Typography>
                                      <EditOutlined />
                                    </FlexBetween>
                                  </>
                                )}
                              </Box>
                            </>
                          )}
                        </Dropzone>
                      </Box>
                    </Grid>
                  </>
                )}
                <Grid xs={12} item>
                  <TextField
                    fullWidth
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                  />
                </Grid>
              </Grid>
              <Stack
                spacing={1}
                sx={{ alignItems: "center", justifyContent: "center", my: 1 }}
              >
                {loading && <CircularProgress size={24} />}
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    bgcolor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {isLogin ? "LOGIN" : "Register"}
                </Button>
                <Typography
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                  }}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Typography>
              </Stack>
            </form>
          </>
        )}
      </Formik>
      <ToastContainer autoClose={1500} pauseOnHover={false} theme="colored" />
    </>
  );
};

export default Form;
