import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, children }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const role = JSON.parse(localStorage.getItem('role'));

  // If there's no token or the role doesn't match allowed roles, redirect to login
  if (!token || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
