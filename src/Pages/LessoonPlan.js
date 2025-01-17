import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const LessonPlanCreate = () => {
  const [teacher, setTeacher] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = () => {
    console.log("Selected Teacher:", teacher);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
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
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Create Lesson Plan</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Title */}

          {/* Select Criteria Section */}
          <div className="p-4 shadow-lg rounded-lg mb-6 bg-white">
            <label className="block text-sm font-medium text-gray-700">Teacher *</label>
            <select
              className="mt-1 block w-full p-2 border rounded-md"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            >
              <option value="" disabled>
                Select Teacher
              </option>
              <option value="Mr. A">Mr. A</option>
              <option value="Ms. B">Ms. B</option>
              <option value="Dr. C">Dr. C</option>
              <option value="Prof. D">Prof. D</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="text-center mb-6">
            <button
              className="bg-purple-600 text-white p-2 px-6 rounded-lg shadow-md hover:bg-purple-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlanCreate;
