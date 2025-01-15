import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const TeacherList = () => {
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
  const totalPages = Math.ceil(teacherList.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ["SL,Name,Email,Phone,Address,Experience,Age,Gender,Education,Joining Date"];
    const rows = teacherList.map((teacher, index) => [
      index + 1,
      teacher.name || "N/A",
      teacher.email || "N/A",
      teacher.phone || "N/A",
      teacher.address || "N/A",
      teacher.lastExperience || "N/A",
      teacher.age || "N/A",
      teacher.gender || "N/A",
      teacher.education || "N/A",
      teacher.joiningDate || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "teachers_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Teacher List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-center text-3xl font-semibold text-gray-500 mb-6">Teacher List</h2>

          {/* Download CSV Button */}
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={exportToCSV}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none"
            >
              Download CSV
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-6 py-3 text-left">SL</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-left">Address</th>
                    <th className="px-6 py-3 text-left">Experience</th>
                    <th className="px-6 py-3 text-left">Age</th>
                    <th className="px-6 py-3 text-left">Gender</th>
                    <th className="px-6 py-3 text-left">Education</th>
                    <th className="px-6 py-3 text-left">Joining Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTeachers.length > 0 ? (
                    currentTeachers.map((teacher, index) => (
                      <tr key={teacher._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3">{startIndex + index + 1}</td>
                        <td className="px-6 py-3">{teacher.name || "N/A"}</td>
                        <td className="px-6 py-3">{teacher.email || "N/A"}</td>
                        <td className="px-6 py-3">{teacher.phone || "N/A"}</td>
                        <td className="px-6 py-3">{teacher.address || "N/A"}</td>
                        <td className="px-6 py-3">{teacher.lastExperience || "N/A"}</td>
                        <td className="px-6 py-3">{teacher.age || "N/A"}</td>
                        <td className="px-6 py-3">{teacher.gender || "N/A"}</td>
                        <td className="px-6 py-3">{teacher.education || "N/A"}</td>
                        <td className="px-6 py-3">{teacher.joiningDate || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="px-6 py-3 text-center text-gray-500">
                        No teachers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
