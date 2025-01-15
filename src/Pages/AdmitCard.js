import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa'; // For sidebar toggle icons

const GenerateAdmitCard = () => {
  const [exam, setExam] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const handleSearch = () => {
    // Logic to generate the admit card based on criteria
    console.log('Search triggered with criteria:', { exam, className, section });
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
          <h1 className="text-lg font-bold">Generate Admit Card</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 p-4 lg:p-6">Generate Admit Card</h1>

        {/* Select Criteria */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {/* Select Exam */}
            <div className="w-full">
              <label htmlFor="exam" className="block text-sm text-gray-600 mb-1">Select Exam</label>
              <select
                id="exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Exam</option>
                <option value="mid-term">Mid Term</option>
                <option value="final-term">Final Term</option>
              </select>
            </div>

            {/* Select Class */}
            <div className="w-full">
              <label htmlFor="className" className="block text-sm text-gray-600 mb-1">Select Class</label>
              <select
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Class</option>
                <option value="one">Class One</option>
                <option value="two">Class Two</option>
              </select>
            </div>

            {/* Select Section */}
            <div className="w-full">
              <label htmlFor="section" className="block text-sm text-gray-600 mb-1">Select Section</label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Section</option>
                <option value="a">Section A</option>
                <option value="b">Section B</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="w-full flex items-center justify-center">
              <button
                onClick={handleSearch}
                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 w-full"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results or Report Section */}
        <div className="mt-6">
          {/* You can show the admit card details after the search button is clicked */}
          <div className="text-center text-gray-700">Admit Card details will appear here after search</div>
        </div>
      </div>
    </div>
  );
};

export default GenerateAdmitCard;
