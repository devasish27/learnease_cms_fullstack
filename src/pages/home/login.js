import React, { useState, useEffect } from 'react';
import { Container, InputAdornment,IconButton,TextField, Button, Typography, Box, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import {VisibilityOff,Visibility,} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import UpdateIcon from '@mui/icons-material/Update';
// import GoogleIcon from '@mui/icons-material/Google'; 
// import FacebookIcon from '@mui/icons-material/Facebook'; 
import axios from 'axios';
import './login.css';
import logocms from '../assests2/logocms-new.png';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [loginError, setLoginError] = useState("");
  const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false);
    const [resetStage, setResetStage] = useState("email"); 
    const [otp, setOtp] = useState("");
    const [emailForOtp, setEmailForOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetError, setResetError] = useState("");
 
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const changevalue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleOpenForgotPassword = () => {
    setForgotPasswordDialog(true);
  };

  const handleCloseForgotPassword = () => {
    setForgotPasswordDialog(false);
    setResetStage("email");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setOtpError("");
    setResetError("");
  };

  const handleSendOtp = async () => {
        try {
          const res = await axios.post("http://localhost:7000/send-otp", { email: emailForOtp });
          if (res.status === 200) {
            setResetStage("otpAndPassword");
          }
        } catch (error) {
          setLoginError(error.response?.data?.message || "Failed to send OTP. Please try again.");
        }
      };
    
      const handleVerifyAndResetPassword = async () => {
        if (otp.length !== 6) {
          setOtpError("OTP must be 6 digits");
          return;
        }
        if (newPassword !== confirmPassword) {
          setResetError("Passwords do not match.");
          return;
        }
    
        try {
          await axios.post("http://localhost:7000/reset-password", { email: emailForOtp, otp, newPassword }).then((res)=>{
            if (res.status === 200) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Password updated",
                showConfirmButton: false,
                timer: 1500
              });
            setForgotPasswordDialog(false);
            navigate('/');
          }});
          
        } catch (error) {
          setResetError(error.response?.data?.message || "Failed to reset password. Please try again.");
        }
      };


  const submit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordMinLength = 6;
      
        let hasError = false;
        const newErrors = { email: false, password: false };
        if (!data.email || !emailRegex.test(data.email)) {
          newErrors.email = true;
          hasError = true;
        }
        if (!data.password || data.password.length < passwordMinLength) {
          newErrors.password = true;
          hasError = true;
        }
      
        setErrors(newErrors);
        setLoginError(""); // Reset login error message on each login attempt
      
        if (!hasError) {
          try {
            await axios.post("http://localhost:7000/login",data).then((res) => {
           
              if (res.status === 200) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "welocome to learnease",
                  showConfirmButton: false,
                  timer: 1500
                });
                if (res.data.role==="admins"){
                  
                  navigate('/home2');
                  
                }
                else if (res.data.role==="students"){
                  navigate('/stuhome');
                  
                }
                else if (res.data.role==="hod"){
                  navigate('/hodhome');
                  
                }
                else{
                  navigate('/fachome');
                  
                }
                localStorage.setItem('token', JSON.stringify(res.data.token));
                localStorage.setItem('role', JSON.stringify(res.data.role));
                
              } 
              else if(res.status===202) {
           
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `${res.data["message"]}`,
                });
            }
            })
           
            // const res = await axios.post(
            //   "http://localhost:7000/login", 
            //   data, 
              
            // );
            // localStorage.setItem('loginStatus', res.data.loginStatus);
            // localStorage.setItem('token', res.data.token);
            // navigate('/');
            
          } catch (error) {
            Swal.fire({
              title: "The Internet?",
              text: "That thing is still around?",
              icon: "question"
            });
            setLoginError(error.response?.data?.message || "An error occurred. Please try again.");
          }
        }
      };
  

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const role = JSON.parse(localStorage.getItem('role'));
  
    if (token && role) {
      if (role === "admins") {
        navigate('/home2');
      } else if (role === "students") {
        navigate('/stuhome');
      } else if (role === "faculty") {
        navigate('/fachome');
      } else if (role === "hod") {
        navigate('/hodhome');
      }
    }
  }, [navigate]);



  return (
    <Container maxWidth="lg" className="login-container">
      <Grid container spacing={2} className="login-grid">
        <Grid item xs={12} md={6} className="login-left-column">
          <Box className="login-left-box">
            {[{ icon: <CheckCircleIcon />, title: "Adaptable performance", description: "Effortlessly adjusts to your needs, boosting efficiency." },
              { icon: <BuildIcon />, title: "Built to last", description: "Unmatched durability with a lasting investment." },
              { icon: <ThumbUpIcon />, title: "Great user experience", description: "Intuitive, easy-to-use interface." },
              { icon: <UpdateIcon />, title: "Innovative functionality", description: "Features that address evolving needs." }
            ].map((feature, index) => (
              <Box key={index} mb={2}>
                {feature.icon}
                <Typography variant="h6" className="login-heading">{feature.title}</Typography>
                <Typography variant="body2" className="login-description">{feature.description}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={6} className="login-right-column">
          <Box className="login-right-box">
            <img src={logocms} alt="Logo" className="login-logo" />
            <Typography variant="h4" className="login-title">Login to LearnEase</Typography>

            {loginError && <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>}

            <TextField
                label="Email Address"
                variant="outlined"
              fullWidth
                 margin="normal"
                type="email"
                 name="email"
              autoComplete="off"
                 required
                error={errors.email}
                helperText={errors.email ? "Please enter a valid email address" : ""}

          onChange={changevalue}
           className="text-field"
        />



        <TextField
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          variant="outlined"
          value={data.password}
          onChange={changevalue}
          fullWidth
          autoComplete="off"
          required
          margin="normal"
          className="text-field"
          error={errors.password}
          helperText={errors.password ? "Password must be at least 6 characters" : ""}
          InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
        />


            <Box display="flex" justifyContent="flex-end" width="100%" mb={2}>
              <Button onClick={handleOpenForgotPassword}>Forgot password?</Button>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(90deg, rgb(41, 125, 186), black)',
              }}
              onClick={submit}
            >
              Login
            </Button>

            {/* <Box className="social-buttons">
            <Button 
                variant="outlined" 
                fullWidth 
                sx={{
                  marginTop: 1,
                  borderColor: '#DB4437',
                  color: '#DB4437',
                  '&:hover': {
                    backgroundColor: '#DB4437',
                    color: '#FFFFFF',
                  },
                }}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>

              <Button 
                variant="outlined" 
                fullWidth 
                sx={{
                  marginTop: 1,
                  borderColor: '#4267B2',
                  color: '#4267B2',
                  '&:hover': {
                    backgroundColor: '#4267B2',
                    color: '#FFFFFF',
                  },
                }}
                startIcon={<FacebookIcon />}
              >
                Sign in with Facebook
              </Button>
              </Box> */}
          </Box>
        </Grid>
      </Grid>

      {/* Forgot Password Dialog */}
      <Dialog 
        open={forgotPasswordDialog} 
        onClose={handleCloseForgotPassword}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{resetStage === "email" ? "Forgot Password" : "Verify OTP and Reset Password"}</DialogTitle>
        <DialogContent>
          {resetStage === "email" ? (
            <TextField
              autoFocus
              margin="dense"
              label="Enter your Email"
              type="email"
              fullWidth
              variant="outlined"
              value={emailForOtp}
              onChange={(e) => setEmailForOtp(e.target.value)}
            />
          ) : (
            <>
              <TextField
                margin="dense"
                label="OTP"
                type="text"
                fullWidth
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={!!otpError}
                helperText={otpError}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="dense"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="dense"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!resetError}
                helperText={resetError}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForgotPassword}>Cancel</Button>
          <Button onClick={resetStage === "email" ? handleSendOtp : handleVerifyAndResetPassword}>
            {resetStage === "email" ? "Send OTP" : "Reset Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoginPage;