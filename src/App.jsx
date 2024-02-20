import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import TaskList from './components/TaskList';
import ProjectList from './components/ProjectList';
import TaskForm from './components/TaskForm';
import ProjectForm from './components/ProjectForm';
import AccountDetails from './components/AccountDetails';
import AuthHandler from './components/AuthHandler'; // Import the AuthHandler component
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('access_token'); // Retrieve the token from local storage
        const response = await fetch('https://taskify-8h37.onrender.com/user', {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Include the token in the Authorization header
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);
