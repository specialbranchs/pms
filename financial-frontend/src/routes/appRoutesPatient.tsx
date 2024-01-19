import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { RouteType } from './config';
import DashboardIndex from '../modules/pages/dashboard/DashboardIndex';


import HomeboardPageLayout from '../modules/pages/dashboard/HomeboardPageLayout';
import PatientHomeScreen from '../modules/pages/patient';

const appRoutesPatients: RouteType[] = [
 
  {
    path: "/",
    element: <PatientHomeScreen />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    }
  },

];

export default appRoutesPatients;