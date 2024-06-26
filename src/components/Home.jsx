import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cyan-100 justify-center items-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4 text-cyan-500">
          <FaTasks className="inline-block mr-2 text-8xl" />
          Taskify
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          Organize Your Tasks, Boost Your Productivity
        </p>
      </div>
      <div className="max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to Taskify</h2>
        <p className="text-gray-700 mb-6">
          Taskify helps you organize your tasks and stay productive.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/tasklist"
            className="px-6 py-3 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300"
          >
            View Tasks
          </Link>
          <Link
            to="/projectlist"
            className="px-6 py-3 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
