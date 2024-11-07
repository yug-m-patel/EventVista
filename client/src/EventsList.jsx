import React from 'react';
import { Grid } from '@mui/material';
import EventCard from './EventCard';

const EventsList = ({ events, showEventDetail }) => {
  console.log(events);
  
  return (
    <Grid container spacing={3}>
      {events.map((event, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <EventCard event={event} showEventDetail={showEventDetail} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsList;
