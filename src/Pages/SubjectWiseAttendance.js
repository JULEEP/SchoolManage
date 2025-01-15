import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios"; // Add axios for making API requests
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons

const SubjectWiseAttendance = () => {
  const [classSelected, setClassSelected] = useState(""); // State for Class dropdown
  const [sectionSelected, setSectionSelected] = useState(""); // State for Section dropdown
  const [subjectSelected, setSubjectSelected] = useState(""); // State for Subject dropdown
  const [attendanceDate, setAttendanceDate] = useState(""); // State for Attendance Date
  const [attendanceData, setAttendanceData] = useState([]); // State to store fetched attendance data
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error message
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleSearch = async () => {
    try {
      // Make an API request with selected filters
      const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/subject-wise-attend", {
        params: {
          class: classSelected,
          section: sectionSelected,
          subject: subjectSelected,
          attendanceDate: attendanceDate,
        },
      });

      // Handle successful response
      setAttendanceData(response.data.attendanceData); // Store the fetched attendance data
      setErrorMessage(""); // Reset error message

    } catch (error) {
      // Handle error in fetching data
      setErrorMessage(error.response?.data?.message || "An error occurred while fetching the data.");
      setAttendanceData([]); // Clear previous data
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
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
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Subject Wise Attendance</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Form */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Subject Wise Attendance</h1>

          <div className="bg-white p-6 shadow-md rounded space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Class Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Class *</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={classSelected}
                  onChange={(e) => setClassSelected(e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option value="class1">Class 1</option>
                  <option value="class2">Class 2</option>
                  <option value="class3">Class 3</option>
                </select>
              </div>

              {/* Section Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Section *</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={sectionSelected}
                  onChange={(e) => setSectionSelected(e.target.value)}
                >
                  <option value="">Select Section</option>
                  <option value="sectionA">Section A</option>
                  <option value="sectionB">Section B</option>
                  <option value="sectionC">Section C</option>
                </select>
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Subject *</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={subjectSelected}
                  onChange={(e) => setSubjectSelected(e.target.value)}
                >
                  <option value="">Select Subject</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                </select>
              </div>

              {/* Attendance Date */}
              <div>
                <label className="block text-gray-700 mb-2">Attendance Date *</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded p-2"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSearch}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 mt-4">
            {errorMessage}
          </div>
        )}

        {/* Attendance Data Table */}
        {attendanceData.length > 0 && (
          <div className="bg-white p-6 mt-6 shadow-md rounded space-y-6">
            <h2 className="text-lg text-gray-700 mb-4">Attendance Records</h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left border-b">Admission No</th>
                  <th className="px-4 py-2 text-left border-b">Name</th>
                  <th className="px-4 py-2 text-left border-b">Date of Birth</th>
                  <th className="px-4 py-2 text-left border-b">Gender</th>
                  <th className="px-4 py-2 text-left border-b">Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((student, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{student.admissionNumber || "-"}</td>
                    <td className="px-4 py-2 border-b">{student.firstName} {student.lastName}</td>
                    <td className="px-4 py-2 border-b">{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "-"}</td>
                    <td className="px-4 py-2 border-b">{student.gender || "-"}</td>
                    <td className="px-4 py-2 border-b">{student.attendanceStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectWiseAttendance;
