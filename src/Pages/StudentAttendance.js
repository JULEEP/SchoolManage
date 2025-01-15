import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const StudentAttendance = () => {
  const [attendanceDate, setAttendanceDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]); // State to store student data
  const [isImportFormVisible, setIsImportFormVisible] = useState(false); // State to toggle the import form visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  // Fetch student data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/get-student");
        if (response.status === 200) {
          setStudents(response.data.students);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on selected class, section, and attendance status
  const filteredStudents = students.filter((student) => {
    return (
      (selectedClass === "" || student.class === selectedClass) &&
      (selectedSection === "" || student.classSection === selectedSection)
    );
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Attendance</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Title */}
          <h1 className="text-xl text-gray-700 mb-4">Student Attendance</h1>

          {/* Select Criteria Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Class Dropdown */}
            <div className="w-full sm:w-[200px]">
              <label className="block text-gray-700 mb-2">Class *</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
              </select>
            </div>

            {/* Section Dropdown */}
            <div className="w-full sm:w-[200px]">
              <label className="block text-gray-700 mb-2">Section *</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            {/* Attendance Date */}
            <div className="w-full sm:w-[200px]">
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
          <div className="flex gap-4">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded">
              Search
            </button>

            {/* Import Attendance Button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              onClick={() => setIsImportFormVisible(!isImportFormVisible)} // Toggle import form visibility
            >
              + Import Attendance
            </button>
          </div>

          {/* Import Attendance Form */}
          {isImportFormVisible && (
            <div className="bg-white p-6 mt-6 shadow-md rounded space-y-6">
              <h2 className="text-lg text-gray-700 mb-4">Import Attendance</h2>

              {/* Select Criteria Form in one row */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="w-full sm:w-[200px]">
                  <label className="block text-gray-700 mb-2">Class *</label>
                  <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                  </select>
                </div>

                <div className="w-full sm:w-[200px]">
                  <label className="block text-gray-700 mb-2">Section *</label>
                  <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div className="w-full sm:w-[200px]">
                  <label className="block text-gray-700 mb-2">Attendance Date *</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded p-2"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                </div>

                <div className="w-full sm:w-[200px]">
                  <label className="block text-gray-700 mb-2">Excel File (xlsx, csv) *</label>
                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded p-2"
                    accept=".xlsx, .csv"
                  />
                </div>
              </div>

              {/* Import Attendance Button */}
              <div className="flex justify-end">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded">
                  Import Attendance
                </button>
              </div>
            </div>
          )}

          {/* Attendance Table */}
          <div className="bg-white p-6 mt-6 shadow-md rounded space-y-6">
            <h2 className="text-lg text-gray-700 mb-4">Attendance Records</h2>

            {/* Scrollable Table Wrapper */}
            <div className="overflow-x-auto max-h-96">
              {/* Table */}
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
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student._id}>
                        <td className="px-4 py-2 border-b">{student.admissionNumber || "N/A"}</td>
                        <td className="px-4 py-2 border-b">{`${student.firstName} ${student.lastName}`}</td>
                        <td className="px-4 py-2 border-b">{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "N/A"}</td>
                        <td className="px-4 py-2 border-b">{student.gender}</td>
                        <td className="px-4 py-2 border-b">{student.attendanceStatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-2 text-center text-gray-500 border-b">
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Info */}
            <div className="text-sm text-gray-500 mt-4">
              Showing {filteredStudents.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
