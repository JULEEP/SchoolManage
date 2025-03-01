import React, { useState } from "react";
import { FaBook, FaChevronDown, FaChevronRight, FaHome, FaList, FaSignOutAlt, FaUser, FaWallet, FaChalkboardTeacher, FaClipboardList, FaBus, FaMoneyBill, FaQuestionCircle, FaCalendarAlt, FaVideo } from "react-icons/fa"; // Added new icons
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const ParentSidebar = () => {
  const [isParentExaminationsOpen, setParentExaminationsOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleParentExaminations = () => setParentExaminationsOpen((prev) => !prev);

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
    <div className="w-64 h-screen flex flex-col justify-between ml-0 overflow-y-auto bg-gray-900 text-white rounded-lg">
      <div>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png"
            alt="Logo"
            className="w-32 h-32 rounded-full"
          />
          <span className="mt-2 text-lg font-semibold">Parent Dashboard</span>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-2">
          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/parent-dashboard" className="flex items-center text-white hover:text-gray-300">
              <FaHome className="mr-3 text-gray-300" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/mychild-profile" className="flex items-center text-white hover:text-gray-300">
              <FaUser className="mr-3 text-gray-300" />
              <span>My Children</span>
            </NavLink>
          </li>
          
          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/mychild-fees" className="flex items-center text-white hover:text-gray-300">
              <FaWallet className="mr-3 text-gray-300" />
              <span>Fees</span>
            </NavLink>
          </li>
          
          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/homework" className="flex items-center text-white hover:text-gray-300">
              <FaBook className="mr-3 text-gray-300" />
              <span>Homework</span>
            </NavLink>
          </li>

          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/teacher-subjects" className="flex items-center text-white hover:text-gray-300">
              <FaChalkboardTeacher className="mr-3 text-gray-300" />
              <span>Teacher Subjects</span>
            </NavLink>
          </li>

          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/attendance" className="flex items-center text-white hover:text-gray-300">
              <FaClipboardList className="mr-3 text-gray-300" />
              <span>Attendance</span>
            </NavLink>
          </li>
          
          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/notice" className="flex items-center text-white hover:text-gray-300">
              <FaBook className="mr-3 text-gray-300" />
              <span>Notice</span>
            </NavLink>
          </li>

          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/transport" className="flex items-center text-white hover:text-gray-300">
              <FaBus className="mr-3 text-gray-300" />
              <span>Transport</span>
            </NavLink>
          </li>

          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/ask-queries" className="flex items-center text-white hover:text-gray-300">
              <FaQuestionCircle className="mr-3 text-gray-300" />
              <span>Ask Queries</span>
            </NavLink>
          </li>

          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/holidays" className="flex items-center text-white hover:text-gray-300">
              <FaCalendarAlt className="mr-3 text-gray-300" />
              <span>Holidays</span>
            </NavLink>
          </li>

          <li className="flex items-center p-3 text-lg rounded-md">
            <NavLink to="/live-classes" className="flex items-center text-white hover:text-gray-300">
              <FaVideo className="mr-3 text-gray-300" />
              <span>Live Classes</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-3">
        <li className="flex items-center p-3 text-lg rounded-md cursor-pointer hover:bg-red-700" onClick={handleLogout}>
          <FaSignOutAlt className="mr-3 text-gray-300" />
          <span>Logout</span>
        </li>
      </div>
    </div>
  );
};

export default ParentSidebar;
