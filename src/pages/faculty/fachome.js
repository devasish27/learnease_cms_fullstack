import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import axios from 'axios';
import './faculty.css';
import Navbar4 from '../../components/navbar4';

const HomePage4 = () => {
  const [facultyDetails, setFacultyDetails] = useState(null);

  useEffect(() => {
    // Fetch faculty details from backend
    axios
      .get('/faculty', { withCredentials: true })
      .then(response => {
        setFacultyDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching faculty profile:", error);
      });
  }, []);

  return (
    <Box className="facultyPage">
     < Navbar4 />
     <Box className="fullscreenSection">
        {/* Left Section */}
        <Box className="leftSection">
          <Typography variant="h2" className="heading">
            Welcome
          </Typography>
          {facultyDetails ? (
            <Typography variant="h4" className="facultyName">
              {facultyDetails.name}
            </Typography>
          ) : (
            <Typography variant="h4" className="facultyName">
              Loading...
            </Typography>
          )}
        </Box>

        {/* Right Section */}
        <Box className="rightSection">
          <Typography variant="h5" className="animatedText">
            Welcome to our faculty portal, your resource for departmental updates and information.
          </Typography>
        </Box>
      </Box>

      {/* Cards Section */}
      <Box className="cardsSection">
        <Grid container spacing={3} className="cardGrid">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="infoCard">
              <CardContent>
                <Typography variant="h5">Branches</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="infoCard">
              <CardContent>
                <Typography variant="h5">HOD</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="infoCard">
              <CardContent>
                <Typography variant="h5">Students</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="infoCard">
              <CardContent>
                <Typography variant="h5">Faculty</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Explore More Box */}
        <Box className="exploreBox">
          <Button variant="contained" color="primary">
            Explore More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage4;
