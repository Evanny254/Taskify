import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user, onSignOut }) => {
  if (!user) {
    return <div>Welcome to Taskify</div>; 
  }
return (
    <div className='container'>
      <h1>Welcome, {user.username}!</h1>
      <Link to="/tasklist">View Tasks</Link>
      <Link to="/projectlist">View Projects</Link>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
