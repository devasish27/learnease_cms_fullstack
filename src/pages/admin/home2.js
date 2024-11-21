import React, { useState } from 'react';
import { Box, Typography, Grid, Card,  CardMedia, CardContent } from '@mui/material';
import Navbar2 from '../../components/navbar2';
import Footer from '../../components/footer';
import EventCalendar from "../../components/Eventcalender";
import './home2.css';
import image1 from '../assests2/resized_image.png';
import image2 from '../assests2/faculty.jpg';
import image3 from '../assests2/image3.webp';
import image from '../assests2/image2.jpg';

const HomePage2 = () => {
  return (
    <Box id="homepage1-root">
      <Navbar2 />
      
      <Box className="header-section" sx={{ marginTop: '70px' }}>
        <Typography variant="h3" color="#E0E8F0" textAlign="center" className="welcome-textt">
          Welcome Admin
        </Typography>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={4} justifyContent="center" id="card-section" sx={{ marginY: '20px' }}>
       <Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Card className="info-card" onClick={() => window.location.href = "/dashboard"}>
            <CardMedia
              component="img"
              height="200"
              image="https://th.bing.com/th/id/OIP.D_PxOnKHRDg3BNUxKwoojAHaFj?w=232&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text" textAlign="center">
                Dashboard
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        </Grid>

        {/* Two cards in the second row */}
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Card className="info-card" onClick={() => window.location.href = "/createquiz"}>
            <CardMedia
              component="img"
              height="200"
              image={image3} // Demo image URL
              alt="Create Quiz"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text" textAlign="center">
                Create Quiz
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Card className="info-card" onClick={() => window.location.href = "/hod"}>
            <CardMedia
              component="img"
              height="200"
              image="https://th.bing.com/th/id/OIP.U9Q4HTVrU4iO0eqUdblXOAHaEK?w=279&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7" // Demo image URL
              alt="Hod"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text" textAlign="center">
                View HOD
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Three cards in the third row */}
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Card className="info-card" onClick={() => window.location.href = "/student"}>
            <CardMedia
              component="img"
              height="200"
              image={image1} // Demo image URL
              alt="View Students"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text" textAlign="center">
                View Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Card className="info-card" onClick={() => window.location.href = "/staff"}>
            <CardMedia
              component="img"
              height="200"
              image={image2} // Demo image URL
              alt="View Faculty"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text" textAlign="center">
                View Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Card className="info-card" onClick={() => window.location.href = "/branch"}>
            <CardMedia
              component="img"
              height="200"
              image={image} // Demo image URL
              alt="View Branches"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text" textAlign="center">
                View Branches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box className="ttt1" >
      <EventCalendar />
      </Box>


      <Box className="glow-box">
        <h3>Keep Track of Your Events!</h3>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default HomePage2;
