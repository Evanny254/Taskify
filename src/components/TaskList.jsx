import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comments, setComments] = useState({});

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
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const fetchComments = async (taskId) => {
    try {
      const response = await fetch(
        `https://taskify-backend-btvr.onrender.com/comments/${taskId}`
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
      fetchComments(taskId);
    }
  };

  const handleCommentSubmit = async (taskId, comment) => {
    try {
      const response = await fetch(
        `https://taskify-backend-btvr.onrender.com/tasks/comments/${taskId}`,
        {
          method: "POST",
          headers: {
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
        [taskId]: [...prevState[taskId], data],
      }));
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (taskId, commentId) => {
    try {
      await fetch(
        `https://taskify-backend-btvr.onrender.com/tasks/${taskId}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      setComments((prevState) => ({
        ...prevState,
        [taskId]: prevState[taskId].filter(
          (comment) => comment.id !== commentId
        ),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`https://taskify-backend-btvr.onrender.com/tasks/${taskId}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3
            onClick={() => handleTaskClick(task.id)}
            style={{ cursor: "pointer" }}
          >
            {task.title}
          </h3>
          {selectedTask === task.id && (
            <div>
              <p>Description: {task.description}</p>
              <p>Category: {task.category}</p>
              <p>Due Date: {task.due_date}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <p>Reminder Date: {task.reminder_date}</p>
              <p>Recurrence Pattern: {task.recurrence_pattern}</p>
              <h4>Comments:</h4>
              {comments[task.id] &&
                comments[task.id].map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <button
                      onClick={() => handleDeleteComment(task.id, comment.id)}
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
                <Form>
                  <Field type="text" name="comment" />
                  <button type="submit">Add Comment</button>
                </Form>
              </Formik>
              <button onClick={() => handleDeleteTask(task.id)}>
                Delete Task
              </button>
              <Link to={`/updatetask/${task.id}`}>
                <button>Update Task</button>
              </Link>
            </div>
          )}
        </div>
      ))}
      <Link to="/taskform">Create New Task</Link>
    </div>
  );
};

export default TaskList;
