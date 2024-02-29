import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaPlusSquare, FaProjectDiagram, FaUser, FaInfoCircle, FaFilePdf } from 'react-icons/fa';
import SignOut from './SignOut';

const NavBar = () => {
  return (
    <header className="bg-cyan-500 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/home" className="flex items-center text-white mr-4">
          <FaHome className="mr-2 text-2xl" />
          Home
        </Link>

        <div className="flex items-center space-x-8">
          <Link to="/tasklist" className="text-white hover:text-cyan-200">
            <FaTasks className="text-2xl" />
          </Link>

          <Link to="/taskform" className="text-white hover:text-cyan-200">
            <FaPlusSquare className="text-2xl" />
          </Link>

          <Link to="/projectlist" className="text-white hover:text-cyan-200">
            <FaProjectDiagram className="text-2xl" />
          </Link>

          <Link to="/projectform" className="text-white hover:text-cyan-200">
            <FaPlusSquare className="text-2xl" />
          </Link>

          <Link to="/account" className="text-white hover:text-cyan-200">
            <FaUser className="text-2xl" />
          </Link>

          <Link to="/about" className="text-white hover:text-cyan-200">
            <FaInfoCircle className="text-2xl" />
          </Link>

          <Link to="/taskreport" className="text-white hover:text-cyan-200">
            <FaFilePdf className="text-2xl" />
          </Link>

          <SignOut />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
