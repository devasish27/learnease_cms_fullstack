import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
import './footer.css'; 

const Footer = () => {
  return (
    <Box className="footer-container" >
      <Typography variant="body2" className="footer-text">
        © 2024 LearnEase. All Rights Reserved.
      </Typography>  

      <Button
          color="inherit"
          component={Link}
          to="/contact" 
          startIcon={<CallIcon />}
        >
          Contact Us
        </Button>
    </Box>
  );
};

export default Footer;
