import React from 'react';
import { Box, Typography, Container, Grid, Avatar } from '@mui/material';
//import { AccountCircle } from '@mui/icons-material'; // For developer profile icon
import Navbar1 from '../../components/navbar1';
import "./details.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Footer from '../../components/footer';

// Define custom theme
const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5', // Light grey background for the whole page
      paper: '#ffffff', // White background for paper/card elements
    },
    primary: {
      main: '#1976d2', // Custom primary color for buttons and headings
    },
    text: {
      primary: '#333333', // Darker text color for better readability
      secondary: '#555555', // Subtle text for secondary information
    },
  },
  typography: {
    h4: {
      fontWeight: 600, // Make headings bold and prominent
    },
    body2: {
      color: '#666666', // Make body text lighter for secondary info
    },
  },
});

const DetailsPage = () => {
  return (
    <body>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply the theme's background color globally */}
      <Box sx={{ padding: "25px", marginTop: '70px', backgroundColor: 'background.default' }}>
        {/* Navbar and other components */}
      <Navbar1 />
      <Container>
          <Typography variant="h4" color="primary" gutterBottom>Campus Details</Typography>
          <Typography paragraph color="text.secondary">
            LearnEase offers a wide range of courses across various disciplines including AI, Machine Learning, Data Science, and Web Development...
          </Typography>
        
        {/* Developer Details Block */}
        <Box className="developer-container">
  <Typography variant="h4" gutterBottom>Developer Details</Typography>

  <Grid container className="developer-grid">
    {/* Developer 1 */}
    <Grid item className="developer-grid-item">
      <Grid container className="developer-card">
        <Avatar src="/path/to/developer1.jpg" className="developer-avatar" />
        <Box className="developer-info">
          <Typography variant="h6">Devasish Sai Pothumudi</Typography>
          <Typography variant="body2">Email: devasishsai2004@gmail.com</Typography>
          <Typography variant="body2">Branch: CSE-AI&ML</Typography>
          <Typography variant="body2">ID: 21341A4237</Typography>
        </Box>
      </Grid>
    </Grid>

    {/* Developer 2 */}
    <Grid item className="developer-grid-item">
      <Grid container className="developer-card">
        <Avatar src="/path/to/developer2.jpg" className="developer-avatar" />
        <Box className="developer-info">
          <Typography variant="h6">Surya</Typography>
          <Typography variant="body2">Email: developer2@example.com</Typography>
          <Typography variant="body2">Branch: CSE-AI&ML</Typography>
          <Typography variant="body2">ID: 12346</Typography>
        </Box>
      </Grid>
    </Grid>

    <Grid item className="developer-grid-item">
      <Grid container className="developer-card">
        <Avatar src="/path/to/developer1.jpg" className="developer-avatar" />
        <Box className="developer-info">
          <Typography variant="h6">Prasanna</Typography>
          <Typography variant="body2">Email: @gmail.com</Typography>
          <Typography variant="body2">Branch: CSE-AI&ML</Typography>
          <Typography variant="body2">ID: 21341A4237</Typography>
        </Box>
      </Grid>
    </Grid>

    {/* Developer 2 */}
    <Grid item className="developer-grid-item">
      <Grid container className="developer-card">
        <Avatar src="/path/to/developer2.jpg" className="developer-avatar" />
        <Box className="developer-info">
          <Typography variant="h6">Hima bindu</Typography>
          <Typography variant="body2">Email: deve4@example.com</Typography>
          <Typography variant="body2">Branch: CSE-AI&ML</Typography>
          <Typography variant="body2">ID: 12346</Typography>
        </Box>
      </Grid>
    </Grid>
    

    {/* Developer 5 */}
    <Grid item className="developer-grid-item-full">
      <Grid container className="developer-card">
        <Avatar src="/path/to/developer5.jpg" className="developer-avatar" />
        <Box className="developer-info">
          <Typography variant="h6">Jay Vardan</Typography>
          <Typography variant="body2">Email: developer5@example.com</Typography>
          <Typography variant="body2">Branch: CSE</Typography>
          <Typography variant="body2">ID: 12349</Typography>
        </Box>
      </Grid>
    </Grid>
  </Grid>
</Box>

      </Container>
    </Box>
    
    </ThemeProvider>
    <Footer />
    </body>
  );
};

export default DetailsPage;