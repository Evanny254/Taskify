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
      


      
  
