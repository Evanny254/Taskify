import { useState, useEffect } from "react";
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
    recurrence_pattern: "",
    project_id: null,
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [projects, setProjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "due_date" || name === "reminder_date"
          ? new Date(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedDueDate = formatDate(formData.due_date);
    const formattedReminderDate = formatDate(formData.reminder_date);

    const taskData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      due_date: formattedDueDate,
      priority: formData.priority,
      status: formData.status,
      reminder_date: formattedReminderDate,
      recurrence_pattern: formData.recurrence_pattern,
      project_id: formData.project_id,
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        "https://taskify-backend-5v37.onrender.com/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(taskData),
        }
      );

      if (response.status === 201) {
        setFormData({ ...initialFormData });
        setSuccessMessage("Task created successfully.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000); // Hides success message after 5 seconds
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage("Task creation failed.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000); // Hides error message after 5 seconds
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error: " + error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // Hides error message after 5 seconds
    }
  };

  return (
    <div className="bg-cyan-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded shadow-md p-8">
          <h2 className="text-2xl mb-4 font-semibold text-cyan-800">
            Create a Task
          </h2>
          {successMessage && (
            <div className="text-green-600 mb-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-600 mb-4">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">
                Title:
              </label>
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
              <label className="block text-cyan-700 font-medium mb-2">
                Description:
              </label>
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
              <label className="block text-cyan-700 font-medium mb-2">
                Category:
              </label>
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
              <label className="block text-cyan-700 font-medium mb-2">
                Due Date:
              </label>
              <DatePicker
                selected={formData.due_date}
                onChange={(selectedDate) =>
                  handleChange({
                    target: { name: "due_date", value: selectedDate },
                  })
                }
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">
                Priority:
              </label>
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
              <label className="block text-cyan-700 font-medium mb-2">
                Status:
              </label>
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
              <label className="block text-cyan-700 font-medium mb-2">
                Reminder Date:
              </label>
              <DatePicker
                selected={formData.reminder_date}
                onChange={(selectedDate) =>
                  handleChange({
                    target: { name: "reminder_date", value: selectedDate },
                  })
                }
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">
                Recurrence Pattern:
              </label>
              <select
                name="recurrence_pattern"
                value={formData.recurrence_pattern}
                onChange={handleChange}
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                required
              >
                <option value="">Select Recurrence Pattern</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Daily">Daily</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">
                Project:
              </label>
              <select
                name="project_id"
                value={formData.project_id || ""}
                onChange={handleChange}
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
                <option value={undefined}>None</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
