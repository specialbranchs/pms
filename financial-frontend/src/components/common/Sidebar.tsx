import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import appRoutes from "../../routes/appRoutes";
import { AccessUser } from "../../utils/directUser";
import appRoutesPatients from "../../routes/appRoutesPatient";
type Props = {
  flag: boolean
}
const Sidebar = ({ flag }: Props) => {
  const user = AccessUser()
  let sidebar = sizeConfigs.sidebarfull.width
  if (flag) {
    sidebar = sizeConfigs.sidebarhalf.width
  }
  return (
    <Drawer
      variant="permanent"
      
      sx={{
        width: sidebar,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebar,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color, 
          transition:'linear .5s',
         
        }
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <Avatar src={assets.images.logo} />
          </Stack>
        </Toolbar>
        {
          user.is_superuser === false
            && user.is_adminuser === false &&
            user.is_staff === true ?
            appRoutesPatients.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  route.state == 'admin' && user.is_superuser ?
                    <SidebarItem item={route} key={index} />
                    : route.state !== 'admin' ?
                      <SidebarItem item={route} key={index} /> :
                      null

                )
              ) : null
            ))
            :
            appRoutes.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  route.state == 'admin' && user.is_superuser ?
                    <SidebarItem item={route} key={index} />
                    : route.state !== 'admin' ?
                      <SidebarItem item={route} key={index} /> :
                      null

                )
              ) : null
            ))

        }
      </List>
    </Drawer>
  );
};

export default Sidebar;