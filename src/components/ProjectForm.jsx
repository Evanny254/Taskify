import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProjectForm = () => {
  const initialFormData = {
    name: "",
    description: "",
    start_date: null,
    end_date: null,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "start_date" || name === "end_date" ? new Date(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Format dates before sending to the server
      const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const formattedStartDate = formatDate(formData.start_date);
      const formattedEndDate = formatDate(formData.end_date);

      const projectData = {
        name: formData.name,
        description: formData.description,
        start_date: formattedStartDate, 
        end_date: formattedEndDate, 
      };
      
      const accessToken = localStorage.getItem('access_token');
      console.log(projectData)
       fetch("http://127.0.0.1:5000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(projectData),
          })

          .then((response) => {
            if (response.status ===  201) {
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
                onChange={(selectedDate) =>
                  handleChange({ target: { name: "start_date", value: selectedDate } })
                }
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-700 font-medium mb-2">End Date:</label>
              <DatePicker
                selected={formData.end_date}
                onChange={(selectedDate) =>
                  handleChange({ target: { name: "end_date", value: selectedDate } })
                }
                className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                required
              />
            </div>
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => alert("Project Created Successfully")}
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
