import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { checkAuth } from '../auth';

const ProtectedRoute = ({ element }) => {
  let validateAuth = checkAuth()
  return validateAuth ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
