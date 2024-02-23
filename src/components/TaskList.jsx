import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    fetchTasks(accessToken);
  }, []);

  const fetchTasks = async (accessToken) => {
    try {
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
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchComments = async (accessToken, taskId) => {
    try {
      const response = await fetch(
        `https://taskify-backend-btvr.onrender.com/comments/${taskId}`,
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
      console.log("Fetched comments for task:", taskId, data);
      setComments((prevState) => ({
        ...prevState,
        [taskId]: data,
      }));
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
      fetchComments(accessToken, taskId);
    }
  };

  const handleCommentSubmit = async (taskId, comment) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `https://taskify-backend-btvr.onrender.com/tasks/comments/${taskId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      const data = await response.json();
      console.log("Submitted comment:", data);
      setComments((prevState) => ({
        ...prevState,
        [taskId]: [...(prevState[taskId] || []), data], // Ensure prevState[taskId] is initialized as an array
      }));
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (taskId, commentId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await fetch(
        `https://taskify-backend-btvr.onrender.com/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setComments((prevState) => ({
        ...prevState,
        [taskId]: (prevState[taskId] || []).filter(
          (comment) => comment.id !== commentId
        ), // Ensure prevState[taskId] is initialized as an array
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await fetch(`https://taskify-backend-btvr.onrender.com/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-cyan-800 mb-4 text-center">Task List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg"
          >
            <div className="p-4">
              <h3
                onClick={() => handleTaskClick(task.id)}
                className="cursor-pointer text-xl font-semibold text-cyan-700 hover:text-cyan-900 mb-2"
              >
                {task.title}
              </h3>
              {selectedTask === task.id && (
                <div className="mt-2">
                  <p className="text-cyan-800 mb-2">Description: {task.description}</p>
                  <p className="text-cyan-800 mb-2">Category: {task.category}</p>
                  <p className="text-cyan-800 mb-2">Due Date: {task.due_date}</p>
                  <p className="text-cyan-800 mb-2">Priority: {task.priority}</p>
                  <p className="text-cyan-800 mb-2">Status: {task.status}</p>
                  <p className="text-cyan-800 mb-2">Reminder Date: {task.reminder_date}</p>
                  <p className="text-cyan-800 mb-2">Recurrence Pattern: {task.recurrence_pattern}</p>
                  <h4 className="text-cyan-800 mb-2">Comments:</h4>
                  {comments[task.id] &&
                    Array.isArray(comments[task.id]) &&
                    comments[task.id].map((comment) => (
                      <div key={comment.id} className="mb-2">
                        <p className="text-cyan-800">{comment.comment}</p>
                        <button
                          onClick={() => handleDeleteComment(task.id, comment.id)}
                          className="text-cyan-500 hover:text-cyan-700"
                        >
                          Delete Comment
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
                    <Form className="flex items-center mt-2">
                      <Field
                        type="text"
                        name="comment"
                        className="border border-cyan-300 rounded-md py-1 px-3 focus:outline-none focus:border-cyan-500 flex-1"
                      />
                      <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
                      >
                        Add Comment
                      </button>
                    </Form>
                  </Formik>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete Task
                    </button>
                    <Link
                      to={`/updatetask/${task.id}`}
                      className="text-cyan-500 hover:text-cyan-700"
                    >
                      Update Task
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
