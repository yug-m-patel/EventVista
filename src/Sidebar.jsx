import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { text: 'HOME', path: '/home' },
    { text: 'Events', path: '/events' },
    { text: 'News', path: '/news' },
    { text: 'About Us', path: '/aboutus' },
    { text: 'Contact Us', path: '/contactus' }
  ];

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
      <div style={{ width: 250, backgroundColor: 'grey', height: '100%' }}>
        <IconButton onClick={toggleSidebar}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center">
          Event Vista
        </Typography>
        <List sx={{ color: 'white' }}>
          {menuItems.map((item, index) => (
            <ListItem button key={index} component={Link} to={item.path} onClick={toggleSidebar}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
