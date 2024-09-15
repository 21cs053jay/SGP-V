import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // If still loading the authentication state, return nothing or a loading spinner
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading spinner if you want
  }

  // If authenticated, render the children (protected component)
  // If not, redirect to the login page
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;
