import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { checkAuth } from '../auth';

const ProtectedRoute = ({ element }) => {
  return checkAuth() ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
