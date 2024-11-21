import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Card, Box } from '@mui/material';
import axios from 'axios';
import "./stubranch.css"
import Navbar3 from '../../components/navbar3';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';

const Branchl = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [studentProfile, setStudentProfile] = useState(null);
  const [branchCounts, setBranchCounts] = useState({});

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  useEffect(() => {
    if (studentProfile?.branch) {
      fetchBranchCounts(studentProfile.branch);
    }
  }, [studentProfile]);

  const fetchStudentProfile = async () => {
    try {
      const response = await axios.get('http://localhost:7000/student/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setStudentProfile(response.data);
    } catch (error) {
      console.error('Error fetching student profile:', error);
    }
  };

  const fetchBranchCounts = async (branchName) => {
    try {
      const response = await axios.get(`http://localhost:7000/getCounts?branch=${branchName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBranchCounts(response.data);
    } catch (error) {
      console.error('Error fetching branch counts:', error);
    }
  };

  const getHODName = (branch) => {
    const hodMapping = {
      AIML: 'aiml_HOD',
      CSE: 'cse_HOD',
      IT: 'it_HOD',
      AIDS: 'aids_HOD',
      MECH: 'mech_HOD',
      EEE: 'eee_HOD',
      ECE: 'ece_HOD',
      Civil: 'civil_HOD',
    };
    return hodMapping[branch] || 'Unknown HOD';
  };

  return (
    <Box
      id="branch-container"
      sx={{
        
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Navbar3 />
      <Typography sx={{marginTop:'70px'}}>
        <h1>Branch Details</h1>
      </Typography>
      <Box id="another"
      sx={{
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        position: 'relative',
        marginBottom:"60px",
      }}
      >
      {studentProfile && (
        <Card id="branch-card" sx={{ textAlign: 'center', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" id="branch-title" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
              {studentProfile.branch}
            </Typography>
            <Typography variant="subtitle1" id="branch-hod" sx={{ marginBottom: 2, fontStyle: 'italic' }}>
              HOD: {getHODName(studentProfile.branch)}
            </Typography>
            <Typography variant="body2" id="branch-staff">
              Staff: {branchCounts.faculty || 0}
            </Typography>
            <Typography variant="body2" id="branch-students">
              Students: {branchCounts.students || 0}
            </Typography>
          </CardContent>
        </Card>
      )}
      {/* Live Animation Box */}
      <Box id="animation-container">
        <Link to='/login' id="animation-link"> .</Link>
      </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Branchl;
