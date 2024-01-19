import {
  Container,
  Typography,
  TextField,
  Grid,
  Link,
  Box,
  Avatar,
  Stack,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { PASSWORD_MIN_LENGTH } from "../../../utils/config";
import { SignInData } from "../../../../typings/formData";

import { useDispatch } from "react-redux";
import actions from "../../../state/actions";
import LoadingButton from "@mui/lab/LoadingButton";
import { NavLink } from "react-router-dom";
import api from "../../../api";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../../../utils/rxjs.utils";
import assets from "../../../assets";
import colorConfigs from "../../../configs/colorConfigs";

const Login = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    bpNumber: Yup.string().required("bpNumber is Required"),
    password: Yup.string()
      .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
      .required("Password is required"),
  });

  const initialValues: SignInData = {
    bpNumber: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      api.auth
        .signInRequest$(values)
        .pipe(
          doOnSubscribe(() => setLoading(true)),
          finalize(() => setLoading(false))
        )
        .subscribe({
          next: async (user) => {
            formik.resetForm();
            dispatch(actions.user.saveUser(user));
            seterror("");
            setLoading(false);
          },
          error: (error: any) => {
            // console.log(error.response.data.detail)
            seterror(error?.response?.data?.detail);
            setLoading(false);
          },
        });
    },
  });
  // console.log(formik.values)
  return (
    <>
      <Grid container>
        <Grid
          xs={3}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box>
            <Avatar
              src={assets.images.logo}
              sx={{
                height: {
                  xs: 40,
                  sm: 60,
                  md: 80,
                  lg: 100,
                  xl: 120,
                },
                width: {
                  xs: 40,
                  sm: 60,
                  md: 80,
                  lg: 100,
                  xl: 120,
                },
              }}
            />
          </Box>
        </Grid>
        <Grid
          xs={9}
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Stack spacing={2} direction="column">
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: colorConfigs.sidebar.bg,
                letterSpacing: 3,
                fontWeight: "700",
                fontSize: {
                  xs: 14,
                  sm: 18,
                  md: 30,
                  lg: 40,
                  xl: 40,
                },
                fontFamily: ["Roboto", "sans-serif"].join(","),
              }}
            >
              Patient ManageMent System
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container marginTop={5}>
        <Grid
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box>
            <Avatar
              src={assets.images.banner}
              sx={{
                height: {
                  xs: 120,
                  sm: 160,
                  md: 220,
                  lg: 260,
                  xl: 340,
                },
                width: {
                  xs: 300,
                  sm: 320,
                  md: 340,
                  lg: 500,
                  xl: 550,
                },
              }}
              variant="square"
            />
          </Box>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: {
              xs: 2,
            },
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Toolbar sx={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: colorConfigs.sidebar.bg,
                    letterSpacing: 2,
                    fontSize: {
                      xs: 14,
                      sm: 20,
                      md: 24,
                      lg: 28,
                      xl: 35,
                    },
                    fontWeight: "500",
                    fontFamily: ["Roboto", "sans-serif"].join(","),
                  }}
                >
                  SignIn with BP Number
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#1976d2",
                    width: "30px",
                    height: "15px",
                    marginLeft: "20px",
                    borderRadius: "3px",
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: "#1976d2",
                    width: "30px",
                    height: "15px",
                    marginInline: 1,
                    borderRadius: "3px",
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: "#1976d2",
                    width: "30px",
                    height: "15px",
                    borderRadius: "3px",
                  }}
                />
              </Box>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "red",
                  fontSize: 12,
                  fontFamily: ["Raleway", "sans-serif"].join(","),
                }}
              >
                {error}
              </Typography>
            </Toolbar>
            <Toolbar>
              <TextField
                fullWidth
                id="bpNumber"
                name="bpNumber"
                label="Enter a valid BP"
                type="text"
                value={formik.values.bpNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.bpNumber && Boolean(formik.errors.bpNumber)
                }
                helperText={formik.touched.bpNumber && formik.errors.bpNumber}
                autoComplete="off"
              />
            </Toolbar>
            <Toolbar sx={{ marginTop: 2 }}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Enter Password"
                type="password"
                className=""
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="off"
              />
            </Toolbar>
            <Toolbar>
              <LoadingButton
                loading={loading}
                // loadingPosition="start"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                SUMBIT
              </LoadingButton>
            </Toolbar>
            <Toolbar>
              <Link variant="body2">{"New to PMS? "}</Link>

              <Link href="#" variant="body2" sx={{ marginLeft: 2 }}>
                <NavLink to={"/register"}>Sign Up</NavLink>
              </Link>
            </Toolbar>
          </form>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "blue",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          marginTop: 10,
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={6}>
              <Typography
                color="black"
                variant="h5"
                sx={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: ["Raleway", "sans-serif"].join(","),
                }}
                paragraph
              >
                Copyright © {`${new Date().getFullYear()}`}. All rights reserved
                Special Branch, Bangladesh Police.
              </Typography>
            </Grid>
            <Grid item xs={6} alignItems={"center"}>
              <Typography
                color="white"
                variant="subtitle1"
                sx={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: ["Roboto", "sans-serif"].join(","),
                }}
              >
                Developed By-
              </Typography>
              <Box sx={{paddingLeft:2}}>
                <Typography
                  color="white"
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontSize: 10,
                    fontFamily: ["Roboto", "sans-serif"].join(","),
                  }}
                >
                  Programmer, Md. Liaz Mahmud
                </Typography>
                <Typography
                  color="white"
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontSize: 10,
                    fontFamily: ["Roboto", "sans-serif"].join(","),
                  }}
                >
                   Programmer, Md. Akash
                </Typography>
                <Typography
                  color="white"
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontSize: 10,
                    fontFamily: ["Roboto", "sans-serif"].join(","),
                  }}
                >
                  AME, Md. Faridul Islam
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Login;
