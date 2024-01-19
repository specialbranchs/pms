import { AppBar, Box, Link, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import { NavLink } from "react-router-dom";
import actions from "../../state/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import { boolean } from "yup";
type Props = {
  setflag: any,
  flag: boolean
}
const Topbar = ({ setflag, flag }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.currentUser)
  let sidebar = sizeConfigs.sidebarfull.width + 'px'
  if (flag) {
    sidebar = sizeConfigs.sidebarhalf.width + 'px'
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width:`calc(100% - ${sidebar})`,
        // width: {
        //   xs: '100%',
        //   sm: '100%',
        //   md: `calc(100% - ${sidebar})`,
        //   lg: `calc(100% - ${sidebar})`,
        //   xl:`calc(100% - ${sidebar})`


        // },
        // ml: sizeConfigs.sidebar.width,
        // boxShadow: "0px 1px 3px 2px #f1f1;",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        transition: 'linear .5s',


      }}
    >
      <Toolbar
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}

      >
        <Toolbar sx={{
          flexDirection: 'row',
          marginLeft: -5,
        }}>
          <ListItemButton
            sx={{
              borderRadius: 1,
              // backgroundColor: '#aa94d6',
              '&:hover': {
                // backgroundColor: '#aa94a6'
              }
            }}
            onClick={() => setflag(!flag)}>
            <DehazeOutlinedIcon
              sx={
                flag === true ? {
                  transform: 'rotate(90deg)',
                  transition: 'linear .5s',

                } :
                  {
                    transform: 'rotate(0deg)',
                    transition: 'linear .5s'
                  }
              }
            />
          </ListItemButton>
         <ListItemText
            disableTypography
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
                lg: 'block',
                xl: 'block'
    
              }
            }}
            primary={
              <Typography
                sx={{
                  borderRadius: 2,
                  paddingInline: 3,
                  fontFamily: ['Roboto', 'sans-serif'].join(","),
                  fontSize: 20,
                  color: '#aa94d6',
                  //  color: 'white',
                  fontWeight: '700'
                }}
              >
                Patient Management of SB
              </Typography>
            }
          />
        </Toolbar>

        <Toolbar
          sx={{
            mr: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box>
            <Typography sx={{
              fontFamily: ['Roboto', 'sans-serif'].join(","),
            }}>
              {user?.email}
            </Typography>
          </Box>
          <Box ml={2}>
            <ListItemButton
              sx={{
                borderRadius: 1,
                fontFamily: ['Roboto', 'sans-serif'].join(","),
                fontSize: 14,
                backgroundColor: '#aa94d6',
                color: 'white',
                fontWeight: '100',
                '&:hover': {
                  backgroundColor: '#aa94a6'
                }
              }}
              onClick={() => {
                navigate('/');
                dispatch(actions.logOut())

              }}>
              LOGOUT
            </ListItemButton>
          </Box>
        </Toolbar>


      </Toolbar>
    </AppBar>
  );
};

export default Topbar;