import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";


import { LuLock, LuMail, LuPhone, LuUser } from 'react-icons/lu';


function SignUp() {
  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const navigate = useNavigate();

  const handleSignUp = async(e)=> {
    e.preventDefault()
    try {
      const response = await fetch('https://taskify-backend-btvr.onrender.com/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
      console.error('Sign up failed:', response.statusText);
      }
      const data = await response.json();
      console.log('Sign up successful', data);
      
      navigate("/signin")
  } catch (error) {
      console.error('Sign up failed:', error);
  }
    
  }

  return (
    <div className='p-8 relative'>
      {/* logo */}
      <div className='w-full md:w-2/5 md:mx-auto flex justify-center my-4'>
        <h1 className='text-4xl ml-8 font-extrabold font-dancing-script flex items-center text-cyan-500'>
          Taskify
          <FaTasks size={35} className= 'text-cyan-500' />
        </h1>
      </div>
      {/* register form */}
      <div className='w-5/6 md:w-2/5 mx-auto shadowy border border-pink-100 md:p-8 rounded-md overflow-hidden'>
        <h2 className='text-3xl text-center font-semibold font-display'>Sign Up</h2>
        <form onSubmit={handleSignUp} className='grid md:gap-8 mt-8'>
          {/* name */}
          <div className='flex gap-2 items-center border-b border-gray-300 '>
            <LuUser size={25} className='text-gray-400' />
            <input
              type='text'
              name='username'
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              className='text-lg focus:outline-none py-1 placeholder:capitalize'
              placeholder='Username'
              required
            />
          </div>
          {/* email */}
          <div className='flex gap-2 items-center border-b border-gray-300 '>
            <LuMail size={25} className='text-gray-400' />
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className='text-lg focus:outline-none py-1 placeholder:capitalize'
              placeholder='Email Address'
              required
            />
          </div>
          {/* password */}
          <div className='flex gap-2 items-center border-b border-gray-300 '>
            <LuLock size={25} className='text-gray-400' />
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className='text-lg focus:outline-none py-1 placeholder:capitalize'
              placeholder='Password'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-cyan-500 text-white font-semibold py-4 w-1/2 mx-auto rounded-lg'
          >
            Sign Up
          </button>
          <p className='text-center my-2'>
            Have an account?{' '}
            <Link to={'/signin'} className='cursor-pointer text-cyan-500 capitalize'>
              Sign In
            </Link>
          </p>
          <p>
            By creating an account, you agree to our{' '}
            <span className='cursor-pointer text-cyan-500 capitalize'>
              terms & conditions
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;