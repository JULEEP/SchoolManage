import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const TeacherList = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-64 p-4 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher List</h1>

        <div className="bg-white p-6 rounded-md shadow-md">
        {/* Download CSV Button */}
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={exportToCSV}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none"
          >
            Download CSV
          </button>
        </div>
      
        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">SL</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Phone</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Address</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Experience</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Age</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Gender</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Education</th>
                <th className="border-t border-b border-gray-300 px-4 py-2 text-left">Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.length > 0 ? (
                currentTeachers.map((teacher, index) => (
                  <tr key={teacher._id}>
                    <td className="border-b border-gray-300 px-4 py-2">{startIndex + index + 1}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.name}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.email}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.phone || "N/A"}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.address || "N/A"}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.lastExperience || "N/A"}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.age || "N/A"}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.gender || "N/A"}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.education || "N/A"}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{teacher.joiningDate || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="border-b border-gray-300 px-4 py-2 text-center text-gray-500">
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
  );
};

export default TeacherList;
