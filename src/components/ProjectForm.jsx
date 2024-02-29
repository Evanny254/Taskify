import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";

const ProjectForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    start_date: Yup.date()
      .min(new Date(), "Start date cannot be in the past")
      .required("Start date is required"),
    end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("start_date"), "End date cannot be before start date"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        start_date: formatDate(values.start_date),
        end_date: formatDate(values.end_date),
      };

      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        "https://taskify-backend-5v37.onrender.com/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formattedValues),
        }
      );

      if (response.status === 201) {
        console.log("Project created successfully.");
        resetForm();
        alert("Project Created Successfully");
      } else {
        console.error("Project creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setSubmitting(false);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-cyan-100 p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-800">
          Create a Project
        </h2>
        <Formik
          initialValues={{
            name: "",
            description: "",
            start_date: null,
            end_date: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-cyan-700 font-medium mb-2">
                  Name:
                </label>
                <Field
                  type="text"
                  name="name"
                  className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
                  required
                />
                <ErrorMessage
                  name="name"
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
                  required
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-cyan-700 font-medium mb-2">
                  Start Date:
                </label>
                <DatePicker
                  selected={values.start_date}
                  onChange={(date) => setFieldValue("start_date", date)}
                  minDate={new Date()} /* Set minDate to current date */
                  className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                  required
                />
                <ErrorMessage
                  name="start_date"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-cyan-700 font-medium mb-2">
                  End Date:
                </label>
                <DatePicker
                  selected={values.end_date}
                  onChange={(date) => setFieldValue("end_date", date)}
                  minDate={new Date()}
                  className="block w-full border border-cyan-300 rounded-md py-2 px-3 focus:outline-none"
                  required
                />
                <ErrorMessage
                  name="end_date"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? "Creating..." : "Create Project"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProjectForm;
