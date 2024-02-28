import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

import { LuLock, LuMail } from 'react-icons/lu';


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          username: username,
          password: password,
        }
      );

      const { access_token, refresh_token } = response.data;
  
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      
    }
  };

  return (
    <div className="p-8 relative">
      {/* Logo */}
      <div className="w-2/5 mx-auto flex justify-center my-4">
        <h1 className="text-4xl ml-8 font-extrabold font-dancing-script flex items-center text-cyan-500">
          Taskify
          <FaTasks size={35} className="text-cyan-500" />
        </h1>
      </div>
      {/* Login Form */}
      <div className='w-2/5 mx-auto shadowy border border-brown-100 p-8 rounded-md overflow-hidden'>
        <h2 className='text-3xl text-center font-semibold font-display'>Sign In</h2>
        <form onSubmit={handleSignIn} className='grid gap-8 mt-8'>

          {/*username */}
          <div className="flex gap-2 items-center border-b border-gray-300 ">
            <LuMail size={25} className="text-gray-400" />
            <input
              type='text'
              className='text-lg focus:outline-none py-1 placeholder:capitalize'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex gap-2 items-center border-b border-gray-300 ">
              <LuLock size={25} className="text-gray-400" />
              <input
                type="password"
                className="text-lg focus:outline-none py-1 placeholder:capitalize"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Forgot Password */}
            <div className="flex justify-end mt-2">
              <Link to="/forgot-password" className="text-cyan-500">
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="bg-cyan-500 text-white font-semibold py-4 w-1/2 mx-auto rounded-lg"
            onClick={() => alert("Sign In Successfully")}
          >
            SignIn
          </button>
          <p className="text-center">
            Don't have an account{" "}
            <Link to="/signup" className="text-brown-500 capitalize">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

/*Authorization: `Bearer ${accessToken}`*/
