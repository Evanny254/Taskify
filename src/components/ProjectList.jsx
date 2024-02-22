import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch('https://taskify-backend-btvr.onrender.com/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const fetchComments = (projectId) => {
    fetch(`https://taskify-backend-btvr.onrender.com/${projectId}/comments`)
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
    fetch(`hhttps://taskify-backend-btvr.onrender.com/${projectId}/comments`, {
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

  const handleDeleteComment = (projectId, commentId) => {
    fetch(`https://taskify-backend-btvr.onrender.com/${projectId}/comments/${commentId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setComments(prevState => ({
          ...prevState,
          [projectId]: prevState[projectId].filter(comment => comment.id !== commentId)
        }));
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleDeleteProject = (projectId) => {
    fetch(`https://taskify-backend-btvr.onrender.com/${projectId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProjects(projects.filter(project => project.id !== projectId));
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
  };

  return (
    <div className='container'>
      <h2>Project List</h2>
      {projects.map(project => (
        <div key={project.id} style={{ marginBottom: '20px', border: '1px solid black', padding: '10px' }}>
          <h3 onClick={() => handleProjectClick(project.id)} style={{ cursor: 'pointer' }}>{project.name}</h3>
          {selectedProject === project.id &&
            <div>
              <p>Description: {project.description}</p>
              <p>Start Date: {project.start_date}</p>
              <p>End Date: {project.end_date}</p>
              <h4>Tasks:</h4>
              <ul>
                {project.tasks.map(task => (
                  <li key={task.id}>{task.name}</li>
                ))}
              </ul>
              <h4>Comments:</h4>
              {comments[project.id] && comments[project.id].map(comment => (
                <div key={comment.id}>
                  <p>{comment.comment}</p>
                  <button onClick={() => handleDeleteComment(project.id, comment.id)}>Delete Comment</button>
                </div>
              ))}
              <input type="text" value={commentInput} onChange={handleCommentChange} />
              <button onClick={() => handleCommentSubmit(project.id)}>Add Comment</button>
              <button onClick={() => handleDeleteProject(project.id)}>Delete Project</button>
              <Link to={`/updateproject/${project.id}`}>
                <button>Update Project</button>
              </Link>
            </div>
          }
        </div>
      ))}
      <Link to="/projectform">Create New Project</Link>
    </div>
  );
};

export default ProjectList;

