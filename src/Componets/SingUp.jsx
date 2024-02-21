import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = ({ handleRegister }) => {
  const navigate = useNavigate();
  const { 
    formState: { errors, isSubmitting },
    handleSubmit, // Define handleSubmit here
    register 
  } = useForm(); // Initialize useForm

  const onSubmit = async (formData) => {
    try {
      await handleRegister(formData.username, formData.email, formData.password);
      navigate('/signin'); // Assuming 'navigate' is defined elsewhere
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error('Account already created.');
      }
    }
  };

