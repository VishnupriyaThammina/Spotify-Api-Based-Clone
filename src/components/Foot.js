import React from 'react';
import { Grid, Typography, Link } from '@mui/material';

const Foot = () => {
  return (
    <Grid container justifyContent="center" alignItems="flex-start" style={{ paddingTop:"4vh",backgroundColor: 'hsla(0, 0%, 2%, 0.847)', height:"25vh", marginTop: 'auto' ,color:"gray"}}>
      <Grid item container direction="column" alignItems="center">
        <Typography variant="body1" gutterBottom>
          Spotify Clone Website
        </Typography>
        <Typography variant="body2" gutterBottom>
        @ Vish {new Date().getFullYear()} 
        </Typography>
        <Typography variant="body2" gutterBottom>
          Made with love for music
        </Typography>
        <Grid item container spacing={2} justifyContent="center">
          
       
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Foot;
