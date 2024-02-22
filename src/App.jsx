import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import TaskList from "./components/TaskList";
import ProjectList from "./components/ProjectList";
import TaskForm from "./components/TaskForm";
import ProjectForm from "./components/ProjectForm";
import AccountDetails from "./components/AccountDetails";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch(
          "https://taskify-backend-btvr.onrender.com/user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/projectlist" element={<ProjectList />} />
      </Routes>
    </Router>
  );
}

export default App;
