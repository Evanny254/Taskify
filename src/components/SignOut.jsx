import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      localStorage.removeItem('accessToken');
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      localStorage.removeItem('accessToken');
      navigate('/signin');
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOut;
