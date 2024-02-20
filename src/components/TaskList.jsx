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
  const fetchComments = (taskId) => {
    // Fetch comments for a specific task
    fetch(`https://taskify-8h37.onrender.com/tasks/${taskId}/comments`)
      .then(response => response.json())
      .then(data => {
        // Update the 'comments' state with the fetched data
        setComments(prevState => ({
          ...prevState,
          [taskId]: data
        }));
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleTaskClick = (taskId) => {
    if (selectedTask === taskId) {
      setSelectedTask(null);
    } else {
      // Set the selected task and fetch comments for it
      setSelectedTask(taskId);
      fetchComments(taskId);
    }
  };

  const handleCommentChange = (e) => {
    // Update the 'commentInput' state as the user types
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = (taskId) => {
    // Send a POST request to add a new comment to a specific task
    fetch(`https://taskify-8h37.onrender.com/tasks/${taskId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: commentInput })
    })
      .then(response => response.json())
      .then(data => {
        // Update the 'comments' state with the new comment
        setComments(prevState => ({
          ...prevState,
          [taskId]: [...prevState[taskId], data]
        }));
        // Clear the comment input field
        setCommentInput('');
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
      });
  };

  const handleDeleteComment = (taskId, commentId) => {
    // Send a DELETE request to remove a comment from a specific task
    fetch(`https://taskify-8h37.onrender.com/tasks/${taskId}/comments/${commentId}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Update the 'comments' state by removing the deleted comment
        setComments(prevState => ({
          ...prevState,
          [taskId]: prevState[taskId].filter(comment => comment.id !== commentId)
        }));
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleDeleteTask = (taskId) => {
    // Send a DELETE request to remove a task
    fetch(`https://taskify-8h37.onrender.com/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Update the 'tasks' state by removing the deleted task
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleUpdateTask = (taskId, updatedTaskData) => {
    // Send a PUT request to update a task with new data
    fetch(`https://taskify-8h37.onrender.com/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTaskData)
    })
      .then(() => {
        // Update the 'tasks' state with the updated task data
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, ...updatedTaskData };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  
  
  
  
  
  
  
  
  

