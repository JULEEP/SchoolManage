import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const Teacher = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "https://school-backend-1-2xki.onrender.com/api/admin/get-teacher"
      );
      setTeacherList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      alert("Error fetching teachers. Please try again.");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeachers = teacherList.slice(startIndex, endIndex);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Teacher List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title Section */}

        {/* Teacher List Table */}
        <div className="overflow-x-auto mt-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b border-gray-300">SL</th>
                <th className="px-4 py-2 border-b border-gray-300">Teacher Name</th>
                <th className="px-4 py-2 border-b border-gray-300">Email</th>
                <th className="px-4 py-2 border-b border-gray-300">Phone</th>
                <th className="px-4 py-2 border-b border-gray-300">Address</th>
                <th className="px-4 py-2 border-b border-gray-300">Experience</th>
                <th className="px-4 py-2 border-b border-gray-300">Age</th>
                <th className="px-4 py-2 border-b border-gray-300">Gender</th>
                <th className="px-4 py-2 border-b border-gray-300">Education</th>
                <th className="px-4 py-2 border-b border-gray-300">Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.length > 0 ? (
                currentTeachers.map((teacher, index) => (
                  <tr key={teacher._id}>
                    <td className="px-4 py-2 border-b">{startIndex + index + 1}</td>
                    <td className="px-4 py-2 border-b">{teacher.name}</td>
                    <td className="px-4 py-2 border-b">{teacher.email}</td>
                    <td className="px-4 py-2 border-b">{teacher.phone || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.address || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.lastExperience || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.age || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.gender || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.education || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.joiningDate || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-gray-500">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
