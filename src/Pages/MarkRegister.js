import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // For sidebar toggle icons

const MarksRegister = () => {
  const [exam, setExam] = useState("");
  const [classType, setClassType] = useState("");
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const handleSearch = () => {
    // Logic to handle search
    console.log({ exam, classType, subject, section });
  };

  return (
    <div className="flex min-h-screen">
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
          <h1 className="text-lg font-bold">Marks Register</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}

        {/* Select Criteria Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* Exam Dropdown */}
            <div className="w-full">
              <label htmlFor="exam" className="block text-sm text-gray-600 mb-1">Exam *</label>
              <select
                id="exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Exam</option>
                <option value="mid-term">Mid-Term</option>
                <option value="final">Final</option>
                <option value="semester">Semester</option>
              </select>
            </div>

            {/* Class Dropdown */}
            <div className="w-full">
              <label htmlFor="class" className="block text-sm text-gray-600 mb-1">Class *</label>
              <select
                id="class"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Class</option>
                <option value="class-1">Class 1</option>
                <option value="class-2">Class 2</option>
                <option value="class-3">Class 3</option>
              </select>
            </div>

            {/* Subject Dropdown */}
            <div className="w-full">
              <label htmlFor="subject" className="block text-sm text-gray-600 mb-1">Subject *</label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Subject</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="english">English</option>
              </select>
            </div>

            {/* Section Dropdown */}
            <div className="w-full">
              <label htmlFor="section" className="block text-sm text-gray-600 mb-1">Section *</label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          {/* Add Marks Button */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleSearch}
              className="w-full bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
            >
              Add Marks
            </button>
          </div>

          {/* Search Button */}
          <div className="flex justify-start">
            <button
              onClick={handleSearch}
              className="w-full bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarksRegister;
