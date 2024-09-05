import React, { useState } from 'react';
import { TextField, Typography, Button, FormGroup, FormControlLabel, Checkbox, Box, Container, Switch, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Sidebar from './Sidebar';  // Importing the same Sidebar component
import Header from './Header';    // Importing the same Header component
import libimg from './assets/images/lib.jpg';

const ProfilePage = () => {
  const initialProfileData = {
    fullName: 'Pruthviraj Rajput',
    enrollId: '210303105317',
    phoneNum: '(insert phone number here)',
    department: 'COMPUTER SCIENCE AND ENGINEERING',
    courseProgram: 'B.TECH',
    yearOfStudying: '2024',
    preferences: {
      cse: false,
      medical: false,
      mechanical: false,
      chemical: false,
    },
    notificationsEnabled: false,
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      preferences: { ...prevData.preferences, [name]: checked },
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save the updated profile data to your backend or state management
    alert('Profile updated successfully!');
  };

  const handleToggleNotifications = () => {
    setProfileData((prevData) => ({
      ...prevData,
      notificationsEnabled: !prevData.notificationsEnabled,
    }));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleChangePasswordOpen = () => setOpenChangePasswordDialog(true);
  const handleChangePasswordClose = () => setOpenChangePasswordDialog(false);
  const handleForgotPasswordOpen = () => setOpenForgotPasswordDialog(true);
  const handleForgotPasswordClose = () => setOpenForgotPasswordDialog(false);

  return (
    <div style={{ display: 'flex', backgroundColor: '#f0f0f0', color: '#333' }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={{ flexGrow: 1 }}>
        <Header toggleSidebar={toggleSidebar} />
        <Container maxWidth="md" sx={{ bgcolor: '#ebeaea', p: 3, boxShadow: 3, borderRadius: 2, marginTop: '50px' }}>
          <Typography variant="h4" gutterBottom align="center">
            Profile
          </Typography>
          <Box
  component="div"
  sx={{
    display: 'flex',
    justifyContent: 'center',
    mb: 2,
  }}
>
  <img src={libimg} alt="Profile Picture" style={{ width: 150, height: 150, borderRadius: '50%' }} />
</Box>


          <FormGroup>
            <TextField
              label="FULL NAME"
              name="fullName"
              value={profileData.fullName}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="ENROLL ID"
              name="enrollId"
              value={profileData.enrollId}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="PHONE NUM"
              name="phoneNum"
              value={profileData.phoneNum}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            <TextField
              label="DEPARTMENT"
              name="department"
              value={profileData.department}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="COURSE PROGRAM"
              name="courseProgram"
              value={profileData.courseProgram}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="YEAR OF STUDYING"
              name="yearOfStudying"
              value={profileData.yearOfStudying}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
          </FormGroup>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              SELECT YOUR PREFERENCES
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={profileData.preferences.cse} onChange={handleCheckboxChange} name="cse" disabled={!isEditing} />}
                label="CSE"
              />
              <FormControlLabel
                control={<Checkbox checked={profileData.preferences.medical} onChange={handleCheckboxChange} name="medical" disabled={!isEditing} />}
                label="MEDICAL"
              />
              <FormControlLabel
                control={<Checkbox checked={profileData.preferences.mechanical} onChange={handleCheckboxChange} name="mechanical" disabled={!isEditing} />}
                label="MECHANICAL"
              />
              <FormControlLabel
                control={<Checkbox checked={profileData.preferences.chemical} onChange={handleCheckboxChange} name="chemical" disabled={!isEditing} />}
                label="CHEMICAL"
              />
            </FormGroup>
          </Box>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <FormControlLabel
              control={<Switch checked={profileData.notificationsEnabled} onChange={handleToggleNotifications} />}
              label="Notifications"
            />
          </Box>
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleEditProfile} disabled={isEditing}>
              Edit Profile
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSaveProfile} disabled={!isEditing}>
              Save
            </Button>
            <Button variant="outlined" color="error" sx={{ mt: 2 }}>
              Logout
            </Button>
            <Button variant="outlined" color="warning" sx={{ mt: 2 }} onClick={handleChangePasswordOpen}>
              Change Password
            </Button>
            <Button variant="outlined" color="info" sx={{ mt: 2 }} onClick={handleForgotPasswordOpen}>
              Forgot Password
            </Button>
          </Box>
        </Container>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={openChangePasswordDialog} onClose={handleChangePasswordClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePasswordClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePasswordClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog open={openForgotPasswordDialog} onClose={handleForgotPasswordClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotPasswordClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleForgotPasswordClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
