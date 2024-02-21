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
  