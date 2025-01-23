import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserGraduate,
  FaTasks,
  FaClipboardList,
  FaPlaneDeparture,
  FaBars,
  FaTimes,
  FaQuestionCircle,
  FaCalendarAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import TeacherSidebar from "./TeacherSidebar";

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:shadow-none w-64`}
    >
      <TeacherSidebar />
    </div>

    {/* Overlay for small screens */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
        onClick={toggleSidebar}
      ></div>
    )}

    {/* Main Content */}
    <div className="flex-grow overflow-y-auto lg:ml-64">
      {/* Header */}
      <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
        <h1 className="text-lg font-bold">Teacher Board</h1>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Title */}

        {/* Content */}
        <div className="p-4 sm:p-6 bg-gray-100 flex-1">
          {/* Page Title */}
          <h1 className="text-xl font-bold text-purple-700 mb-6 hidden lg:block">
            Teacher Dashboard
          </h1>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
            {[
              { title: "Total Students", value: "120", icon: <FaUserGraduate className="text-3xl" />, link: "/teacher-students" },
              { title: "Total Homework", value: "45", icon: <FaTasks className="text-3xl" />, link: "/teacher-homeworklist" },
              { title: "Total Attendance", value: "98%", icon: <FaClipboardList className="text-3xl" />, link: "/teacher-attendance" },
              { title: "Total Leave", value: "12", icon: <FaPlaneDeparture className="text-3xl" />, link: "/teacher-leave" },
              { title: "Total Exams", value: "8", icon: <FaClipboardList className="text-3xl" />, link: "/teacher-marks" },
              { title: "Total Subjects", value: "6", icon: <FaClipboardList className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Projects", value: "5", icon: <FaTasks className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Meetings", value: "15", icon: <FaPlaneDeparture className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Reports", value: "22", icon: <FaTasks className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Feedback", value: "30", icon: <FaClipboardList className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Queries", value: "50", icon: <FaQuestionCircle className="text-3xl" />, link: "/teacher-queries" },
              { title: "Total Holidays", value: "5", icon: <FaCalendarAlt className="text-3xl" />, link: "/teacher-holidays" },


            ].map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between h-full transform hover:scale-105 transition-transform"
              >
                {/* Motion Animation for Icon */}
                <motion.div
                  className="bg-blue-100 text-blue-500 p-3 rounded-full mb-4"
                  animate={{
                    scale: [1, 1.2, 1], // Scale up and down
                    rotate: [0, 10, -10, 0], // Rotate back and forth
                  }}
                  transition={{
                    repeat: Infinity, // Repeat animation
                    duration: 2, // Duration for one cycle
                    ease: "easeInOut",
                  }}
                >
                  {item.icon}
                </motion.div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-700">{item.title}</h2>
                <p className="text-lg sm:text-2xl font-bold text-gray-800">{item.value}</p>
              </NavLink>
            ))}
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Recent Assignments</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-purple-100 text-purple-700">
                  <th className="py-2 px-4 border-b">Assignment</th>
                  <th className="py-2 px-4 border-b">Due Date</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="py-2 px-4 border-b">Math Homework</td>
                  <td className="py-2 px-4 border-b">2025-01-10</td>
                  <td className="py-2 px-4 border-b text-green-500">Completed</td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="py-2 px-4 border-b">Science Project</td>
                  <td className="py-2 px-4 border-b">2025-01-15</td>
                  <td className="py-2 px-4 border-b text-yellow-500">In Progress</td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="py-2 px-4 border-b">History Essay</td>
                  <td className="py-2 px-4 border-b">2025-01-20</td>
                  <td className="py-2 px-4 border-b text-red-500">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Another Table Section (e.g., Student Grades) */}
          <div className="bg-white shadow-md rounded-lg p-2">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Student Grades</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-purple-100 text-purple-700">
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Grade</th>
                  <th className="py-2 px-4 border-b">Subject</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="py-2 px-4 border-b">John Doe</td>
                  <td className="py-2 px-4 border-b">A</td>
                  <td className="py-2 px-4 border-b">Math</td>
                  <td className="py-2 px-4 border-b text-green-500">Passed</td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="py-2 px-4 border-b">Jane Smith</td>
                  <td className="py-2 px-4 border-b">B+</td>
                  <td className="py-2 px-4 border-b">Science</td>
                  <td className="py-2 px-4 border-b text-yellow-500">Passed</td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="py-2 px-4 border-b">Samuel Green</td>
                  <td className="py-2 px-4 border-b">C</td>
                  <td className="py-2 px-4 border-b">History</td>
                  <td className="py-2 px-4 border-b text-red-500">Failed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
