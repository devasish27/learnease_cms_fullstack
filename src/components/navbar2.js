import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logocms from './assests/images/logocms-new.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
//import InfoIcon from '@mui/icons-material/Info';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import GroupsIcon from '@mui/icons-material/Groups';
import './navbar1.css';
import LogoutButton from './Logout';
// import { useNavigate } from 'react-router-dom';
// import LoginIcon from '@mui/icons-material/Login';



const Navbar2 = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Remove token from local storage
  //   localStorage.removeItem('token');

  //   // Redirect to main home page
  //   navigate('/');
  // };


  return (
    <AppBar position="fixed" className="navbar" >
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
            to="/branch"

            startIcon={<ArrowRightIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            Branch
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/hod"

            startIcon={<ArrowRightIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            HOD
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/createquiz"

            startIcon={<ArrowRightIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            quiz
          </Button>


          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/dashboard"
            startIcon={<PersonOutlineIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            Dashboard
          </Button>


          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/student"
            startIcon={<PersonOutlineIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            Student
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/staff"
            startIcon={<GroupsIcon />}
            sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', marginRight: '10px' }}
          >
            Staff
          </Button>


          {/* <Button
            variant="outlined"
            component={Link}
            to="/about"
            startIcon={<LoginIcon />}
            className="nav-button"
            onClick={handleLogout}
          >
            Logout
          </Button> */}

          <LogoutButton />
        
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar2;
