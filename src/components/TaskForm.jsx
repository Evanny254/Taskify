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
      due_date: formData.due_date,
      priority: formData.priority,
      status: formData.status,
      reminder_date: formData.reminder_date,
      recurrence_pattern: formData.recurrence_pattern
    };

    fetch("https://taskify-backend-btvr.onrender.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    <div>
      <TaskActions />
   
      <div className="FormBigBox">
        <div className="FormBox">
          <h2 className="FormHeader">Create a Task</h2>
          <form className="Form" onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <br/>
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
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
              <label>Due Date:</label>
              <DatePicker
                selected={formData.due_date}
                onChange={(selectedDate) =>
                  handleChange({ target: { name: "due_date", value: selectedDate } })
                }
                required
              />
            </div>
            <br />
            <div>
              <label>Priority:</label>
              <input
                type="text"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
              <label>Reminder Date:</label>
              <DatePicker
                selected={formData.reminder_date}
                onChange={(selectedDate) =>
                  handleChange({ target: { name: "reminder_date", value: selectedDate } })
                }
                required
              />
            </div>
            <br />
            <div>
              <label>Recurrence Pattern:</label>
              <input
                type="text"
                name="recurrence_pattern"
                value={formData.recurrence_pattern}
                onChange={handleChange}
              />
            </div>
            <br />
            <button
              className="CreateTaskBtn"
              type="submit"
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