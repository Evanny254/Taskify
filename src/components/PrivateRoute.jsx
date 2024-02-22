// PrivateRoute.js
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ path }) => {
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = !!token;

  const protectedRoutes = ['/home'];

  if (protectedRoutes.includes(path) && !isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not authenticated
    return <Navigate to="/signin" />;
  }

  // If authenticated, set the authorization header for future requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // Render the protected content
  return <Outlet />;
};

export default PrivateRoute;