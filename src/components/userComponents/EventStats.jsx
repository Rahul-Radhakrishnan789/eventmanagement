import React from 'react';
import { Container, Typography, Grid, } from '@mui/material';

const EventStats = ({data}) => {
  return (
    <Container sx={{ backgroundColor: '#0c1035', color: 'white', padding:10,marginY:'5%',display:'flex',alignItems:'center',flexDirection:'column', }}>
        <h3 style={{paddingBottom:'5%'}}>Backstage By The Numbers</h3>
      <Grid container spacing={6} >
        <Grid item xs={4} sx={sx.gridItem}>
          <Typography variant="h4">
            {data?.eventNumber}+
          </Typography>
          <Typography variant="body2"  sx={sx.gridItem}>
            Events
          </Typography>
        </Grid>
        <Grid item xs={4}  sx={sx.gridItem}>
          <Typography variant="h4">
          {data?.organizerNumber}+
          </Typography>
          <Typography variant="body2" sx={sx.gridItem}>
            Event Planners
          </Typography>
        </Grid>
       
        <Grid item xs={4}  sx={sx.gridItem}>
          <Typography variant="h4">
          {data?.userNumber}+
          </Typography>
          <Typography variant="body2"  sx={sx.gridItem}>
            Attendees
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventStats;


const sx = {
    gridItem: {
        display:'flex',
        flexDirection:"column",
        alignItems:'center',
        textAlign:'center',
    }
}
