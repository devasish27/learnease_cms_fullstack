import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
//import { useAuth } from './AuthContext'; 

const LogoutButton = () => {
  const navigate = useNavigate();
 // const { logout } = useAuth();

  const logout = () => {
    localStorage.clear()
      navigate('/');
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={logout}
      sx={{
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#f44336',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#d32f2f',
        },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
