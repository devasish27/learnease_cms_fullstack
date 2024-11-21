import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import logocms from './assests/images/logocms-new.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutButton from './Logout';
import './navbar1.css';
import axios from 'axios';

const Navbar3 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const token = JSON.parse(localStorage.getItem('token'));
  
  
  const fetchStudentProfile = async () => {
    
    // console.log(token)
    try {
      const response = await axios.get('http://localhost:7000/student/profile'
        , {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setStudentProfile(response.data);
    } catch (error) {
      console.error('Error fetching student profile:', error);
    }
  }
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
    fetchStudentProfile()
    
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setStudentProfile(null);
  };



  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar className="toolbar">
        <div className="logo-container">
          <img src={logocms} alt="LearnEase Logo" className="logo" />
          <Typography variant="h6" className="site-title">
            LEARNEASE
          </Typography>
        </div>
        
        <div className="nav-btns">
          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/stubranch"
            startIcon={<ArrowRightIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            Branch
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/stfaclty"
            startIcon={<GroupsIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            Staff
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/library"
            startIcon={<GroupsIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            Library
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/takequiz"
            startIcon={<ArrowRightIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            test
          </Button>


          <IconButton
            color="inherit"
            sx={{ borderColor: 'white', color: 'white', marginRight: '10px', borderInlineColor:'white' }}
            onClick={handleOpenDrawer}
          >
            <PersonOutlineIcon />
          </IconButton>
        </div>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box
          sx={{
            width: 300,
            padding: 3,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {studentProfile ? ( // Check if studentProfile has data
            <>
              <Box>
                <Avatar
                  src={studentProfile.profilePicture || ''} // Assuming profilePicture is in the response
                  sx={{
                    width: 100,
                    height: 100,
                    border: '2px solid white',
                    marginBottom: 2,
                  }}
                />
              </Box>

              <Typography variant="h6" align="center">
                {studentProfile.name || 'Student Name'} {/* Use name from studentProfile */}
              </Typography>
              <Box mt={2 }>
                <Typography variant="body1">Email: {studentProfile.email || 'N/A'}</Typography>
                <Typography variant="body1">Age: {studentProfile.age || 'N/A'}</Typography>
                <Typography variant="body1">Branch: {studentProfile.branch || 'N/A'}</Typography>
                <Typography variant="body1">Phone: {studentProfile.phone_number || 'N/A'}</Typography>
              </Box>
            </>
          ) : (
            <Typography variant="body1">No student profile available.</Typography>
          )}
          <LogoutButton />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar3;