import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const UnassignedStudentList = () => {
  const [students, setStudents] = useState([
    { admissionNo: "89964", rollNo: "1", name: "John Doe", fatherName: "Mr. Doe", dob: "2005-10-15", gender: "Male", type: "Regular", phone: "1234567890" },
    { admissionNo: "89965", rollNo: "2", name: "Jane Smith", fatherName: "Mr. Smith", dob: "2006-08-22", gender: "Female", type: "Regular", phone: "2345678901" },
    // Add more sample students as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo?.toString().includes(searchTerm)
  );

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
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Unassigned Student List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded-md w-1/3 mt-4 ml-2"
          />
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">Admission No</th>
                <th className="px-4 py-2 border-b">Roll No</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Father's Name</th>
                <th className="px-4 py-2 border-b">DOB</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Type</th>
                <th className="px-4 py-2 border-b">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.admissionNo}>
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{student.admissionNo}</td>
                    <td className="px-4 py-2 border-b">{student.rollNo}</td>
                    <td className="px-4 py-2 border-b">{student.name}</td>
                    <td className="px-4 py-2 border-b">{student.fatherName}</td>
                    <td className="px-4 py-2 border-b">{student.dob ? new Date(student.dob).toLocaleDateString() : "N/A"}</td>
                    <td className="px-4 py-2 border-b">{student.gender}</td>
                    <td className="px-4 py-2 border-b">{student.type}</td>
                    <td className="px-4 py-2 border-b">{student.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500">
                    No students found.
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
  );
};

export default UnassignedStudentList;
