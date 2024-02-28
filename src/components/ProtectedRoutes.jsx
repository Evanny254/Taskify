
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes() {
  const token = localStorage.getItem('access_token');

  return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
