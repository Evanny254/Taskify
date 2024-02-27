import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Home from './components/Home';
import TaskList from './components/TaskList';
import ProjectList from './components/ProjectList';
import TaskForm from './components/TaskForm';
import ProjectForm from './components/ProjectForm';
import AccountDetails from './components/AccountDetails';
import About from './components/About';

import './App.css';

function App() {

  return (
    <Router>
      <div>
      <Navbar/>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/projectlist" element={<ProjectList />} />
        <Route path="/projectform" element={<ProjectForm />} />
        <Route path="/account" element={<AccountDetails />} />
        <Route path="/signout" element={<SignOut />} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;
