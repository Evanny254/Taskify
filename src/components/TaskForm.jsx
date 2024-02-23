import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = () => {
  const initialFormData = {
    title: "",
    description: "",
    category: "",
    due_date: null,
    priority: "",
    status: "",
    reminder_date: null,
    recurrence_pattern: ""
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "due_date" || name === "reminder_date" ? new Date(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      due_date: formData.due_date instanceof Date ? formData.due_date.toISOString() : null,
      priority: formData.priority,
      status: formData.status,
      reminder_date: formData.reminder_date instanceof Date ? formData.reminder_date.toISOString() : null,
      recurrence_pattern: formData.recurrence_pattern instanceof Date ? formData.recurrence_pattern.toISOString() : null
    };
    const accessToken = localStorage.getItem('access_token');
    fetch("https://taskify-backend-btvr.onrender.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Task created successfully.");
          setFormData({ ...initialFormData }); 
        } else {
          console.error("Task creation failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-cyan-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded shadow-md p-8">
          <h2 className="text-2xl mb-4 font-semibold text-cyan-800">Create a Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">Description:</label>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">Due Date:</label>
              <DatePicker
                selected={formData.due_date}
                onChange={(selectedDate) =>
                  handleChange({ target: { name: "due_date", value: selectedDate } })
                }
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">Priority:</label>
              <select
    name="priority"
    value={formData.priority}
    onChange={handleChange}
    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
    required
  >
    <option value="">Select Priority</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">Status:</label>
              <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
    required
  >
    <option value="">Select Status</option>
    <option value="Done">Done</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
  </select>

            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">Reminder Date:</label>
              <DatePicker
                selected={formData.reminder_date}
                onChange={(selectedDate) =>
                  handleChange({ target: { name: "reminder_date", value: selectedDate } })
                }
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">Recurrence Pattern:</label>
              <select
    name="recurrence_pattern"
    value={formData.recurrence_pattern}
    onChange={handleChange}
    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
  >
    <option value="">Select Recurrence Pattern</option>
    <option value="Weekly">Weekly</option>
    <option value="Monthly">Monthly</option>
    <option value="Daily">Daily</option>
  </select>
            </div>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => alert("Task Submitted Successfully")}
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
