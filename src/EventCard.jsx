import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const EventCard = ({ event, showEventDetail }) => {
  return (
    <Card onClick={() => showEventDetail(event)}>
      <CardMedia
        component="img"
        image={event.Image}
        alt={event.name}
        sx={{
          width: '100%',      // Ensures the image fills the width of the card
          height: '200px',     // Fixes the height of the image
          objectFit: 'cover',  // Makes sure the image scales properly within the given dimensions
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.date}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
