import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user, onSignOut }) => {
  
return (
    <div className='container'>
      <div>Welcome to Taskify</div>;
      <Link to="/tasklist">View Tasks</Link>
      <Link to="/projectlist">View Projects</Link>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
