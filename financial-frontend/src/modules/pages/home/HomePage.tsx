import { Button, Stack, Typography } from '@mui/material';
import { Avatar, Box, Grid, Toolbar } from '@mui/material';
import React from 'react';
import assets from '../../../assets';
import colorConfigs from '../../../configs/colorConfigs';
import { useNavigate } from 'react-router-dom';

type Props = {};

const HomePage = (props: Props) => {
  const navigate = useNavigate()
  return (

    <Grid container>
      <Grid xs={4} sx={{

        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}>
        <Box>
          <Avatar src={assets.images.logo} sx={{ height: 200, width: 200 }} />
        </Box>
      </Grid>
      <Grid xs={8}
        sx={{
          height: '90vh',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Stack spacing={2} direction="column">
          <Typography variant="h4" gutterBottom sx={{
            color: colorConfigs.sidebar.bg,
            letterSpacing: 5,
            fontFamily: ['Raleway', 'sans-serif'].join(",")
          }}>
            SPECIAL BRANCH
          </Typography>
          <Typography sx={{
            color: colorConfigs.sidebar.bg,
            fontFamily: ['Raleway', 'sans-serif'].join(",")
          }}>
            The Special Branch is the prime intelligence agency of Bangladesh Police, being an important agency in the Bangladeshi intelligence community.
          </Typography>
          <Box>
            <Button onClick={() => navigate('/dashboard')} variant="outlined" sx={{ fontFamily: ['Raleway', 'sans-serif'].join(","), color: colorConfigs.sidebar.bg, }}>GET STARTED</Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>

  );
};

export default HomePage;