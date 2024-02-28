import { Button, Grid, Link } from "@mui/material";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { status } from "../../../utils/status";

import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/reducer";
import { doOnSubscribe } from "../../../utils/rxjs.utils";
import { finalize } from "rxjs/operators";
import { tConvert } from "../../../utils/timeConvert";
import AppModal from "./AppModal";
import { fontFamily } from "../appointment/appointmentList";

const PatientHomeScreen = () => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [app, setapp] = useState<any>(null);
  const [count, setcount] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    singleAppointMent();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      singleAppointMent();
      CountApporvedAppointMent();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const singleAppointMent = () => {
    if (!user?.id) return;
    const date = new Date().toISOString().slice(0, 10);
    api.report
      .getSingleAppointment$(user?.id, date)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          // console.log('getrowrow', res)
          setapp(res.data);
        },
        error: (error: any) => {
          // console.log(error)
          setLoading(false);
        },
      });
  };

  const CountApporvedAppointMent = () => {
    const date = new Date().toISOString().slice(0, 10);
    api.report
      .CountInQueue(1, date)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          // console.log('count', res)
          setcount(res.count);
        },
        error: (error: any) => {
          // console.log(error)
          setLoading(false);
        },
      });
  };

  return (
    <>
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 5,
            backgroundColor: "#e0f7ed",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h5"
                sx={{
                  ...fontFamily,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontSize: {
                    xs: 12,
                    sm: 14,
                    md: 18,
                    lg: 18,
                    xl: 18,
                  },
                }}
              >
                Welcome to Patient Management System
              </Typography>
              <Typography
                sx={{
                  ...fontFamily,
                  letterSpacing: 1,
                  fontSize: {
                    xs: 10,
                    sm: 12,
                    md: 14,
                    lg: 18,
                    xl: 20,
                  },
                }}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {app
                  ? "Please be patience.. we will look"
                  : "Please, Confirm your appointment.."}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 1 }}>
              {!app ? (
                <Button
                  sx={{ ...fontFamily, fontSize: 12 }}
                  variant="contained"
                  color="success"
                  onClick={() => handleClickOpen()}
                >
                  New Appointment
                </Button>
              ) : (
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ ...fontFamily, fontSize: 12 }}
                    component="div"
                  >
                    Reason : {app.reason}
                  </Typography>
                  {app?.note && (
                    <Typography
                      variant="subtitle1"
                      sx={{ ...fontFamily, fontSize: 12 }}
                      component="div"
                    >
                      Feedback : {app.note}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 1 }}>
              <Button
                sx={{ ...fontFamily, fontSize: 12,backgroundColor:"white" }}
                variant="contained"
               
              >
                <Link
                  href="https://play.google.com/store/apps/details?id=com.com.sb.pms&hl=en&gl=US"
                  underline="none"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  app
                </Link>
              </Button>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{
              width: 151,
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              },
            }}
            image={require("../../../assets/images/logo.png")}
            alt="Live from space album cover"
          />
        </Card>
      </Grid>
      <Grid item xs={12} marginTop={4} textAlign={"center"}>
        <Card
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
            justifyContent: "space-around",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                sx={{
                  ...fontFamily,
                  fontSize: {
                    xs: 16,
                    sm: 18,
                    md: 20,
                    lg: 22,
                    xl: 22,
                  },
                }}
                component="div"
                variant="h5"
              >
                Status
              </Typography>
              {app && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: status(app.status).color,
                    ...fontFamily,
                    fontSize: {
                      xs: 12,
                      sm: 16,
                      md: 18,
                      lg: 18,
                      xl: 18,
                    },
                  }}
                  color="text.secondary"
                  component="div"
                >
                  {status(app.status).statusTxt}
                </Typography>
              )}
            </CardContent>
          </Box>
          <Box sx={{ border: "1px solid #c3c3c3", height: 100 }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h5"
                sx={{
                  ...fontFamily,
                  fontSize: {
                    xs: 14,
                    sm: 16,
                    md: 18,
                    lg: 18,
                    xl: 18,
                  },
                }}
              >
                In Queue
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "green",
                  ...fontFamily,
                  fontSize: {
                    xs: 12,
                    sm: 16,
                    md: 18,
                    lg: 18,
                    xl: 18,
                  },
                  textAlign: "center",
                }}
                component="div"
              >
                {count} person's
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ border: "1px solid #c3c3c3", height: 100 }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              {app && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    backgroundColor: "#e0f7ed",
                    padding: 1,
                    ...fontFamily,

                    fontSize: {
                      xs: 14,
                      sm: 16,
                      md: 18,
                      lg: 18,
                      xl: 18,
                    },
                  }}
                  color="text.secondary"
                  component="div"
                >
                  Appointment time: {tConvert(app.appoint_time)}
                </Typography>
              )}
            </CardContent>
          </Box>
        </Card>
      </Grid>
      <AppModal
        open={open}
        user={user}
        handleClose={handleClose}
        setapp={setapp}
      />
    </>
  );
};

export default PatientHomeScreen;
