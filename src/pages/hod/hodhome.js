import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './HodPage.css';
import Navbar5 from '../../components/navbar5'

const HomePage5 = ({ hod }) => {
  // const [studentCount, setStudentCount] = useState(0);
  // const [facultyCount, setFacultyCount] = useState(0);
  //const navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`hod/getCounts?branch=${hod.branch}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setStudentCount(data.students);
  //       setFacultyCount(data.faculty);
  //     })
  //     .catch(err => console.error(err));
  // }, [hod.branch]);

  return (
    <Box className="hodPage">
      <Navbar5 />
      <Box className="leftSection">
        <Typography variant="h2" className="heading">
          {/* Welcome, {hod.name} */} Welcome
        </Typography>
        <Typography variant="body1" className="description">
          Manage students and faculty members efficiently in your department.
        </Typography>
      </Box>

      {/* Right Section */}
      <Box className="rightSection">
        <img src="your-image-url.jpg" alt="HOD" className="hodImage" />
      </Box>

      {/* Cards */}
      <Grid container spacing={2} className="cardGrid">
        <Grid item xs={6}>
          <Card
            className="infoCard"
            // onClick={() => navigate('/hodstudent')}
          >
            <CardContent>
              <Typography variant="h5">Students</Typography>
              {/* <Typography variant="body1">{studentCount} Students</Typography> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            className="infoCard"
            // onClick={() => navigate('/hodfaculty')}
          >
            <CardContent>
              <Typography variant="h5">Faculty</Typography>
              {/* <Typography variant="body1">{facultyCount} Faculty</Typography> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage5;