// Home.js
import React from 'react';
import { Box, Typography, Button,  Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import './home1.css';
//import image1 from '../assests2/image1.webp';
import image2 from "../assests2/image2.jpg";
import image3 from "../assests2/image3.webp";
import image4 from "../assests2/image4.jpg";
import image5 from "../assests2/image5.jpg";
import Navbar2 from '../../components/navbar1';


const Home = () => {

  return (
    <body id="home-container">
      <Navbar2 />

      <Box id='hero'>

          <Typography variant="h3" id="welcome-title">
            CAMPUS MANAGEMENT SYSTEM
          </Typography>
      </Box>

      <Box id="hero2" sx={{alignItems:'center'}}> 
          <Typography variant='p' id='welcome-content'>
          your comprehensive campus management system designed to simplify and enhance campus operations.
          LearnEase provides a unified platform for managing student information, faculty details, academic resources,
          and administrative tasks with ease and efficiency. Tailored to meet the needs of students, faculty, and 
          administrators, our system streamlines communication, automates routine processes, and promotes an organized, 
          accessible campus experience. Whether you're tracking academic progress, scheduling events, or accessing
          important resources, LearnEase is here to make campus life smoother for everyone involved.
          </Typography>
          </Box>

      {/* Scrollable Details Section */}
      <Box id="details-section">
        <Box id='sub-detail'>
        <Typography variant="h5" className="details-title">
          Explore Our Features
        </Typography>
        
        <Button 
          variant="contained"
          color="primary"
          component={Link} 
          to="/login" 
          className="login-button"
        >
          Login to Learn More
        </Button>
        </Box>

        <Grid container spacing={4} className="feature-sections">
          <Grid item xs={12} md={6} className="feature-details">
            <Typography variant="h6" className="feature-title">Feature 1</Typography>
            <Typography className="feature-description">Our campus with most efficient infrastucture </Typography>
          </Grid>
          <Grid item xs={12} md={6} className="feature-image">
          <Box component="img" src={image4} alt="Feature 1" className="detail-image" />
          </Grid>

          <Grid item xs={12} md={6} className="feature-details">
            <Box component="img" src={image2} alt="Feature 1" className="detail-image" />
          </Grid>
          <Grid item xs={12} md={6} className="feature-image">
          <Typography variant="h6" className="feature-title">Feature 2</Typography>
          <Typography className="feature-description">Our campus with most efficient infrastucture </Typography>
          </Grid>

          <Grid item xs={12} md={6} className="feature-details">
            <Typography variant="h6" className="feature-title">Feature 3</Typography>
            <Typography className="feature-description">Our campus with most efficient infrastucture </Typography>
          </Grid>
          <Grid item xs={12} md={6} className="feature-image">
          <Box component="img" src={image5} alt="Feature 3" className="detail-image" />
          </Grid>

          <Grid item xs={12} md={6} className="feature-details">
            <Box component="img" src={image3} alt="Feature 1" className="detail-image" />
          </Grid>
          <Grid item xs={12} md={6} className="feature-image">
            <Typography variant="h6" className="feature-title">Feature 4</Typography>
            <Typography className="feature-description">Our campus with most efficient infrastucture </Typography>
          </Grid>

        </Grid>
      </Box>

      <Footer />
    
    </body>
  );
};

export default Home;
