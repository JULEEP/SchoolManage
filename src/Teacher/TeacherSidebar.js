import React, { useState } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaChevronDown, FaChevronRight,
  FaClipboardList,
  FaHome,
  FaLaptopCode,
  FaRegCalendarCheck,
  FaSignOutAlt,
  FaTasks,
  FaUsers
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const TeacherSidebar = () => {
  const [isExamsOpen, setExamsOpen] = useState(false);
  const [isHomeworkOpen, setHomeworkOpen] = useState(false);
  const navigate = useNavigate();

  const toggleExams = () => setExamsOpen((prev) => !prev);
  const toggleHomework = () => setHomeworkOpen((prev) => !prev);

  // ✅ Logout Function with API Call
  const handleLogout = async () => {
    try {
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/teacher/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Logout Successful");
        navigate("/teacher-login"); // ✅ Redirect to Login Page
      } else {
        alert("Logout Failed. Try Again.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="fixed w-64 h-screen overflow-y-auto text-white bg-black rounded-lg">
      {/* Logo Section */}
      <div className="flex items-center justify-center p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Teacher Panel</h1>
      </div>

      {/* Sidebar Navigation */}
      <ul className="p-4 space-y-0">
        <li>
          <NavLink to="/teacher-dashboard" className="flex items-center p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800">
            <FaHome className="mr-3" /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/teacher-attendance" className="flex items-center p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800">
            <FaClipboardList className="mr-3" /> Attendance
          </NavLink>
        </li>

        {/* Homework */}
        <li className="flex flex-col items-start">
          <div className="flex items-center p-3 text-lg text-gray-400 rounded-md cursor-pointer hover:bg-gray-800" onClick={toggleHomework}>
            <FaTasks className="mr-3" /> Homework
            {isHomeworkOpen ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
          </div>
          {isHomeworkOpen && (
            <ul className="pl-8">
              <li><NavLink to="/teacher-homework" className="block p-2 text-sm text-gray-400 rounded-md hover:bg-gray-700">Assigned Homework</NavLink></li>
              <li><NavLink to="/teacher-homeworklist" className="block p-2 text-sm text-gray-400 rounded-md hover:bg-gray-700">Review Homework</NavLink></li>
            </ul>
          )}
        </li>

        {/* Exams */}
        <li className="flex flex-col items-start">
          <div className="flex items-center p-3 text-lg text-gray-400 rounded-md cursor-pointer hover:bg-gray-800" onClick={toggleExams}>
            <FaChalkboardTeacher className="mr-3" /> Exams
            {isExamsOpen ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
          </div>
          {isExamsOpen && (
            <ul className="pl-8">
              <li><NavLink to="/teacher-exam-schedule" className="block p-2 text-sm text-gray-400 rounded-md hover:bg-gray-700">Exam Schedule</NavLink></li>
            </ul>
          )}
        </li>

        <li><NavLink to="/teacher-classroutine" className="flex items-center p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800"><FaCalendarAlt className="mr-3" /> Routine</NavLink></li>
        <li><NavLink to="/teacher-noticeboard" className="flex items-center p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800"><FaBell className="mr-3" /> Notice Board</NavLink></li>
        <li><NavLink to="/teacher-leave" className="flex items-center p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800"><FaRegCalendarCheck className="mr-3" /> My Leaves</NavLink></li>
        <li><NavLink to="/teacher-meetings" className="flex items-center p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800"><FaRegCalendarCheck className="mr-3" /> My Meeting</NavLink></li>
        <li><NavLink to="/teacher-students" className="flex items-center p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800"><FaUsers className="mr-3" /> All Students</NavLink></li>
        <li><NavLink to="/liveclassform" className="flex items-center p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800"><FaLaptopCode className="mr-3" /> Live Class Form</NavLink></li>

        {/* ✅ Logout Button with API Call */}
        <li>
          <button onClick={handleLogout} className="flex items-center w-full p-3 text-lg text-gray-400 rounded-md hover:bg-gray-800">
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;
