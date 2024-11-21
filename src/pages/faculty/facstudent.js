import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { Box } from '@mui/material';

import axios from 'axios';
//import CloseIcon from '@mui/icons-material/Close';
//import './Student.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar4 from '../../components/navbar4';

const Fstudent = () => {
  const token = JSON.parse(localStorage.getItem('token'));
 
  const [rows, setRows] = useState([]);
  const [branches, setBranches] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);  // State to manage "View" modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    branch: '',
    phone_number: '',
    course_duration: '',
    course_fee: '',
    total_fee: '',
    joindate:'',
  });

  useEffect(() => {
    fetchStudents();
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:7000/branches', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBranches(response.data); // Assuming the response returns an array of branches
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:7000/students', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

 


  const resetStudentForm = () => {
    setStudentForm({
      name: '',
      email: '',
      password: '',
      age: '',
      gender: '',
      branch: '',
      phone_number: '',
      course_duration: '',
      course_fee: '',
      total_fee: '',
      joindate: "",
    });
  };

 

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'age', headerName: 'Age', width: 60 },
    { field: 'branch', headerName: 'Branch', width: 100 },
    { field: 'gender', headerName: 'Gender', width: 60 },
    { field: 'email', headerName: 'E-mail', width: 220 },  // Added E-mail column
    { field: 'phone_number', headerName: 'Contact number', width: 110 },
    { field: 'joindate', headerName: 'Joining Date', width: 150 },
    { field: 'course_duration', headerName: 'Year', width: 90 },
    { field: 'total_fee', headerName: 'Fee', width: 110 },
  ];

  return (
    <div style={{height:"800px", width: '100%' }}>
      <Navbar4 />

      <Box sx={{marginTop:'70px', marginLeft:'50px',}}>
      <Link to='/login' id="animation-link">X</Link>
      <DataGrid rows={rows} columns={columns} pageSize={25} sx={{ marginRight: '300px', height: '700px', width:'90%' }} />
      </Box>  

    <Footer />
    </div>
  );
};

export default Fstudent;