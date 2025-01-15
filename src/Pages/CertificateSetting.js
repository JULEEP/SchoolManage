import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const CertificateSettings = () => {
  const [certificatePrefix, setCertificatePrefix] = useState("");
  const [pageBreakOption, setPageBreakOption] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUpdateSettings = () => {
    console.log("Certificate Number Prefix:", certificatePrefix);
    console.log("Page Break Option:", pageBreakOption);
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
          <h1 className="text-lg font-bold">Certificate Settings</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Certificate Settings</h2>

        {/* Update Settings Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Update Settings</h3>

          {/* Certificate Number Prefix */}
          <div className="mb-6">
            <label
              htmlFor="certificatePrefix"
              className="block text-sm font-medium text-gray-700"
            >
              Certificate Number Prefix
            </label>
            <input
              type="text"
              id="certificatePrefix"
              value={certificatePrefix}
              onChange={(e) => setCertificatePrefix(e.target.value)}
              placeholder="Enter Certificate Number Prefix"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Page Break After Certificate */}
          <div className="mb-6">
            <label
              htmlFor="pageBreakOption"
              className="block text-sm font-medium text-gray-700"
            >
              Page Break After Certificate (Custom Layout)
            </label>
            <select
              id="pageBreakOption"
              value={pageBreakOption}
              onChange={(e) => setPageBreakOption(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Auto">Auto</option>
            </select>
          </div>

          {/* Update Settings Button */}
          <div className="text-right">
            <button
              onClick={handleUpdateSettings}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Update Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateSettings;
