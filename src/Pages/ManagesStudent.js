import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const ManageStudent = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [classValue, setClassValue] = useState("");
  const [section, setSection] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const [searchByRoll, setSearchByRoll] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  // Fetch students data from API
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-student"
        );
        const data = await response.json();
        if (response.ok) {
          setStudents(data.students);
        } else {
          setError(data.message || "Error fetching students");
        }
      } catch (error) {
        setError("Error fetching students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

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
          <h1 className="text-lg font-bold">Manage Student</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700">Academic Year *</label>
              <select
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option value="">Select Academic Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Class *</label>
              <select
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Section *</label>
              <select
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          {/* Search Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700">Search By Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                placeholder="Name"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Search By Roll</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                placeholder="Roll"
                value={searchByRoll}
                onChange={(e) => setSearchByRoll(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button className="bg-purple-500 text-white px-6 py-2 rounded">
                Search
              </button>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 shadow-md rounded">
          <h2 className="text-lg text-gray-700 mb-4">Student List</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="w-full border-collapse overflow-x-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Admission No</th>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Father Name</th>
                  <th className="border px-4 py-2 text-left">DOB</th>
                  <th className="border px-4 py-2 text-left">Class(Section)</th>
                  <th className="border px-4 py-2 text-left">Gender</th>
                  <th className="border px-4 py-2 text-left">Category</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter(
                    (student) =>
                      (searchByName === "" ||
                        student.firstName.toLowerCase().includes(searchByName.toLowerCase())) &&
                      (searchByRoll === "" ||
                        student.admissionNumber.includes(searchByRoll))
                  )
                  .map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{student.admissionNumber}</td>
                      <td className="border px-4 py-2">{student.firstName} {student.lastName}</td>
                      <td className="border px-4 py-2">{student.fatherName}</td>
                      <td className="border px-4 py-2">
                        {student.dateOfBirth
                          ? new Date(student.dateOfBirth).toLocaleDateString()
                          : ""}
                      </td>
                      <td className="border px-4 py-2">{student.class}</td>
                      <td className="border px-4 py-2">{student.gender}</td>
                      <td className="border px-4 py-2">{student.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>        
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
