import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Import sidebar toggle icons

const StudentPromote = () => {
  const [academicYear, setAcademicYear] = useState(""); // State for academic year dropdown
  const [promoteSession, setPromoteSession] = useState(""); // State for promote session dropdown
  const [currentClass, setCurrentClass] = useState(""); // State for current class dropdown
  const [section, setSection] = useState(""); // State for section dropdown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleSearch = () => {
    // Logic for handling search (optional)
    console.log("Searching with criteria:", {
      academicYear,
      promoteSession,
      currentClass,
      section,
    });
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
          <h1 className="text-lg font-bold">Student Promote</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Form */}
        <div className="p-6">

          <div className="bg-white p-6 shadow-md rounded space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Academic Year Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Academic Year *</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                >
                  <option value="">Select Academic Year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>

              {/* Promote Session Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Promote Session *</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={promoteSession}
                  onChange={(e) => setPromoteSession(e.target.value)}
                >
                  <option value="">Select Session</option>
                  <option value="session1">Session 1</option>
                  <option value="session2">Session 2</option>
                </select>
              </div>

              {/* Current Class Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Current Class *</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={currentClass}
                  onChange={(e) => setCurrentClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option value="class1">Class 1</option>
                  <option value="class2">Class 2</option>
                  <option value="class3">Class 3</option>
                </select>
              </div>

              {/* Section Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Section</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="">Select Section</option>
                  <option value="sectionA">Section A</option>
                  <option value="sectionB">Section B</option>
                  <option value="sectionC">Section C</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSearch}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded"
              >
                Promote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPromote;
