import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const EventCard = ({ event, showEventDetail }) => {
  return (
    <Card onClick={() => showEventDetail(event)}>
      <CardMedia
        component="img"
        image={event.Thumbnail}
        alt={event.EventTitle}
        sx={{
          width: '100%',      // Ensures the image fills the width of the card
          height: '200px',     // Fixes the height of the image
          objectFit: 'cover',  // Makes sure the image scales properly within the given dimensions
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.EventTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.Date}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.Description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.PaidFee}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;

// import React from 'react';
// import { Card, CardContent, CardMedia, Typography } from '@mui/material';

// const EventCard = ({ event, showEventDetail }) => {
//   return (
//     <Card onClick={() => showEventDetail(event)}>
//       <CardMedia
//         component="img"
//         image={event.Thumbnail}
//         alt={event.EventTitle}
//         sx={{
//           width: '100%',      // Ensures the image fills the width of the card
//           height: '200px',     // Fixes the height of the image
//           objectFit: 'cover',  // Makes sure the image scales properly within the given dimensions
//         }}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {event.EventTitle}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {event.Date}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {event.Description}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {event.PaidFee}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default EventCard;