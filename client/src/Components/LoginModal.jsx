import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    handleClose();
    navigate('/login');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 300, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4 
      }}>
        <Typography variant="h6" component="h2">
          Login Required
        </Typography>
        <Typography sx={{ mt: 2 }}>
          You need to log in first.
        </Typography>
        <Button onClick={handleOk} sx={{ mt: 2 }} variant="contained">
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;