import { Box, Link, ListItemButton, Toolbar, Typography } from "@mui/material";
import actions from "../../state/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.currentUser);

  return (
    <Toolbar
      sx={{
        mr: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: {
              xs: 12,
              sm: 14,
              md: 16,
              lg: 16,
              xl: 16,
            },
          }}
        >
          {user?.email}
        </Typography>
      </Box>
      <Box ml={2}>
        <ListItemButton
          sx={{
            borderRadius: 1,
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: {
              xs: 12,
              sm: 14,
              md: 16,
              lg: 16,
              xl: 16,
            },
            color: "white",
            fontWeight: "300",
            textDecoration: "underline",
            "&:hover": {
              fontWeight: "500",
            },
          }}
          onClick={() => {
            navigate("/");
            dispatch(actions.logOut());
          }}
        >
          LOGOUT
        </ListItemButton>
      </Box>
      <Box ml={2}>
        <ListItemButton
          sx={{
            borderRadius: 1,
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: {
              xs: 12,
              sm: 14,
              md: 16,
              lg: 16,
              xl: 16,
            },
            color: "black",
            fontWeight: "300",
            backgroundColor: "white",
            "&:hover": {
              fontWeight: "500",
              color: "white",
              border: "1px solid #000",
            },
          }}
        >
          <Link
            href="https://play.google.com/store/apps/details?id=com.com.sb.pms&hl=en&gl=US"
            underline="none"
            target="_blank"
          >
            app
          </Link>
        </ListItemButton>
      </Box>
    </Toolbar>
  );
};

export default Topbar;
