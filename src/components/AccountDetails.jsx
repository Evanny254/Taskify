import React, { useState, useEffect } from 'react';

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    
    const accessToken = localStorage.getItem('access_token'); 
    fetch('https://taskify-8h37.onrender.com/user', {
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
        setFormData({
          username: data.username,
          email: data.email,
          bio: data.bio
        });
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);
