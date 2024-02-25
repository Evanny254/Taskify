import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

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
      // console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchComments = (accessToken, taskId) => {
    fetch(`https://taskify-backend-btvr.onrender.com/comments/${taskId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setComments(data);
        console.log(comments);
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  const handleTaskClick = (taskId) => {
    if (selectedTask === taskId) {
      setSelectedTask(null);
    } else {
      setSelectedTask(taskId);
      const accessToken = localStorage.getItem("access_token");
      // fetchComments(accessToken, taskId);
      fetchComments(accessToken, taskId);
    }
  };

  const handleCommentSubmit = async (taskId, comment) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `https://taskify-backend-btvr.onrender.com/comments`,
        {
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
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      const data = await response.json();
      console.log("Submitted comment:", data);
      setComments((prevState) => ({
        ...prevState,
        [taskId]: [...(prevState[taskId] || []), data],
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

  const handleEditTask = (task) => {
    setEditedTask(task);
  };

  const handleUpdateTask = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      console.log(editedTask);
      const response = await fetch(
        `https://taskify-backend-btvr.onrender.com/tasks/${editedTask.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTask),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      // Update the tasks list with the edited task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
      // Clear the edited task state
      setEditedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  return (
    <div className='container mx-auto mt-10 px-4'>
      <h2 className="text-3xl font-semibold text-cyan-800 mb-6">Task List</h2>
      {tasks.map((task) => (
        <div key={task.id}
          className="border border-cyan-500 rounded-lg p-4 mb-6" >
            <h3
              onClick={() => handleTaskClick(task.id)}
              className="text-xl font-semibold text-cyan-800 cursor-pointer"
            >
              {task.title}
            </h3>
            {selectedTask === task.id && (
              <div className="mt-4">
                <p className="text-gray-700">
                  Description: {task.description}
                </p>
                <p className="text-gray-700">
                  Category: {task.category}
                </p>
                <p className="text-gray-700">Due Date: {task.due_date}</p>
                <p className="text-gray-700">
                  Priority: {task.priority}
                </p>
                <p className="text-gray-700">Status: {task.status}</p>
                <p className="text-gray-700">
                  Reminder Date: {task.reminder_date}
                </p>
                <p className="text-gray-700">
                  Recurrence Pattern: {task.recurrence_pattern}
                </p>
                <h4 className="text-lg font-semibold text-cyan-800 mt-4">Comments:</h4>
                {comments[task.id] &&
                  Array.isArray(comments[task.id]) &&
                  comments[task.id].map((comment) => (
                    <div key={comment.id} className="mb-2">
                      <p className="text-gray-700">{comment.comment}</p>
                      <button
                        onClick={() =>
                          handleDeleteComment(task.id, comment.id)
                        }
                        className="text-red-500 hover:text-red-700"
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
                  <Form className="flex mt-2">
                    <Field
                      type="text"
                      name="comment"
                      className="border border-cyan-500 rounded p-2 w-full"
                    />
                    <button
                      type="submit"
                      className="bg-cyan-500 text-white font-semibold px-4 py-2 rounded ml-2"
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
    <Field
      type="date" 
      id="due_date"
      name="due_date"
      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
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
    <Field
      type="date" 
      id="reminder_date"
      name="reminder_date"
      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
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
      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500"
    >
      <option value="">Select Recurrence Pattern</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
      <option value="Daily">Daily</option>
    </Field>
  </div>
  <div className="flex justify-end">
    <button
      type="submit"
      className="bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
