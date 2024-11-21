import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import './contact.css';
import { useNavigate } from 'react-router-dom';
//import Navbar1 from '../components/navbar1';


const ContactUsPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <Box className="contact-page">
      <Box className="contact-us-container">
        <Typography variant="h4" className="contact-us-title">
          Contact Us
        </Typography>

        <Typography variant="body1" className="contact-us-description">
          Have any questions or concerns? Please feel free to reach out to us by filling out the form below.
        </Typography>

        <Box component="form" className="contact-us-form">
          <TextField
            label="Your Name"
            fullWidth
            margin="normal"
            variant="outlined"
            className="contact-textfield"
            required
          />
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            className="contact-textfield"
            required
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            className="contact-textfield"
            required
          />

          <Button variant="contained" color="primary" type="submit" id='btn1'>
            Submit
          </Button>
        </Box>
      </Box>

      <Box className="social-media-buttons" sx={{fontSize:"6rem"}}>
        <Box className="glass-btn blue-btn">
          <FacebookIcon className="social-icon facebook-icon" />
        </Box>

        <Box className="glass-btn red-btn">
          <YouTubeIcon className="social-icon youtube-icon" />
        </Box>

        <Box className="glass-btn amber-btn">
          <InstagramIcon className="social-icon instagram-icon" />
        </Box>
      </Box>
      <Box sx={{marginTop:'50px'}}>
      <Button 
        variant="contained" 
        color= "warning"
        onClick={handleGoBack} 
        id="goBackButton"
      >
        X
      </Button>
      </Box>
    </Box>
  );
};

export default ContactUsPage;