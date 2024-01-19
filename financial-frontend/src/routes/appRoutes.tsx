import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { RouteType } from './config';
import DashboardIndex from '../modules/pages/dashboard/DashboardIndex';


import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import HomeboardPageLayout from '../modules/pages/dashboard/HomeboardPageLayout';
import AdminScreen from '../modules/pages/admin';

const appRoutes: RouteType[] = [
  {
    path: "/",
    element: <DashboardIndex />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    }
  },
 {
    path: "/admin",
    element: <AdminScreen />,
    state: "admin",
    sidebarProps: {
      displayText: "Admin",
      icon: <SupervisorAccountOutlinedIcon />
    }
    
  }
];

export default appRoutes;