import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box id="notFoundContainer">
      <Typography variant="h1" id="notFoundTitle">404</Typography>
      <Typography variant="h2" id="notFoundSubtitle">Error: Page Not Found</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGoBack} 
        id="goBackButton"
      >
        Go Back
      </Button>
      <div className="container1">
        <div className="ring" id="ring1"></div>
        <div className="ring" id="ring2"></div>
        <div className="ring" id="ring3"></div>
      </div>
    </Box>
  );
}

export default NotFound;
