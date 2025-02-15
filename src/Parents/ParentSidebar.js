import React, { useState } from "react";
import { FaBook, FaChevronDown, FaChevronRight, FaHome, FaList, FaSignOutAlt, FaUser, FaWallet } from "react-icons/fa"; // Added logout icon
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const ParentSidebar = () => {
  const [isParentLessonPlanOpen, setParentLessonPlanOpen] = useState(false);
  const [isParentExaminationsOpen, setParentExaminationsOpen] = useState(false);
  const [isParentLibraryOpen, setParentLibraryOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleParentLessonPlan = () => setParentLessonPlanOpen((prev) => !prev);
  const toggleParentExaminations = () => setParentExaminationsOpen((prev) => !prev);
  const toggleParentLibrary = () => setParentLibraryOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/parent/parent-logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Logout successful");
        navigate("/parent-login"); // Redirect to login page
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out");
    }
  };

  return (
    <div className="w-64 max-h-screen ml-0 overflow-y-auto bg-white rounded-lg">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png"
          alt="Logo"
          className="w-32 h-32 rounded-full"
        />
        <span className="mt-2 text-lg font-semibold text-sky-500">Parent Dashboard</span>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-2">
        {/* Dashboard */}
        <li className="flex items-center p-3 text-lg rounded-md hover:bg-gray-100">
          <NavLink to="/parent-dashboard" className="flex items-center text-sky-500 hover:text-sky-400">
            <FaHome className="mr-3 text-purple-600" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* My Children */}
        <li className="flex items-center p-3 text-lg rounded-md hover:bg-gray-100">
          <NavLink to="/mychild-profile" className="flex items-center text-sky-500 hover:text-sky-400">
            <FaUser className="mr-3 text-purple-600" />
            <span>My Children</span>
          </NavLink>
        </li>

        {/* Fees */}
        <li className="flex items-center p-3 text-lg rounded-md hover:bg-gray-100">
          <NavLink to="/mychild-fees" className="flex items-center text-sky-500 hover:text-sky-400">
            <FaWallet className="mr-3 text-purple-600" />
            <span>Fees</span>
          </NavLink>
        </li>
        {/* Examinations */}
        <li className="flex flex-col items-start p-3 text-lg rounded-md hover:bg-gray-100">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleParentExaminations}>
            <FaList className="mr-3 text-purple-600" />
            <span className="text-sky-500">Examinations</span>
            {isParentExaminationsOpen ? <FaChevronDown className="ml-2 text-purple-600" /> : <FaChevronRight className="ml-2 text-purple-600" />}
          </div>
          {isParentExaminationsOpen && (
            <ul className="pl-8 mt-2 space-y-4">
              <li>
                <NavLink to="/mychild-exam-schedule" className="text-lg text-sky-500 hover:text-sky-400">
                  Exam Schedule
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Logout Button */}
        <li className="flex items-center p-3 text-lg rounded-md cursor-pointer hover:bg-red-100" onClick={handleLogout}>
          <FaSignOutAlt className="mr-3 text-purple-600" />
          <span className="text-sky-400">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default ParentSidebar;
