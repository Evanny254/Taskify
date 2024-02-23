import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProjectForm = () => {
  const initialFormData = {
    name: "",
    description: "",
    start_date: null,
    end_date: null,
    tasks: [] 
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [tasksOptions, setTasksOptions] = useState([]); 

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    fetch("https://taskify-backend-btvr.onrender.com/tasks",{
       headers:{
        'Authorization': `Bearer ${accessToken}`
       }
      })
      .then(response => response.json())
      .then(data => {
        setTasksOptions(data); 
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
    const accessToken = localStorage.getItem('access_token')
    fetch("https://taskify-backend-btvr.onrender.com/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         'Authorization': `Bearer ${accessToken}`

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

  return (
    <div>
      <div className="FormBigBox">
        <div className="FormBox">
          <h2 className="FormHeader">Create a Project</h2>
          <form className="Form" onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
              <label>Description:</label>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
              <label>Start Date:</label>
              <DatePicker
                selected={formData.start_date}
                onChange={(date) => setFormData({ ...formData, start_date: date })}
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
            <br />
            <div>
              <label>End Date:</label>
              <DatePicker
                selected={formData.end_date}
                onChange={(date) => setFormData({ ...formData, end_date: date })}
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
            <br />
            <div>
              <label>Tasks:</label>
              <select
                name="tasks"
                multiple
                value={formData.tasks}
                onChange={handleTaskSelect}
                required
              >
                {tasksOptions.map(task => (
                  <option key={task.id} value={task.id}>{task.name}</option>
                ))}
              </select>
            </div>
            <br />
            <button
              className="CreateProjectBtn"
              type="submit"
              onClick={() => alert("Project Submitted Successfully")}
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
