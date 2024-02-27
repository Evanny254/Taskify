import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  FaSignOutAlt} from 'react-icons/fa';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!accessToken || !refreshToken) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/signin');
        return;
      }

      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
        body: JSON.stringify({ refreshToken }), 
      });

      if (response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('User Signed Out Successfully')
        navigate('/signin');
      } else {
        const data = await response.json();
        console.error('Error signing out:', data);
      
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
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
