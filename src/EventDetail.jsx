import React from 'react';
import { Dialog, DialogTitle, DialogContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EventDetail = ({ event, open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {event.name}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          height="100"
          width="100"
          image={event.Image}
          alt={event.name}
          sx={{
            objectFit: 'contain', // Ensures the image is not stretched
            maxWidth: '150px',    // Consistent size
            margin: '0 auto'      // Centers the image
          }}
        />
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          Date: {event.date}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Description: {event.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: {event.price}
        </Typography>

        {/* Buy Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: 'grey', // Gray color
            color: 'white',
            padding: '10px 0',
            fontWeight: 'bold',
            borderRadius: '8px', // Rounded corners
            '&:hover': {
              backgroundColor: 'darkgrey', // Darker gray on hover
            },
          }}
        >
          Buy
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetail;
