import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProjectForm = () => {
  const initialFormData = {
    name: "",
    description: "",
    start_date: null,
    end_date: null,
    tasks: [] // To store selected tasks
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [tasksOptions, setTasksOptions] = useState([]); // To store available tasks

  useEffect(() => {
    // Fetch tasks options from server
    fetch("https://taskify-8h37.onrender.com/tasks")
      .then(response => response.json())
      .then(data => {
        setTasksOptions(data); // Assuming data is an array of task objects
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "start_date" || name === "end_date" ? new Date(value) : value,
    });
  };

  const handleTaskSelect = (e) => {
    const selectedTasks = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      tasks: selectedTasks
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      name: formData.name,
      description: formData.description,
      start_date: formData.start_date,
      end_date: formData.end_date,
      tasks: formData.tasks
    };

    fetch("https://taskify-8h37.onrender.com/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Project created successfully.");
          setFormData({ ...initialFormData });
        } else {
          console.error("Project creation failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };