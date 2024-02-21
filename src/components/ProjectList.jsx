import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch('https://taskify-8h37.onrender.com/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const fetchComments = (projectId) => {
    fetch(`https://taskify-8h37.onrender.com/projects/${projectId}/comments`)
      .then(response => response.json())
      .then(data => {
        setComments(prevState => ({
          ...prevState,
          [projectId]: data
        }));
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleProjectClick = (projectId) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
    if (selectedProject !== projectId) {
      fetchComments(projectId);
    }
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = (projectId) => {
    fetch(`https://taskify-8h37.onrender.com/projects/${projectId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: commentInput })
    })
      .then(response => response.json())
      .then(data => {
        setComments(prevState => ({
          ...prevState,
          [projectId]: [...prevState[projectId], data]
        }));
        setCommentInput('');
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
      });
  };
