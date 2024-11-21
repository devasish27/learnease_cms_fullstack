import Footer from '../../components/footer';
import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import Navbar1 from '../../components/navbar1';
import "./about.css";

const About = () => {
  return (
    <Box id="about-container">
      <Navbar1 />
      <Container id="about-container">
        {/* Hero Section */}
        <section id="hero-section">
          <Typography variant="h3" component="h1" className="hero-title">
            About Us
          </Typography>
          <Typography variant="h6" component="p" className="hero-description">
            We are a team of passionate individuals committed to delivering excellence and driving innovation. 
            Our mission is to make a difference in the lives of our users by providing exceptional products and services.
          </Typography>
        </section>

        {/* Our Story Section */}
        <section id="our-story-section" style={{ marginTop:'20px'}}>
          <Typography variant="h4" component="h2" className="section-title">
            Our Story
          </Typography>
          <Typography variant="body1" className="section-description">
            Founded in 2024, we have grown into a dedicated team of professionals who strive to bring innovation to 
            every project. With a commitment to quality and continuous improvement, we aim to exceed expectations and 
            create meaningful experiences for our users.
          </Typography>
        </section>

        {/* Team Section */}
        <section id="team-section" style={{marginTop:'30px'}}>
          <Typography variant="h4" component="h2" className="section-title">
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop:'20px'}}>
            {[
              { name: 'Devasish Sai', title: 'CEO', branch: 'AI&ML', image: 'girl1' },
              { name: 'Surya Venkat', title: 'CTO', branch: 'AI&ML', image: 'boy2' },
              { name: 'Prasanna', title: 'Developer', branch: 'AI&ML', image: 'boy3' },
              { name: 'Bindhu', title: 'CTO', branch: 'CSE', image: 'boy2' },
              { name: 'Jay Vardam', title: 'Developer', branch: 'CSE', image: 'boy3' },
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} className="team-card-grid">
                <Card className="team-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={member.image}
                    alt={member.name}
                    className="team-card-image"
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" className="team-card-name">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" className="team-card-branch">
                      {member.branch}
                    </Typography>
                    <Typography variant="subtitle1" className="team-card-title">
                      {member.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* Values Section */}
        <section id="values-section" style={{marginTop:'40px'}}>
          <Typography variant="h4" component="h2" className="section-title">
            Our Values
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { value: 'Innovation', description: 'We strive to stay ahead of the curve, fostering a culture of creativity and curiosity.' },
              { value: 'Integrity', description: 'We believe in honesty, transparency, and accountability in all that we do.' },
              { value: 'Excellence', description: 'We are committed to delivering outstanding results with each and every project.' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} className="values-card-grid">
                <Card className="values-card">
                  <CardContent>
                    <Avatar className="values-avatar">
                      {item.value.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" component="h3" className="values-title">
                      {item.value}
                    </Typography>
                    <Typography variant="body2" className="values-description">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
      <Footer />
    </Box>
  );
};

export default About;
