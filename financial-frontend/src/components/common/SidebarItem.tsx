import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
//import { RootState } from "../../redux/store";
import { RouteType } from "../../routes/config";
import { RootState } from "../../state/reducer";
import { store } from "../../state";

type Props = {
  item: RouteType;
};

const SidebarItem = ({ item }: Props) => {
  const { appState } = useSelector((state: RootState) => state.currentappState);
 
  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          "&: hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg
          },
          backgroundColor: appState?.appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
          fontFamily:['Roboto Condensed', 'sans-serif'].join(","),
          color: appState?.appState === item.state ? colorConfigs.topbar.bg : "unset",
          transition: 'linear .5s',
          px: 2.5,
        }}
      >
        <ListItemIcon sx={{
          color: appState?.appState === item.state ? colorConfigs.topbar.bg : "unset",
          transition: 'linear .5s'
        }}>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;