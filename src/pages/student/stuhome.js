// src/pages/HomePage3.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Card } from '@mui/material';
import Navbar3 from '../../components/navbar3';
// import CalendarComponent from '../../components/CalendarComponent'; // Assuming you have a calendar component
import bgm from '../assests2/new.jpg';
import EventCalendar from '../../components/Eventcalender';
import Footer from '../../components/footer';
import "./sthome.css";

const HomePage3 = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Toggle popup visibility every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Navbar3 />
      
      {/* Live Popup Label */}
      {showPopup && (
        <Box
          sx={{
            position: 'absolute',
            top: '60px', // Adjust based on navbar height
            left: '-100%', // Start offscreen
            width: '100%',
            color: '#fff',
            backgroundColor: '#FF4081',
            textAlign: 'center',
            padding: '10px',
            animation: 'scrollLabel 5s linear infinite',
            zIndex: 1000,
          }}
        >
          <Typography variant="subtitle1">Don't miss our latest campus updates and events!</Typography>
        </Box>
      )}

      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#1A2434',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '20px',
          marginTop: '60px',
        }}
      >
        <Box
          sx={{
            flex: 1,
            color: '#E0E8F0',
            animation: 'fadeIn 2s ease-in-out',
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ animation: 'slideInFromLeft 2s' }}>
            Welcome Student
          </Typography>
          <Typography variant="h5" sx={{ animation: 'slideInFromLeft 2.5s' }}>
            Explore Our Courses and Campus
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: '12px',
              animation: 'fadeInText 3s ease-in',
            }}
          >
            Get ready to embark on an amazing educational journey with us. Explore a world of opportunities,
            engage with experienced faculty, and achieve your academic goals while enjoying a vibrant campus life.
            Join us to shape your future!
          </Typography>
        </Box>

        {/* Right Side: Animated Images */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${bgm})`,
            backgroundSize: 'cover',
            height: '100%',
            animation: 'fadeIn 3s',
          }}
        />
      </Box>

      {/* Know Your Faculty Section */}
      <Card sx={{ textAlign: 'center', marginTop: '23px', width:'95%', height:"200px", alignItems:"center" , justifyContent:"center", background:'linear-gradient(135deg, #f0f0f0, #d1e9ff)' }}>
        <Button variant="outlined" href="/faculty" sx={{ color: '#000000' }}>
          Know Your Faculty
        </Button>
      </Card>

      {/* Calendar Section */}
      <Box sx={{ marginTop: '20px', padding: '20px', alignContent: 'start' }}>
        <EventCalendar />
      </Box>

      {/* Academic Progress Bar */}
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="#E0E8F0">
          Academic Progress
        </Typography>
        <CircularProgress variant="determinate" value={75} /> {/* Example value */}
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage3;
