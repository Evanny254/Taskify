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


  return (
    <div className='container'>
      <h2>Account Details</h2>
      {!editMode ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio}</p>
          <button onClick={() => setEditMode(true)}>Edit Details</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AccountDetails;

