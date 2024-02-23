import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [editedProject, setEditedProject] = useState(null);
  const [tasksOptions, setTasksOptions] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(
          'https://taskify-backend-btvr.onrender.com/projects',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch(
          "https://taskify-backend-btvr.onrender.com/tasks",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasksOptions(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditProject = (project) => {
    setEditedProject(project);
  };

  const handleUpdateProject = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `https://taskify-backend-btvr.onrender.com/projects/${editedProject.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProject),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editedProject.id ? editedProject : project
        )
      );
      setEditedProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const fetchComments = async (projectId) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `https://taskify-backend-btvr.onrender.com/comments`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
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

  const handleCommentSubmit = (projectId, taskId, commentInput ) => {
    fetch(`https://taskify-backend-btvr.onrender.com/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({ text: commentInput, project_id: projectId, task_id:taskId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit comment');
        }
        return response.json();
      })
      .then((data) => {
        setComments((prev_comments)=> [...prev_comments, data]);
        setCommentInput('');
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
  };

  const handleDeleteComment = (commentId) => {
    fetch(`https://taskify-backend-btvr.onrender.com/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then(() => {
        const updated_comments= comments.filter((comment) => comment.id !== commentId)
        setComments(updated_comments);
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleDeleteProject = (projectId) => {
    fetch(`https://taskify-backend-btvr.onrender.com/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then(() => {
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
      });
  };

  return (
    <div className='container mx-auto mt-10 px-4'>
      <h2 className='text-3xl font-semibold text-cyan-800 mb-6'>Project List</h2>
      {projects.map((project) => (
        <div key={project.id} className='border border-cyan-500 rounded-lg p-4 mb-6'>
          <h3
            className='text-xl font-semibold text-cyan-800 cursor-pointer'
            onClick={() => handleProjectClick(project.id)}
          >
            {project.name}
          </h3>
          {selectedProject === project.id && (
            <div className='mt-4'>
              <p className='text-gray-700'>Description: {project.description}</p>
              <p className='text-gray-700'>Start Date: {project.start_date}</p>
              <p className='text-gray-700'>End Date: {project.end_date}</p>
              <h4 className='text-lg font-semibold text-cyan-800'>Tasks:</h4>
              <ul className='list-disc list-inside text-gray-700'>
                {tasksOptions.map(task => (
                  <li key={task.id}>{task.title}
                  <div className='flex mt-2'>
                <input
                  type='text'
                  value={commentInput}
                  onChange={handleCommentChange}
                  placeholder='Add a comment...'
                  className='border border-cyan-500 rounded p-2 w-full'
                />
                <button
                  onClick={() => handleCommentSubmit(project.id, task.id, commentInput)}
                  className='bg-cyan-500 text-white font-semibold px-4 py-2 rounded ml-2'
                >
                  Submit
                </button>
              </div>
                  </li>
                ))}
              </ul>
              <h4 className='text-lg font-semibold text-cyan-800 mt-4'>Comments:</h4>
              {comments.map((comment) => (
                  <div key={comment.id} className='mb-2'>
                    <p className='text-gray-700'>{comment.text}</p>
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete Comment
                    </button>
                  </div>
                ))}
              
              <button
                onClick={() => handleDeleteProject(project.id)}
                className='bg-red-500 text-white font-semibold px-4 py-2 rounded mt-2'
              >
                Delete Project
              </button>
              <button
                onClick={() => handleEditProject(project)}
                className='bg-gray-500 text-white font-semibold px-4 py-2 rounded mt-2 ml-2'
              >
                Edit Project
              </button>
              {editedProject && editedProject.id === project.id && (
                <div className='mt-4'>
                  <h3 className='text-lg font-semibold mb-2'>
                    Edit Project Details
                  </h3>
                  <Formik
                    initialValues={editedProject}
                    enableReinitialize
                    onSubmit={(values) => {
                      setEditedProject(values);
                      handleUpdateProject();
                    }}
                  >
                    <Form>
                      <div className='mb-4'>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                          Name
                        </label>
                        <Field
                          type='text'
                          id='name'
                          name='name'
                          className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500'
                        />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                          Description
                        </label>
                        <Field
                          as='textarea'
                          id='description'
                          name='description'
                          rows='3'
                          className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500'
                        />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor='start_date' className='block text-sm font-medium text-gray-700'>
                          Start Date
                        </label>
                        <Field
                          type='date'
                          id='start_date'
                          name='start_date'
                          className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500'
                        />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor='end_date' className='block text-sm font-medium text-gray-700'>
                          End Date
                        </label>
                        <Field
                          type='date'
                          id='end_date'
                          name='end_date'
                          className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500'
                        />
                      </div>
                      <div className='mb-4'>
    <label htmlFor='tasks' className='block text-sm font-medium text-gray-700'>
      Tasks
    </label>
    <Field
      as='select'
      id='tasks'
      name='tasks'
      multiple
      className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500'
    >
      {tasksOptions.map(task => (
        <option key={task.id} value={task.id}>
          {task.name}
        </option>
      ))}
    </Field>
  </div>
                      <button
                        type='submit'
                        className='bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      >
                        Save Changes
                      </button>
                    </Form>
                  </Formik>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <Link to='/projectform' className='text-cyan-500 hover:underline'>
        Create New Project
      </Link>
    </div>
  );
};

export default ProjectList;
