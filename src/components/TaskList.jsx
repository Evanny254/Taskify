import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch("https://taskify-backend-5v37.onrender.com/projects", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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

    const accessToken = localStorage.getItem("access_token");
    fetchTasks(accessToken);
  }, []);

  const fetchTasks = async (accessToken) => {
    try {
      const response = await fetch("https://taskify-backend-5v37.onrender.com/tasks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchComments = async (taskId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(`https://taskify-backend-5v37.onrender.com/comments/${taskId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleTaskClick = (taskId) => {
    if (selectedTask === taskId) {
      setSelectedTask(null);
    } else {
      setSelectedTask(taskId);
      const accessToken = localStorage.getItem("access_token");
      fetchComments(taskId);
    }
  };

  const handleCommentSubmit = async (taskId, comment) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(`https://taskify-backend-5v37.onrender.com/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
          project_id: null,
          task_id: taskId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      const data = await response.json();
      setComments((prevState) => [...prevState, data]); // Append new comment to the existing comments array
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await fetch(`https://taskify-backend-5v37.onrender.com/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Filter out the deleted comment from the comments array
      setComments((prevState) =>
        prevState.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await fetch(`https://taskify-backend-5v37.onrender.com/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
  };

  const handleUpdateTask = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      console.log("Data to be submitted:", editedTask);
      const response = await fetch(
        `https://taskify-backend-5v37.onrender.com/tasks/${editedTask.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editedTask,
            due_date: formatDate(editedTask.due_date),
            reminder_date: formatDate(editedTask.reminder_date),
            title: editedTask.title,
            category: editedTask.category,
            description: editedTask.description,
            status: editedTask.status,
            recurrence_pattern: editedTask.ecurrence_pattern,
            priority: editedTask.priority,
            project_id: editedTask.project_id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
      setEditedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold text-cyan-800 mb-6">Task List</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border border-cyan-500 rounded-lg p-4 mb-6"
        >
          <h3
            onClick={() => handleTaskClick(task.id)}
            className="text-xl font-semibold text-cyan-800 cursor-pointer"
          >
            {task.title}
          </h3>
          {selectedTask === task.id && (
            <div className="mt-4">
              <p className="text-gray-700">Description: {task.description}</p>
              <p className="text-gray-700">Category: {task.category}</p>
              <p className="text-gray-700">
                Due Date: {formatDate(task.due_date)}
              </p>
              <p className="text-gray-700">Priority: {task.priority}</p>
              <p className="text-gray-700">Status: {task.status}</p>
              <p className="text-gray-700">
                Reminder Date: {formatDate(task.reminder_date)}
              </p>
              <p className="text-gray-700">
                Recurrence Pattern: {task.recurrence_pattern}
              </p>
              <p className="text-gray-700">Project: {task.project_id}</p>
              <h4 className="text-lg font-semibold text-cyan-800 mt-4">
                Comments:
              </h4>
              {Array.isArray(comments) &&
                comments.map((comment) => (
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
                  handleCommentSubmit(task.id, values.comment);
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
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded mt-2"
              >
                Delete Task
              </button>
              <button
                onClick={() => handleEditTask(task)}
                className="bg-gray-500 text-white font-semibold px-4 py-2 rounded mt-2 ml-2"
              >
                Edit Task
              </button>
              {editedTask && editedTask.id === task.id && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Edit Task Details
                  </h3>
                  <Formik
                    initialValues={editedTask}
                    enableReinitialize
                    onSubmit={(values) => {
                      setEditedTask(values);
                      handleUpdateTask();
                    }}
                  >
                    <Form>
                      <div className="mb-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          value={editedTask.title}
                          onChange={(event) =>
                            setEditedTask({
                              ...editedTask,
                              title: event.target.value,
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
                          as="textarea"
                          id="description"
                          name="description"
                          value={editedTask.description}
                          onChange={(event) =>
                            setEditedTask({
                              ...editedTask,
                              description: event.target.value,
                            })
                          }
                          rows="3"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <Field
                          type="text"
                          id="category"
                          name="category"
                          value={editedTask.category}
                          onChange={(event) =>
                            setEditedTask({
                              ...editedTask,
                              category: event.target.value,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="due_date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Due Date
                        </label>
                        <DatePicker
                          id="due_date"
                          name="due_date"
                          selected={new Date(editedTask.due_date)}
                          onChange={(date) =>
                            setEditedTask({ ...editedTask, due_date: date })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="priority"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Priority
                        </label>
                        <Field
                          as="select"
                          id="priority"
                          name="priority"
                          value={editedTask.priority}
                          onChange={(event) =>
                            setEditedTask({
                              ...editedTask,
                              priority: event.target.value,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                        >
                          <option value="">Select Priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </Field>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <Field
                          as="select"
                          id="status"
                          name="status"
                          value={editedTask.status}
                          onChange={(event) =>
                            setEditedTask({
                              ...editedTask,
                              status: event.target.value,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                        >
                          <option value="">Select Status</option>
                          <option value="Done">Done</option>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                        </Field>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="reminder_date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Reminder Date
                        </label>
                        <DatePicker
                          id="reminder_date"
                          name="reminder_date"
                          selected={new Date(editedTask.reminder_date)}
                          onChange={(date) =>
                            setEditedTask({
                              ...editedTask,
                              reminder_date: date,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="recurrence_pattern"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Recurrence Pattern
                        </label>
                        <Field
                          as="select"
                          id="recurrence_pattern"
                          name="recurrence_pattern"
                          value={editedTask.recurrence_pattern}
                          onChange={(event) =>
                            setEditedTask({
                              ...editedTask,
                              recurrence_pattern: event.target.value,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                        >
                          <option value="">Select Recurrence Pattern</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Daily">Daily</option>
                        </Field>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="project_id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Project
                        </label>
                        <Field
                          as="select"
                          id="project_id"
                          name="project_id"
                          value={editedTask.project_id || ""}
                          onChange={(event) =>
                            setEditedTask({
                              ...editedTask,
                              project_id: event.target.value,
                            })
                          }
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
                        >
                          <option value="">Select Project</option>
                          {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.name}
                            </option>
                          ))}
                          <option value={undefined}>None</option>
                        </Field>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => alert("Task Updated Successfully")}
                        >
                          Save Changes
                        </button>
                      </div>
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

export default TaskList;
