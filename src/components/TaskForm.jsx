import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { format } from "date-fns";

const TaskForm = () => {
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="bg-cyan-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded shadow-md p-8">
          <h2 className="text-2xl mb-4 font-semibold text-cyan-800">
            Create a Task
          </h2>
          <Formik
            initialValues={{
              title: "",
              description: "",
              category: "",
              due_date: null,
              priority: "",
              status: "",
              reminder_date: null,
              recurrence_pattern: "",
              project_id: null,
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("Title is required"),
              description: Yup.string().required("Description is required"),
              category: Yup.string().required("Category is required"),
              due_date: Yup.date().min(
                new Date(),
                "Due date cannot be in the past"
              ),
              priority: Yup.string().required("Priority is required"),
              status: Yup.string().required("Status is required"),
              reminder_date: Yup.date()
                .min(
                  Yup.ref("due_date"),
                  "Reminder date cannot be earlier than due date"
                )
                .max(
                  Yup.ref("due_date"),
                  "Reminder date cannot be later than due date"
                )
                .min(new Date(), "Reminder date cannot be in the past"),
              recurrence_pattern: Yup.string(),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
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
                    body: JSON.stringify({
                      ...values,
                      due_date: format(values.due_date, "yyyy-MM-dd"),
                      reminder_date: format(values.reminder_date, "yyyy-MM-dd"),
                    }),
                  }
                );

                if (response.status === 201) {
                  resetForm();
                  alert("Task Created Successfully");
                } else {
                  console.error("Task creation failed.");
                }
              } catch (error) {
                console.error("Error:", error);
              }
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Title:
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Description:
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Category:
                  </label>
                  <Field
                    type="text"
                    name="category"
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Due Date:
                  </label>
                  <DatePicker
                    selected={values.due_date}
                    onChange={(date) => setFieldValue("due_date", date)}
                    minDate={new Date()}
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                    required
                  />
                  <ErrorMessage
                    name="due_date"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Priority:
                  </label>
                  <Field
                    as="select"
                    name="priority"
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Field>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Status:
                  </label>
                  <Field
                    as="select"
                    name="status"
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Done">Done</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Reminder Date:
                  </label>
                  <DatePicker
                    selected={values.reminder_date}
                    onChange={(date) => setFieldValue("reminder_date", date)}
                    minDate={new Date()}
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                    required
                  />
                  <ErrorMessage
                    name="reminder_date"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Recurrence Pattern:
                  </label>
                  <Field
                    as="select"
                    name="recurrence_pattern"
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Select Recurrence Pattern</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Daily">Daily</option>
                  </Field>
                  <ErrorMessage
                    name="recurrence_pattern"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-cyan-700 font-medium mb-2">
                    Project:
                  </label>
                  <Field
                    as="select"
                    name="project_id"
                    className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                    <option value={undefined}>None</option>
                  </Field>
                  <ErrorMessage
                    name="project_id"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Task
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
