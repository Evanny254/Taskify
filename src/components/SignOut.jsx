import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  FaSignOutAlt} from 'react-icons/fa';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      if (!access_token || !refresh_token) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/signin');
        return;
      }

      const response = await fetch('https://taskify-backend-5v37.onrender.com/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`, 
        },
        body: JSON.stringify({ refresh_token }), 
      });

      if (response.ok) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        alert('User Signed Out Successfully')
        navigate('/signin');
      } else {
        const data = await response.json();
        console.error('Error signing out:', data);
      
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/signin');
    }
  };

  return (
    <button onClick={handleSignOut} className="text-white hover:text-cyan-200">
      <FaSignOutAlt className="text-2xl" />
    </button>
  );
};

export default SignOut;
