import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import {
  FaUserGraduate,
  FaTasks,
  FaClipboardList,
  FaPlaneDeparture,
  FaBars,
  FaTimes,
  FaQuestionCircle,
  FaCalendarAlt,
  FaLaptopCode,
  FaBusAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import TeacherSidebar from "./TeacherSidebar";
import IntroJs from "intro.js";
import "intro.js/introjs.css"; // Intro.js CSS import
import { Box, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transportData, setTransportData] = useState([]);

  useEffect(() => {
    // Fetch transport data and initialize IntroJs steps
    const fetchTransportData = async () => {
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-transport-route");
        const data = await response.json();
        const currentDate = new Date().toISOString().split('T')[0];
        const filteredRoutes = data.routes.filter(route => route.date.split('T')[0] === currentDate);
        setTransportData(filteredRoutes);
      } catch (error) {
        console.error("Error fetching transport data:", error);
      }
    };

    fetchTransportData();

    const steps = [
      { title: "Total Students", element: ".category-box-0", intro: "This is the Total Students section." },
      { title: "Total Homework", element: ".category-box-1", intro: "This is the Total Homework section." },
      { title: "Total Attendance", element: ".category-box-2", intro: "This is the Total Attendance section." },
      { title: "Total Leave", element: ".category-box-3", intro: "This is the Total Leave section." },
      { title: "Total Subjects", element: ".category-box-4", intro: "This is the Total Subjects section." },
      { title: "Total Projects", element: ".category-box-5", intro: "This is the Total Projects section." },
      { title: "Total Meetings", element: ".category-box-6", intro: "This is the Total Meetings section." },
      { title: "Total Reports", element: ".category-box-7", intro: "This is the Total Reports section." },
      { title: "Total Feedback", element: ".category-box-8", intro: "This is the Total Feedback section." },
      { title: "Total Queries", element: ".category-box-9", intro: "This is the Total Queries section." },
      { title: "Total Holidays", element: ".category-box-10", intro: "This is the Total Holidays section." },
      { title: "Teacher Transport", element: ".category-box-11", intro: "This is the Teacher Transport section." },
    ];

    const intro = IntroJs();
    intro.setOptions({
      steps: [
        ...steps,
        {
          element: ".intro-step-table",  // Table Section highlight
          intro: "Here are the recent assignments that you can review.",
          position: "top"
        },
        {
          element: ".intro-step-transport", // Highlight the Transport Routes Table
          intro: "This section shows the transport routes, drivers, and stops for today.",
          position: "top"
        },
        {
          element: ".intro-step-grades", // Highlight the Student Grades Table
          intro: "This section shows the student grades, subject, and their status.",
          position: "top"
        },    
      ],
      highlightClass: "rounded",
      nextLabel: "Next",
      prevLabel: "Previous",
      overlayOpacity: 0.8,
    });

    intro.onbeforechange(() => {
      const highlightElements = document.querySelectorAll('.introjs-overlay');
      highlightElements.forEach(el => {
        el.style.backgroundColor = 'purple';
        el.style.color = 'white';
      });
    });

    intro.start();
  }, []); // Empty dependency array ensures this effect runs only once

    
    
    

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
    {/* Sidebar Overlay */}
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
      onClick={toggleSidebar}
    ></div>
  
    {/* Sidebar */}
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <TeacherSidebar />
    </div>
  
    {/* Main Content */}
    <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} h-screen`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
        <h1 className="text-lg font-bold">Teacher Dashboard</h1>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>


        {/* Title */}
        <div className="p-4 sm:p-6 bg-gray-100 flex-1">
          {/* Page Title */}
          <h1 className="text-xl font-bold text-purple-700 mb-6 hidden lg:block">
            Teacher Dashboard
          </h1>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
            {[{ title: "Total Students", value: "0", icon: <FaUserGraduate className="text-3xl" />, link: "/teacher-students" },
              { title: "Total Homework", value: "0", icon: <FaTasks className="text-3xl" />, link: "/teacher-homeworklist" },
              { title: "Total Attendance", value: "0", icon: <FaClipboardList className="text-3xl" />, link: "/teacher-attendance" },
              { title: "Total Leave", value: "0", icon: <FaPlaneDeparture className="text-3xl" />, link: "/teacher-leave" },
              { title: "Total Subjects", value: "0", icon: <FaClipboardList className="text-3xl" />, link: "/teacher-subjects" },
              { title: "Total Projects", value: "0", icon: <FaTasks className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Meetings", value: "0", icon: <FaPlaneDeparture className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Reports", value: "0", icon: <FaTasks className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Feedback", value: "0", icon: <FaClipboardList className="text-3xl" />, link: "/teacher-coming-soon" },
              { title: "Total Queries", value: "0", icon: <FaQuestionCircle className="text-3xl" />, link: "/teacher-queries" },
              { title: "Total Holidays", value: "0", icon: <FaCalendarAlt className="text-3xl" />, link: "/teacher-holidays" },
              { title: "Live Classes", value: "0", icon: <FaLaptopCode className="text-3xl" />, link: "/generateid" },
              { title: "Transport", value: "0", icon: <FaBusAlt className="text-3xl" />, link: "/teacher-transport" },



            ].map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                className={`category-box-${index} bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between h-full transform hover:scale-105 transition-transform`}
              >
                <motion.div
                  className="bg-blue-100 text-blue-500 p-3 rounded-full mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
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
<div className="intro-step-table bg-white shadow-md rounded-lg p-6 mb-6">
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

          {/* Transport Routes Table */}
<Box
mb={4}
style={{ backgroundColor: "#fff3e6", padding: "20px", borderRadius: "10px" }}
className="intro-step-transport" // Add this class for highlighting
>
<h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Transport Routes (Today)</h3>
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Route</TableCell>
        <TableCell>Driver</TableCell>
        <TableCell>Driver's Number</TableCell>
        <TableCell>Stop Name</TableCell>
        <TableCell>Arrival Time</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {transportData.map((route, index) => (
        route.stops.map((stop, stopIndex) => (
          <TableRow key={`${index}-${stopIndex}`}>
            <TableCell>{route.routeTitle}</TableCell>
            <TableCell>{route.driver.name}</TableCell>
            <TableCell>{route.driver.mobileNumber}</TableCell>
            <TableCell>{stop.stopName}</TableCell>
            <TableCell>{stop.arrivalTime}</TableCell>
          </TableRow>
        ))
      ))}
    </TableBody>
  </Table>
</TableContainer>
</Box>


          {/* Another Table Section (e.g., Student Grades) */}
          <div className="bg-white shadow-md rounded-lg p-2 intro-step-grades">
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
