import { Outlet } from "react-router-dom";
import { Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { useState } from "react";
import sizeConfigs from "../../configs/sizeConfigs";
import colorConfigs from "../../configs/colorConfigs";

const MainLayout = () => {
  const [flag, setflag] = useState(true);

  let sidebar = sizeConfigs.sidebarfull.width;
  if (flag) {
    sidebar = sizeConfigs.sidebarhalf.width;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar setflag={setflag} flag={flag} />
      <Box
        component="nav"
        sx={{
          flexShrink: 0,
          width: sidebar,
        }}
      >
        <Sidebar flag={flag} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,

          // minHeight: "100vh",
          width:`calc(100% - ${sidebar})`,
          transition: "linear",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;