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
<<<<<<< HEAD
import AuthHandler from './components/AuthHandler'; // Import the AuthHandler component
=======
>>>>>>> e27ded3f61776f5228646a76c1cdd624918ab51d
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
<<<<<<< HEAD
        const accessToken = localStorage.getItem('access_token'); // Retrieve the token from local storage
        const response = await fetch('https://taskify-8h37.onrender.com/user', {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Include the token in the Authorization header
=======
        const accessToken = localStorage.getItem('access_token'); 
        const response = await fetch('https://taskify-backend-btvr.onrender.com/user', {
          headers: {
            'Authorization': `Bearer ${accessToken}` 
>>>>>>> e27ded3f61776f5228646a76c1cdd624918ab51d
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

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
        <Route path="/home" element={user ? <AuthHandler user={user}><Home user={user} /></AuthHandler> : <Navigate to="/signin" />} />
        <Route path="/tasklist" element={user ? <AuthHandler user={user}><TaskList /></AuthHandler> : <Navigate to="/signin" />} />
        <Route path="/projectlist" element={user ? <AuthHandler user={user}><ProjectList /></AuthHandler> : <Navigate to="/signin" />} />
        <Route path="/taskform" element={user ? <AuthHandler user={user}><TaskForm /></AuthHandler> : <Navigate to="/signin" />} />
        <Route path="/projectform" element={user ? <AuthHandler user={user}><ProjectForm /></AuthHandler> : <Navigate to="/signin" />} />
        <Route path="/account" element={user ? <AuthHandler user={user}><AccountDetails user={user} /></AuthHandler> : <Navigate to="/signin" />} />
        <Route path="*" element={<Navigate to="/signin" />} /> {/* Catch-all route to redirect to sign-in */}
=======
        <Route path="/home" element={<Home />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/projectlist" element={<ProjectList />} />
>>>>>>> e27ded3f61776f5228646a76c1cdd624918ab51d
      </Routes>
    </Router>
  );
}

export default App;