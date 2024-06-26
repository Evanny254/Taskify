import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [editedProject, setEditedProject] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch(
          "https://taskify-backend-5v37.onrender.com/projects",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleEditProject = (project) => {
    setEditedProject(project);
  };

  const handleUpdateProject = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `https://taskify-backend-5v37.onrender.com/projects/${editedProject.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editedProject,
            name: editedProject.name,
            description: editedProject.description,
            start_date: formatDate(editedProject.start_date),
            end_date: formatDate(editedProject.end_date),
          }),
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
      setErrorMessage({
        message: "Project updated successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating project:", error);
      setErrorMessage({
        message: "Failed to update project. Please try again later.",
        type: "error",
      });
    }
  };

  const fetchComments = async (projectId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `https://taskify-backend-5v37.onrender.com/projectcomments/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handleProjectClick = (projectId) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
    if (selectedProject !== projectId) {
      fetchComments(projectId);
    }
  };

  const handleCommentSubmit = (projectId, commentInput) => {
    fetch(`https://taskify-backend-5v37.onrender.com/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        text: commentInput,
        project_id: projectId,
        task_id: null,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit comment");
        }
        return response.json();
      })
      .then((data) => {
        setComments((prev_comments) => [...prev_comments, data]);
        setCommentInput("");
        setErrorMessage({
          message: "Comment added successfully",
          type: "success",
        });
        setTimeout(() => {
          setErrorMessage(""); // Clearing error message after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
        setErrorMessage({
          message: "Failed to add comment. Please try again later.",
          type: "error",
        });
      });
  };

  const handleDeleteComment = (commentId) => {
    fetch(`https://taskify-backend-5v37.onrender.com/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then(() => {
        const updated_comments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updated_comments);
        setErrorMessage({
          message: "Comment deleted successfully",
          type: "success",
        });
        setTimeout(() => {
          setErrorMessage(""); // Clearing error message after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        setErrorMessage({
          message: "Failed to delete comment. Please try again later.",
          type: "error",
        });
      });
  };

  const handleDeleteProject = (projectId) => {
    fetch(`https://taskify-backend-5v37.onrender.com/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then(() => {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
        setErrorMessage({
          message: "Project deleted successfully",
          type: "success",
        });
        setTimeout(() => {
          setErrorMessage(""); // Clearing error message after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        setErrorMessage({
          message: "Failed to delete project. Please try again later.",
          type: "error",
        });
      });
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold text-cyan-800 mb-6">
        Project List
      </h2>
      {errorMessage && (
        <div
          className={
            errorMessage.type === "success" ? "text-green-700" : "text-red-700"
          }
        >
          {errorMessage.message}
        </div>
      )}

      {projects.map((project) => (
        <div
          key={project.id}
          className="border border-cyan-500 rounded-lg p-4 mb-6"
        >
          <h3
            className="text-xl font-semibold text-cyan-800 cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            {project.name}
          </h3>
          {selectedProject === project.id && (
            <div className="mt-4">
              <p className="text-gray-700">
                Description: {project.description}
              </p>
              <p className="text-gray-700">
                Start Date: {formatDate(project.start_date)}
              </p>
              <p className="text-gray-700">
                End Date: {formatDate(project.end_date)}
              </p>
              <h4 className="text-lg font-semibold text-cyan-800 mt-4">
                Comments:
              </h4>

              {comments.map((comment) => (
                <div key={comment.id} className="mb-2">
                  <p className="text-gray-700">{comment.text}</p>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              <Formik
                initialValues={{ comment: "" }}
                onSubmit={(values, { resetForm }) => {
                  handleCommentSubmit(project.id, values.comment);
                  resetForm();
                }}
              >
                <Form className="flex mt-2 bg-gray-100 rounded-lg p-2">
                  <Field
                    type="text"
                    name="comment"
                    className="border border-gray-300 rounded p-2 w-full focus:border-cyan-500 focus:outline-none"
                    placeholder="Add a comment..."
                  />
                  <button
                    type="submit"
                    className="bg-cyan-500 text-white font-semibold px-4 py-2 rounded ml-2 hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-cyan-300"
                  >
                    Add Comment
                  </button>
                </Form>
              </Formik>

              <button
                onClick={() => handleDeleteProject(project.id)}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded mt-2"
              >
                Delete Project
              </button>
              <button
                onClick={() => handleEditProject(project)}
                className="bg-gray-500 text-white font-semibold px-4 py-2 rounded mt-2 ml-2"
              >
                Edit Project
              </button>
              {editedProject && editedProject.id === project.id && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
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
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          value={editedProject.name}
                          onChange={(event) =>
                            setEditedProject({
                              ...editedProject,
                              name: event.target.value,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <Field
                          type="text"
                          id="description"
                          name="description"
                          value={editedProject.description}
                          onChange={(event) =>
                            setEditedProject({
                              ...editedProject,
                              description: event.target.value,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="start_date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Date
                        </label>
                        <DatePicker
                          id="start_date"
                          name="start_date"
                          selected={new Date(editedProject.start_date)}
                          onChange={(date) =>
                            setEditedProject({
                              ...editedProject,
                              start_date: date,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="end_date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          End Date
                        </label>
                        <DatePicker
                          id="end_date"
                          name="end_date"
                          selected={new Date(editedProject.end_date)}
                          onChange={(date) =>
                            setEditedProject({
                              ...editedProject,
                              end_date: date,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    </div>
  );
};

export default ProjectList;
