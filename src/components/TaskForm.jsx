import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskActions from "./TaskActions";

const TaskForm = () => {
    const initialFormData = { /* ... */ };
    const [formData, setFormData] = useState({ ...initialFormData });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: name === "due_date" || name === "reminder_date" ? (value ? new Date(value) : null) : value,
        }));
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: name === "due_date" || name === "reminder_date" ? (value ? new Date(value) : null) : value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { /* ... */ };
      
        try {
          const response = await fetch("https://taskify-8h37.onrender.com/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
          });
      
          if (response.ok) {
            console.log("Task created successfully.");
            setFormData({ ...initialFormData });
            alert("Task Submitted Successfully");
          } else {
            console.error(`Task creation failed with status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
      


      
  
