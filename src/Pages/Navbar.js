// Navbar.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon from react-icons
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle profile dropdown

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar /> {/* Sidebar added here */}

    {/* Main Content */}
    <div className="flex-1 p-6 ml-64"> {/* Add ml-64 to shift the content right */}      {/* Title */}      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold text-white">
          InfixEdu
        </div>

        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute text-gray-500 left-3 top-3" />
        </div>

        {/* Navbar Links (visible on desktop) */}
        <div className="hidden space-x-6 md:flex">
          <a href="#" className="text-white hover:text-blue-200">Home</a>
          <a href="#" className="text-white hover:text-blue-200">Dashboard</a>
          <a href="#" className="text-white hover:text-blue-200">Students</a>
          <a href="#" className="text-white hover:text-blue-200">Teachers</a>
          <a href="#" className="text-white hover:text-blue-200">Profile</a>
          <a href="#" className="text-white hover:text-blue-200">Logout</a>
        </div>

        {/* Profile Dropdown (visible on desktop) */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center text-white"
          >
            {/* Profile initials only (no email) */}
            <div className="flex items-center justify-center w-8 h-8 text-white bg-gray-400 rounded-full">
              <span>AD</span> {/* Placeholder for profile initials */}
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg">
              <p className="px-4 py-2 text-gray-700">Super Admin</p>
              <hr />
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">View Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Password</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Logout</a>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white">☰</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
