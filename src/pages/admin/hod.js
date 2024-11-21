
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { Modal, Box, IconButton, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Navbar2 from '../../components/navbar2';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import './Student.css';
import Footer from '../../components/footer';

const Hod = () => {
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

  const fetchStudents = async (page, pageSize, sortModel) => {
    try {
      const response = await axios.get('http://localhost:7000/hod', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize, sort: sortModel }
      });
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:7000/hod/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          
        }
      });
      if (res.status === 204) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: " deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to delete ",
        text: error.response ? error.response.data.error : "An error occurred",
        showConfirmButton: true
      });
    } finally {
      fetchStudents();
    }
  };

  const handleInputChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post(
        'http://localhost:7000/hod',
        studentForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        Swal.fire({ position: 'center', icon: 'success', title: 'Added successfully', showConfirmButton: false, timer: 1500 });
        fetchStudents();
        setOpenAdd(false);
        resetStudentForm();
      }else if (response.status === 202) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email already exists',
        });
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Failed to add student', icon: 'error' });
    }
  };
  

  const handleUpdateStudent = async () => {
    try {
      const response = await axios.put(`http://localhost:7000/hod/${selectedStudent.id}` , studentForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
        fetchStudents();
        setOpenEdit(false);
        setSelectedStudent(null);
      }
    } catch (error) {
      Swal.fire({
        title: "The Internet?",
        text: "Something went wrong",
        icon: "question"
      });
      console.error('Error updating ', error);
    }
  };

  const handleOpenAddModal = () => {
    resetStudentForm();
    setOpenAdd(true);
  };

  const handleOpenEditModal = (student) => {
    setSelectedStudent(student);
    setStudentForm(student);
    setOpenEdit(true);
  };

  const resetStudentForm = () => {
    setStudentForm({
      name: '',
      email: '',
      password: '',
      age: '',
      branch: '',
      phone_number: '',
    });
  };

  const handleCloseAddModal = () => {
    setOpenAdd(false);
    resetStudentForm();
  };

  const handleCloseEditModal = () => {
    setOpenEdit(false);
    resetStudentForm();
  };

  const handleOpenViewModal = (student) => {
    setSelectedStudent(student);
    setOpenView(true);
  };

  const handleCloseViewModal = () => {
    setOpenView(false);
    setSelectedStudent(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'branch', headerName: 'Branch', width: 100 },
    { field: 'email', headerName: 'E-mail', width: 220 },  // Added E-mail column
    { field: 'phone_number', headerName: 'Contact number', width: 110 },
    {
      field: 'view',
      headerName: 'View',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<VisibilityIcon />}
          onClick={() => handleOpenViewModal(params.row)}
        >
          View
        </Button>
      ),
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => handleOpenEditModal(params.row)}
        >
          Update
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="warning"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (

    <div style={{ height:'400px', width: '100%', marginTop: '80px', marginLeft: '30px' }}>
      <Navbar2 />
      <Button variant="contained" color='info' startIcon={<PersonAddIcon />} onClick={handleOpenAddModal}>
        Add Hod
      </Button>
      <DataGrid rows={rows} columns={columns} pageSize={25} sx={{ marginRight: '300px', height: '700px', width:'90%' }} />


      <Modal open={openAdd} onClose={handleCloseAddModal}>
      <Box id="student-modal">
        <IconButton
          onClick={handleCloseAddModal}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <h2>Add Student</h2>

        <TextField
          label="NAME"
          name="name"
          fullWidth
          value={studentForm.name}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <TextField
          label="EMAIL"
          name="email"
          fullWidth
          value={studentForm.email}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <TextField
          label="PASSWORD"
          name="password"
          fullWidth
          value={studentForm.password}
          onChange={handleInputChange}
          margin="normal"
          required
          type="password"
        />


        {/* Gender dropdown */}
        {/* <TextField
          label="GENDER"
          name="gender"
          select
          fullWidth
          value={studentForm.gender}
          onChange={handleInputChange}
          margin="normal"
          required
        >
          {['Male', 'Female', 'Rather Not Say'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField> */}

        {/* Branch dropdown - assumes branches are fetched and stored in branchOptions */}
        <TextField
          label="BRANCH"
          name="branch"
          select
          fullWidth
          value={studentForm.branch}
          onChange={handleInputChange}
          margin="normal"
          required
        >
          {branches.map((branch) => (
            <MenuItem key={branch.id} value={branch.name}>
              {branch.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="PHONE NUMBER"
          name="phone_number"
          fullWidth
          value={studentForm.phone_number}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <Button variant="contained" color="primary" onClick={handleAddStudent} fullWidth sx={{ mt: 2 }}>
          Add Student
        </Button>
      </Box>
</Modal>


      {/* Edit Student Modal */}
      <Modal open={openEdit} onClose={handleCloseEditModal}>
  <Box id="student-modal" sx={{ position: 'relative', padding: '20px', backgroundColor: 'white', borderRadius: '8px', width: '60%', margin: '5% auto', boxShadow: 24 }}>
    {/* Close button at the top right corner */}
    <IconButton
      onClick={handleCloseEditModal}
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
    
    <h2>Edit Student</h2>

    {/* Fetch branches for dropdown */}
    {useEffect(() => {
      fetch('/branches')
        .then((response) => response.json())
        .then((data) => setBranches(data))
        .catch((error) => console.error('Error fetching branches:', error));
    }, [])}

    {['name', 'email','phone_number'].map((field) => (
      <TextField
        key={field}
        label={field.replace('_', ' ').toUpperCase()}
        name={field}
        fullWidth
        value={studentForm[field]}
        onChange={handleInputChange}
        margin="normal"
      />
    ))}

    {/* Gender Dropdown */}
    {/* <FormControl fullWidth margin="normal">
      <InputLabel>Gender</InputLabel>
      <Select
        name="gender"
        value={studentForm.gender}
        onChange={handleInputChange}
        label="Gender"
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Rather Not Say">Rather Not Say</MenuItem>
      </Select>
    </FormControl> */}

    {/* Branch Dropdown */}
    <FormControl fullWidth margin="normal">
      <InputLabel>Branch</InputLabel>
      <Select
        name="branch"
        value={studentForm.branch}
        onChange={handleInputChange}
        label="Branch"
      >
        {branches.map((branch) => (
          <MenuItem key={branch.id} value={branch.name}>
            {branch.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Update button */}
    <Button
      variant="contained"
      color="primary"
      onClick={handleUpdateStudent}
      fullWidth
      sx={{ mt: 2 }}
    >
      Update Student
    </Button>
  </Box>
</Modal>

      {/* View Student Modal */}
      <Modal open={openView} onClose={handleCloseViewModal}>
  <Box id="student-view-modal">
    <IconButton
      onClick={handleCloseViewModal} // Update here
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
    {selectedStudent && (
      <>
        <Avatar
          sx={{ width: 120, height: 120, margin: 'auto', border: '4px solid white' }}
          src={selectedStudent.profilePicture || '/default-profile.png'}
        />
        <Typography variant="h5" align="center">{selectedStudent.name}</Typography>
        <Typography variant="body1" align="center">{selectedStudent.email}</Typography>
        
        <Typography variant="body1">Gender: {selectedStudent.gender}</Typography>
        <Typography variant="body1">Branch: {selectedStudent.branch}</Typography>
        <Typography variant="body1">Phone: {selectedStudent.phone_number}</Typography>


        <Button
          variant="contained"
          color="warning"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(selectedStudent.id)} // Pass the student ID here
        >
          Delete
        </Button>
      </>
    )}
  </Box>
</Modal>
    <Footer />
    </div>

  );
};

export default Hod;