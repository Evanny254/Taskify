import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
const [selectedTask, setSelectedTask] = useState(null);
const [commentInput, setCommentInput] = useState('');
const [comments, setComments] = useState({});
useEffect(() => {
    // Fetch tasks from the specified API
    fetch('https://taskify-8h37.onrender.com/tasks')
      .then(response => response.json())
      .then(data => {
        // Update the 'tasks' state with the fetched data
        setTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);
  

