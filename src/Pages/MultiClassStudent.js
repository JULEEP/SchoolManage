import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const MultiClassStudent = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [classValue, setClassValue] = useState("");
  const [section, setSection] = useState("");
  const [search, setSearch] = useState("");
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
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-student"
        );
        if (response.status === 200) {
          setStudents(response.data.students);
        } else {
          setError(response.data.message || "Error fetching students");
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
          <h1 className="text-lg font-bold">Multi Class Student</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700">Academic Year</label>
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
              <label className="block text-gray-700">Class</label>
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
              <label className="block text-gray-700">Section</label>
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

          {/* Search Button */}
          <div className="flex justify-end mt-4 mb-6">
            <button className="bg-purple-500 text-white px-6 py-2 rounded">
              Search
            </button>
          </div>

          {/* Student List Section */}
          <div className="bg-white p-4 sm:p-6 shadow-md rounded">
            <h2 className="text-lg text-gray-700 mb-4">Student List</h2>

            {/* Loading Indicator */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Table for Student List */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Admission No</th>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Class(Section)</th>
                  <th className="border px-4 py-2 text-left">Gender</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter(
                    (student) =>
                      (academicYear === "" || student.class === academicYear) &&
                      (classValue === "" || student.class === classValue) &&
                      (section === "" || student.classSection.includes(section)) &&
                      (search === "" ||
                        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
                        student.lastName.toLowerCase().includes(search.toLowerCase()))
                  )
                  .map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{student.admissionNumber || "N/A"}</td>
                      <td className="border px-4 py-2">{`${student.firstName} ${student.lastName}`}</td>
                      <td className="border px-4 py-2">{student.class}</td>
                      <td className="border px-4 py-2">{student.gender}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiClassStudent;
