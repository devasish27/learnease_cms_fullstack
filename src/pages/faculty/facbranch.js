import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Grid, Button, Box, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
//import './branch.css';
import Footer from '../../components/footer';
import Navbar4 from '../../components/navbar4';

const Bran = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [branches, setBranches] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // Control form visibility
  const [branchName, setBranchName] = useState({ branch: '' }); // State for new branch
  const [branchCounts, setBranchCounts] = useState({}); 
  // Fetch branches when the component mounts
  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:7000/branches', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setBranches(response.data);

  const countsPromises = response.data.map(async (branch) => {
    const res = await axios.get(`http://localhost:7000/getCounts?branch=${branch.name}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { branchName: branch.name, counts: res.data };
  });

  const allCounts = await Promise.all(countsPromises);
      const countsMap = {};
      allCounts.forEach(({ branchName, counts }) => {
        countsMap[branchName] = counts;
      });
      setBranchCounts(countsMap);
    } catch (error) {
      console.error("There was an error fetching the branches!", error);
    }
  };

  const deleteBranch = (id) => {
    axios
      .delete(`http://localhost:7000/branch/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(async(response) => {
        if (await response.status === 200) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });}
      })
      .catch((error) => {
        console.error("Error deleting the branch!", error);
      });
      window.location.reload();
  };

  // Handle input change for the new branch form
  const handleInputChange = (e) => {
    setBranchName({ ...branchName, [e.target.name]: e.target.value });
  };

  // Add new branch
  const handleAddBranch = () => {
    axios
      .post('http://localhost:7000/addbranch' , branchName, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Branch added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchBranches(); // Refresh list after addition
          setIsFormVisible(false); // Hide form after submission
          setBranchName({ branch: '' }); // Reset form
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  useEffect(() => {
    fetchBranches();
  }, []);


  return (
    <Box>
    <Box sx={{ padding: 4, height:'770px' }}>
      <Navbar4 />
      {/* Grid to display branches */}
      <Grid container spacing={3} sx={{marginBottom:4, marginTop:'70px'}}>
        {branches.map((branch) => {
            const counts = branchCounts[branch.name] || { students: 0, faculty: 0 };
            return (
          <Grid item xs={12} sm={6} md={4} key={branch.id}>
            <CardContent className="branch-card">
              <Typography variant="h5" className="branch-name">
                {branch.name}
              </Typography>
              <Typography variant="body2">Staff:  {counts.faculty}</Typography>
              <Typography variant="body2">Students: {counts.students}</Typography>
              
            </CardContent>
          </Grid>
            );
          })}
      </Grid>

      {/* Button to toggle form visibility */}
      

      
      </Box>
      <Footer />
    </Box>

  );
};

export default Bran;
