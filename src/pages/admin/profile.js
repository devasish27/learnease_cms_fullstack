import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Grid } from '@mui/material';
//import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StudentPage() {
  const location = useLocation();
  const { student } = location.state || {};

  if (!student) {
    return <Typography variant="h5">Student data not found.</Typography>;
  }


  const options = {
    responsive: true,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Student Marks' }
    }
  };

  return (
    <Container maxWidth="lg" className="student-page-container" sx={{ padding: "25px", minHeight: "120vh" }}>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Box className="student-box" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '13px',
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            height: '100%',
          }}>
            <Avatar src={student.imageUrl} alt={student.name} sx={{ width: 100, height: 100, marginBottom: '20px' }} />
            <Typography variant="h2" gutterBottom sx={{ color: 'brown' }}>{student.name}</Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>{student.course}</Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>Branch: {student.branch}</Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>Year: {student.year}</Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>Email: {student.email}</Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>Phone: {student.phone}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box className="marks-chart" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '13px',
            borderRadius: '8px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white',
            height: '100%',
          }}>
            {/* <Bar data={marksData} options={options} /> */}
          </Box>
        </Grid>
      </Grid>
      {/* Remaining UI code for marks and profile details */}
    </Container>
  );
}

export default StudentPage;
