import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user, onSignOut }) => {
  if (!user) {
    return <div>Welcome to Taskify</div>; 
  }
