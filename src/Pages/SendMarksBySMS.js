import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const SendMarksBySms = () => {
  const [exam, setExam] = useState('');
  const [className, setClassName] = useState('');
  const [receiver, setReceiver] = useState('students');
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleSendMarks = () => {
    // Logic to send marks via SMS
    console.log('Marks sent via SMS');
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
          <h1 className="text-lg font-bold">Send Marks By SMS</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Form */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">Send Marks By SMS</h1>

          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Send Marks Via SMS</h2>

            {/* Main form container */}
            <div className="flex flex-col sm:flex-row sm:gap-6 sm:items-center">
              {/* Select Exam */}
              <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
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
              <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
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

              {/* Select Receiver */}
              <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
                <label htmlFor="receiver" className="block text-sm text-gray-600 mb-1">Select Receiver</label>
                <select
                  id="receiver"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="students">Students</option>
                  <option value="parents">Parents</option>
                </select>
              </div>

              {/* Send Button */}
              <div className="w-full sm:w-1/4">
                <button
                  onClick={handleSendMarks}
                  className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 w-full"
                >
                  Send Marks Via SMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMarksBySms;
