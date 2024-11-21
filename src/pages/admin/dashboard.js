import React, { useState, useEffect } from "react";
import { LinearProgress, Grid, Paper, Typography, Card, CardContent, Box } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";
import "./dashboard.css";
import Navbar2 from "../../components/navbar2";
import Footer from "../../components/footer";

const Dashboard = () => {
  const [dataCounts, setDataCounts] = useState({ students: 0, faculty: 0 });
  const [branches, setBranches] = useState([]);
  const [quizResults, setQuizResults] = useState([
    { name: "Student 1", progress: 70 },
    { name: "Student 2", progress: 85 },
    { name: "Student 3", progress: 60 },
    { name: "Student 4", progress: 95 },
    { name: "Student 5", progress: 50 },
  ]);
  const [studentData, setStudentData] = useState([]);
  const [branchCounts, setBranchCounts] = useState({});
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    fetchDataCounts();
    fetchBranches();
    fetchStudentData();
    fetchBranchCounts();
  }, []);

  const fetchDataCounts = async () => {
    try {
      const response = await axios.get("http://localhost:7000/getCounts?branch=All", {
        headers: { Authorization: `Bearer ${token}`, 'content-Type' : 'application/json' }
      });
      setDataCounts(response.data);
    } catch (error) {
      console.error("Error fetching data counts:", error);
    }
  };

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

  const fetchStudentData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/students", {
        headers: { Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json' }
      });
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchBranchCounts = async () => {
    try {
      const countsPromises = branches.map(async (branch) => {
        const response = await axios.get(`http://localhost:7000/getCounts?branch=${branch.name}`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        return { branchName: branch.name, counts: response.data };
      });

      const allCounts = await Promise.all(countsPromises);
      const countsMap = {};
      allCounts.forEach(({ branchName, counts }) => {
        countsMap[branchName] = counts;
      });
      setBranchCounts(countsMap);
    } catch (error) {
      console.error("Error fetching branch counts:", error);
    }
  };

  const pieData = [
    { name: "Students", value: dataCounts.students },
    { name: "Faculty", value: dataCounts.faculty },
  ];

  const lineChartData = [
    { name: "Student 1", totalFee: 200000 },
    { name: "Student 2", totalFee: 220000 },
    { name: "Student 3", totalFee: 240000 },
    { name: "Student 4", totalFee: 250000 },
    { name: "Student 5", totalFee: 230000 },
  ];

  const colors = ["#00FF00", "#FF1493"]; 

  return (
    <Box id="dashboard-container">
      <Box className="dashboard-content">
        <Navbar2 />
        <Grid container spacing={3} sx={{marginTop:'70px'}}>

          {/* Summary Cards */}
          <Grid item xs={12} sm={6} md={4}>
            <Card id="total-students-card">
              <CardContent>
                <Typography variant="h6" className="neon-text">Total Students</Typography>
                <Typography variant="h4" className="neon-text">{dataCounts.students}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card id="total-faculty-card">
              <CardContent>
                <Typography variant="h6" className="neon-text">Total Faculty</Typography>
                <Typography variant="h4" className="neon-text">{dataCounts.faculty}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card id="total-branches-card">
              <CardContent>
                <Typography variant="h6" className="neon-text">Total Branches</Typography>
                <Typography variant="h4" className="neon-text">{branches.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Paper id="pie-chart-container">
              <Typography variant="h6" align="center" className="neon-text">
                Students vs Faculty
              </Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </Paper>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper id="branch-wise-students">
              <Typography variant="h6" align="center" className="neon-text">
                Branch-wise Students
              </Typography>
              <BarChart
                width={600}
                height={300}
                data={branches.map((branch) => ({
                  name: branch.name,
                  students: branchCounts[branch.name]?.students || 0,  // Get student count for each branch from `branchCounts`
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#00FF00" />
              </BarChart>
            </Paper>
          </Grid>


          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Paper id="line-chart-container">
              <Typography variant="h6" align="center" className="neon-text">
                Total Fee vs Students
              </Typography>
              <LineChart width={600} height={300} data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalFee" stroke="#00FF00" />
              </LineChart>
            </Paper>
          </Grid>

          {/* Quiz Progress */}
          <Grid item xs={12}>
            <Box id="quiz-progress-container">
              <Typography variant="h6" align="center" className="neon-text" sx={{ marginBottom: 2 }}>
                Quiz Progress
              </Typography>
              {quizResults.map((student, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1" className="neon-text" sx={{ marginBottom: 1 }}>
                    {student.name}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={student.progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#3e3e3e", 
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#00FF00", 
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;