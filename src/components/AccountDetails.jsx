import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';

const AccountDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token'); 
    fetch('https://taskify-backend-btvr.onrender.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`  
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>; // You can render a loading indicator while fetching user details
  }

  return (
    <div className='container'>
      <h2>Account Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
      <SignIn setUser={setUser} />
    </div>
  );
};

export default AccountDetails;
