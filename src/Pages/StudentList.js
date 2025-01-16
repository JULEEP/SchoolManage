import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-student"
        );
        const data = await response.json();
        if (data.students) {
          setStudents(data.students);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll?.toString().includes(searchTerm)
  );

  const exportToCSV = () => {
    const headers = [
      "SL,First Name,Last Name,Roll,Class,Section,Gender,Date of Birth,Religion,Caste,Blood Group,Category,Height,Weight",
    ];
    const rows = filteredStudents.map((student, index) => [
      index + 1,
      student.firstName || "N/A",
      student.lastName || "N/A",
      student.roll || "N/A",
      student.class || "N/A",
      student.section || "N/A",
      student.gender || "N/A",
      student.dateOfBirth
        ? new Date(student.dateOfBirth).toLocaleDateString()
        : "N/A",
      student.religion || "N/A",
      student.caste || "N/A",
      student.bloodGroup || "N/A",
      student.category || "N/A",
      student.height || "N/A",
      student.weight || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
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
      <div
        className={`flex-grow overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student List</h1>
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search and Export */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={exportToCSV}
            className="ml-4 px-4 py-2 mt-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Export CSV
          </button>
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">First Name</th>
                <th className="px-4 py-2 border-b">Last Name</th>
                <th className="px-4 py-2 border-b">Roll</th>
                <th className="px-4 py-2 border-b">Class</th>
                <th className="px-4 py-2 border-b">Section</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Date of Birth</th>
                <th className="px-4 py-2 border-b">Religion</th>
                <th className="px-4 py-2 border-b">Caste</th>
                <th className="px-4 py-2 border-b">Blood Group</th>
                <th className="px-4 py-2 border-b">Category</th>
                <th className="px-4 py-2 border-b">Height</th>
                <th className="px-4 py-2 border-b">Weight</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student._id}>
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{student.firstName}</td>
                    <td className="px-4 py-2 border-b">{student.lastName}</td>
                    <td className="px-4 py-2 border-b">{student.roll}</td>
                    <td className="px-4 py-2 border-b">{student.class}</td>
                    <td className="px-4 py-2 border-b">{student.section}</td>
                    <td className="px-4 py-2 border-b">{student.gender}</td>
                    <td className="px-4 py-2 border-b">
                      {student.dateOfBirth
                        ? new Date(student.dateOfBirth).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">{student.religion || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{student.caste || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{student.bloodGroup || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{student.category || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{student.height || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{student.weight || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center text-gray-500">
                    No students found.
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

export default StudentList;
