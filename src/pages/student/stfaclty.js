import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar3 from '../../components/navbar3';
import './stfaclty.css'; 
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';

const Fac = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [rows, setRows] = useState([]);
  //const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:7000/faculty', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

 
  // const handleRowClick = (params) => {
  //   navigate(`/profile/${params.id}`);
  // };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phone_number', headerName: 'Phone', width: 250 },
    { field: "branch", headerName: "Branch", Width: 200},
  ];

  return (
  
    <div style={{ height: '700px', width: '100%', marginTop: '130px', marginLeft:'30px' }}>
    <Navbar3 />

    <Link to='/login' id="animation-link">X</Link>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        // onRowClick={handleRowClick}
        sx={{
            marginRight:'100px',
            marginLeft:'40px',
            height:"700px",
            width:"85%",
            marginBottom:"50px",
            marginTop:"10px",
            
        }}
      />

      <Footer />
    </div>
  );
};

export default Fac;