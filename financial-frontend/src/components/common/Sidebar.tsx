import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import appRoutes from "../../routes/appRoutes";
import { AccessUser } from "../../utils/directUser";
import appRoutesPatients from "../../routes/appRoutesPatient";

const Sidebar = () => {
  const user = AccessUser()
 
  return (
   
      <List disablePadding>
       
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
  
  );
};

export default Sidebar;