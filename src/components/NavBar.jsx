import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaPlusSquare, FaProjectDiagram, FaUser, FaSignOutAlt, FaInfoCircle } from 'react-icons/fa';


const NavBar = () => {
  return (
    <header className="bg-cyan-500 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/home" className="flex items-center text-white mr-4">
          <FaHome className="mr-2" />
          Home
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/tasklist" className="text-white hover:text-cyan-200">
            <FaTasks />
          </Link>

          <Link to="/taskform" className="text-white hover:text-cyan-200">
            <FaPlusSquare />
          </Link>

          <Link to="/projectlist" className="text-white hover:text-cyan-200">
            <FaProjectDiagram />
          </Link>

          <Link to="/projectform" className="text-white hover:text-cyan-200">
            <FaPlusSquare />
          </Link>

          <Link to="/account" className="text-white hover:text-cyan-200">
            <FaUser />
          </Link>

          <Link to="/about" className="text-white hover:text-cyan-200">
            <FaInfoCircle />
          </Link>

          <Link to="/signout" className="text-white hover:text-cyan-200">
            <FaSignOutAlt />
            {/* SignOut */}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
