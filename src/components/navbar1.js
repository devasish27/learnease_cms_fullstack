import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logocms from './assests/images/logocms-new.png';
import './navbar1.css';

import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';

function Navbar1() {

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
            component={Link}
            to="/login"
            startIcon={<LoginIcon />}
            className="nav-button"
          >
            Login
          </Button>

          <Button
            variant="outlined"
            component={Link}
            to="/contact"
            startIcon={<CallIcon />}
            className="nav-button"
          >
            Contact 
          </Button>

          <Button
            variant="outlined"
            component={Link}
            to="/about"
            startIcon={<InfoIcon />}
            className="nav-button"
          >
            About
          </Button>


        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar1;
