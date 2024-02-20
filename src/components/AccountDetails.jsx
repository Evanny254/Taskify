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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the formData to the server
    console.log('Submitting form:', formData);
    // After submitting, you can switch back to view mode
    setEditMode(false);
  };

  if (!user) {
    return <div>Loading...</div>; // You can render a loading indicator while fetching user details
  }

