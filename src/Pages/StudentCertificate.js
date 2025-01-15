import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const GenerateCertificatePage = () => {
  const [classValue, setClassValue] = useState("");
  const [sectionValue, setSectionValue] = useState("");
  const [examValue, setExamValue] = useState("");
  const [certificateValue, setCertificateValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = () => {
    console.log("Search criteria:", {
      class: classValue,
      section: sectionValue,
      exam: examValue,
      certificate: certificateValue,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Generate Certificate</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Generate Certificate</h2>

        {/* Select Criteria Form */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Criteria</h3>

          {/* Form for Class, Section, Exam, Certificate */}
          <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 mb-6">
            {/* Class Dropdown */}
            <div className="w-full lg:w-1/4">
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                Class *
              </label>
              <select
                id="class"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
              </select>
            </div>

            {/* Section Dropdown */}
            <div className="w-full lg:w-1/4">
              <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                Section
              </label>
              <select
                id="section"
                value={sectionValue}
                onChange={(e) => setSectionValue(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            {/* Exam Dropdown */}
            <div className="w-full lg:w-1/4">
              <label htmlFor="exam" className="block text-sm font-medium text-gray-700">
                Exam
              </label>
              <select
                id="exam"
                value={examValue}
                onChange={(e) => setExamValue(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Exam</option>
                <option value="Mid-Term">Mid-Term</option>
                <option value="Final Exam">Final Exam</option>
                <option value="Unit Test">Unit Test</option>
              </select>
            </div>

            {/* Certificate Dropdown */}
            <div className="w-full lg:w-1/4">
              <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
                Certificate *
              </label>
              <select
                id="certificate"
                value={certificateValue}
                onChange={(e) => setCertificateValue(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Certificate</option>
                <option value="Merit Certificate">Merit Certificate</option>
                <option value="Participation Certificate">Participation Certificate</option>
                <option value="Achievement Certificate">Achievement Certificate</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="text-right">
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificatePage;
