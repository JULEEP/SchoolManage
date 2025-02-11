import React, { useEffect, useState } from "react";
import {
  FaBook, FaBullhorn,
  FaChalkboardTeacher, FaChevronDown, FaChevronRight,
  FaExclamationCircle, FaHome, FaList, FaSchool,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const [isLessonPlanOpen, setLessonPlanOpen] = useState(false);
  const [isDownloadCenterOpen, setDownloadCenterOpen] = useState(false);
  const [isLeavesOpen, setIsLeavesOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  const toggleLessonPlan = () => setLessonPlanOpen(!isLessonPlanOpen);
  const toggleDownloadCenter = () => setDownloadCenterOpen(!isDownloadCenterOpen);
  const toggleLeaves = () => setIsLeavesOpen(!isLeavesOpen);
  const toggleComplaints = () => setIsComplaintOpen(!isComplaintOpen);

  // ✅ Logout Function with API Call
  const handleLogout = async () => {
    try {
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/students/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Logout Successful");
        navigate("/student-login"); // ✅ Redirect to Student Login Page
      } else {
        alert("Logout Failed. Try Again.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="w-64 max-h-screen ml-0 overflow-y-auto bg-white rounded-lg shadow-lg">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png"
          alt="Logo"
          className="w-32 h-32 rounded-full"
        />
        {firstName && <h2 className="mt-4 text-xl text-black">{firstName}</h2>}
        <hr className="w-full mt-4 border-t-2 border-gray-300" />
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-2">
        <li>
          <NavLink to="/student-dashboard" className="flex items-center p-3 rounded-md hover:bg-gray-100">
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaHome /></div>
            <span className="ml-3 text-black">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/student-profile" className="flex items-center p-3 rounded-md hover:bg-gray-100">
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaUser /></div>
            <span className="ml-3 text-black">My Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/class-routine" className="flex items-center p-3 rounded-md hover:bg-gray-100">
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaChalkboardTeacher /></div>
            <span className="ml-3 text-black">Class Routine</span>
          </NavLink>
        </li>

        {/* Leaves Section */}
        <li>
          <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100" onClick={toggleLeaves}>
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaList /></div>
            <span className="ml-3 text-black">Leaves</span>
            {isLeavesOpen ? <FaChevronDown className="ml-auto text-black" /> : <FaChevronRight className="ml-auto text-black" />}
          </div>
          {isLeavesOpen && (
            <ul className="pl-12 mt-2">
              <li>
                <NavLink to="/apply-leave" className="block py-1 text-sm text-black hover:text-blue-500">
                  Apply Leave
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Complaints Section */}
        <li>
          <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100" onClick={toggleComplaints}>
            <div className="p-2 text-white bg-red-500 rounded-full"><FaExclamationCircle /></div>
            <span className="ml-3 text-black">My Complaints</span>
            {isComplaintOpen ? <FaChevronDown className="ml-auto text-black" /> : <FaChevronRight className="ml-auto text-black" />}
          </div>
          {isComplaintOpen && (
            <ul className="pl-12 mt-2">
              <li>
                <NavLink to="/student-complaint" className="block py-1 text-sm text-black hover:text-blue-500">
                  My Complaints
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Notice Board */}
        <li>
          <NavLink to="/student-notice-board" className="flex items-center p-3 rounded-md hover:bg-gray-100">
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaBullhorn /></div>
            <span className="ml-3 text-black">Notice Board</span>
          </NavLink>
        </li>

        {/* Subjects */}
        <li>
          <NavLink to="/student-subject-details" className="flex items-center p-3 rounded-md hover:bg-gray-100">
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaSchool /></div>
            <span className="ml-3 text-black">Subjects</span>
          </NavLink>
        </li>

        {/* Teachers */}
        <li>
          <NavLink to="/student-teacher-list" className="flex items-center p-3 rounded-md hover:bg-gray-100">
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaChalkboardTeacher /></div>
            <span className="ml-3 text-black">Teachers</span>
          </NavLink>
        </li>

        {/* User Guide */}
        <li>
          <NavLink to="/user-guide" className="flex items-center p-3 rounded-md hover:bg-gray-100">
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaBook /></div>
            <span className="ml-3 text-black">User Guide</span>
          </NavLink>
        </li>

        {/* ✅ Logout Button */}
        <li>
          <button onClick={handleLogout} className="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
            <div className="p-2 text-white bg-blue-500 rounded-full"><FaSignOutAlt /></div>
            <span className="ml-3 text-black">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
