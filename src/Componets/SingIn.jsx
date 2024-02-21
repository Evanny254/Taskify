import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignIn = ({ handleLogin }) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = (formData) => {
    console.log(handleLogin); // Log the handleLogin function
    handleLogin(formData.username, formData.password);
  };