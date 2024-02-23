import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProjectForm = () => {
  const initialFormData = {
    name: "",
    description: "",
    start_date: null,
    end_date: null,
    tasks: [],
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [tasksOptions, setTasksOptions] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "start_date" || name === "end_date" ? new Date(value) : value,
    });
  };

  const handleTaskSelect = (e) => {
    const selectedTasks = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      tasks: selectedTasks,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        "https://taskify-backend-btvr.onrender.com/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.status === 201) {
        console.log("Project created successfully.");
        setFormData({ ...initialFormData });
      } else {
        console.error("Project creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-cyan-100 p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-800">Create a Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-cyan-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
            <label className="block text-cyan-700 font-medium mb-2">Start Date:</label>
            <DatePicker
              selected={formData.start_date}
              onChange={(date) =>
                setFormData({ ...formData, start_date: date })
              }
              dateFormat="yyyy-MM-dd"
              className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-700 font-medium mb-2">End Date:</label>
            <DatePicker
              selected={formData.end_date}
              onChange={(date) =>
                setFormData({ ...formData, end_date: date })
              }
              dateFormat="yyyy-MM-dd"
              className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-700 font-medium mb-2">Tasks:</label>
            <select
              name="tasks"
              multiple
              value={formData.tasks}
              onChange={handleTaskSelect}
              className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
              required
            >
              {tasksOptions.map((task) => (
                <option key={task.id} value={task.id}>{task.name}</option>
              ))}
            </select>
          </div>
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
