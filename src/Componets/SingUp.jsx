import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = ({ handleRegister }) => {
  const navigate = useNavigate();
  const {
    formState: { errors, isSubmitting },
    handleSubmit, // Define handleSubmit here
    register,
  } = useForm(); // Initialize useForm

  const onSubmit = async (formData) => {
    try {
      await handleRegister(
        formData.username,
        formData.email,
        formData.password
      );
      navigate("/signin"); // Assuming 'navigate' is defined elsewhere
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Account already created.");
      }
    }
  };

  return (
    <div className="container pt-16 pb-10 lg:pt-[6rem] lg:pb-[4.5rem]">
      <h1 className="text-center font-semibold text-3xl lg:text-4xl lg:max-w-3xl lg:mx-auto">
        The <span className="text-primary">Essential</span> Tool for Your Daily{" "}
        <span className="text-primary">Success:</span> Sign Up Now
      </h1>
      <div className="mt-8 md:flex md:justify-center md:mt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-y-6 w-full md:w-[468px]"
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="username" className="text-base">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              autoComplete="off"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-base">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="text-base">
              Password
            </label>
            <input {...register("password")} type="password" id="password" />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting && <div className="mr-2 w-5 h-5 animate-spin" />}
            Sign Up
          </button>
          <Link to="/signin" className="text-center text-base">
            Go back to signin
          </Link>
        </form>
      </div>
    </div>
  );
};
