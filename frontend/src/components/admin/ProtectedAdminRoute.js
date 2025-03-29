import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== 'admin') return <Navigate to="/" replace />;
    return children;
  } catch (err) {
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedAdminRoute;