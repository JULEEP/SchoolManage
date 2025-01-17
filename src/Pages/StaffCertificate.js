import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const StaffCertificatePage = () => {
  const [role, setRole] = useState("");
  const [certificate, setCertificate] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = () => {
    console.log("Search criteria:", {
      role,
      certificate,
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
        {/* Select Criteria Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Criteria</h3>

          {/* Form for Role and Certificate */}
          <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 mb-6">
            {/* Role Dropdown */}
            <div className="w-full lg:w-1/2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            {/* Certificate Dropdown */}
            <div className="w-full lg:w-1/2">
              <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
                Certificate *
              </label>
              <select
                id="certificate"
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
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

export default StaffCertificatePage;
