import React from 'react';
import { Container, TextField, Button, Typography, Grid, CssBaseline, Box, IconButton } from '@mui/material';
import { LinkedIn, Email, Phone, Twitter, Instagram, LocationOn } from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';

const greyColor = '#9e9e9e'; // Define grey color
const contactInfoBgColor = '#f9f9f9'; // Background color for Contact Information
const contactFormBgColor = '#ffffff'; // Background color for Contact Us form

const ContactUsPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ backgroundColor: '#f0f0f0', color: '#333', minHeight: '100vh' }}>
      <CssBaseline />
      <Header toggleSidebar={toggleSidebar} searchEvents={() => {}} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Container component="main" style={{ marginTop: '20px' }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Contact Information</Typography>
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="flex-start" 
              style={{ backgroundColor: contactInfoBgColor, padding: '20px', borderRadius: '8px' }}
            >
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton href="https://www.linkedin.com/in/yourprofile" target="_blank" style={{ color: greyColor }}>
                  <LinkedIn />
                </IconButton>
                <Typography variant="body1" style={{ marginLeft: '8px' }}>LinkedIn Profile</Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton href="mailto:your.email@example.com" style={{ color: greyColor }}>
                  <Email />
                </IconButton>
                <Typography variant="body1" style={{ marginLeft: '8px' }}>your.email@example.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton href="tel:+1234567890" style={{ color: greyColor }}>
                  <Phone />
                </IconButton>
                <Typography variant="body1" style={{ marginLeft: '8px' }}>+1 234 567 890</Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton href="https://twitter.com/yourprofile" target="_blank" style={{ color: greyColor }}>
                  <Twitter />
                </IconButton>
                <Typography variant="body1" style={{ marginLeft: '8px' }}>Twitter Profile</Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton href="https://instagram.com/yourprofile" target="_blank" style={{ color: greyColor }}>
                  <Instagram />
                </IconButton>
                <Typography variant="body1" style={{ marginLeft: '8px' }}>Instagram Profile</Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton style={{ color: greyColor }}>
                  <LocationOn />
                </IconButton>
                <Typography variant="body1" style={{ marginLeft: '8px' }}>123 Your Address, City, Country</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center" gutterBottom>Contact Us</Typography>
            <Box 
              component="form" 
              noValidate 
              autoComplete="off" 
              style={{ 
                padding: '20px', 
                border: '2px solid #ccc', 
                borderRadius: '8px', 
                backgroundColor: contactFormBgColor, 
                // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' 
              }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)'}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="message"
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button 
                    variant="contained" 
                    style={{ 
                      transition: 'background-color 0.3s', 
                      backgroundColor: '#9e9e9e', 
                      color: '#fff' 
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#616161'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9e9e9e'}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactUsPage;
