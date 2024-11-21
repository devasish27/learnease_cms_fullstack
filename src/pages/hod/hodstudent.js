import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar5 from '../../components/navbar5';

const HodStudent = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hodProfile, setHodProfile] = useState(null);
const [hodBranch, setHodbranch]=useState(null);


  useEffect(() => {
    // Ensure the HOD branch is available before calling fetch functions
   
      fetchHodProfile();
      fetchStudents();
   
  }, [hodBranch]);

  // Fetch HOD profile
  const fetchHodProfile = async () => {
    try {
      const response = await axios.get('http://localhost:7000/hod/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setHodProfile(response.data);
      console.log(response.data.branch)
      setHodbranch(response.data.branch);
    } catch (error) {
      console.error('Error fetching HOD profile:', error);
      setLoading(false);
    }
  };

  // Fetch students of the same branch as HOD
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/getStudents?branch=${hodBranch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data && response.data.length > 0) {
        setStudents(response.data);
      } else {
        console.error('No students found for this branch');
        setStudents([]); // No students for the given branch
      }
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'branch', headerName: 'Branch', flex: 1 },
  ];

  // Display error message if the branch is missing or no students are found
  if (!hodBranch) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          No branch found for the HOD. Please check the data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%', mt: 4 }}>
      <Navbar5 />
      
      <Typography variant="h4" sx={{ mb: 2 }}>
        Students in  Department
      </Typography>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        loading={loading}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default HodStudent;