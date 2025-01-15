import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const UnassignedStudentList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

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
          <h1 className="text-lg font-bold">Unassigned Student List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Title */}
          <h1 className="text-xl text-gray-700 mb-4">Unassigned Student List</h1>

          {/* Table Section */}
          <div className="bg-white p-6 shadow-md rounded space-y-6">
            <h2 className="text-lg text-gray-700 mb-4">Unassigned Student Records</h2>

            {/* Scrollable Table Wrapper */}
            <div className="overflow-x-auto max-h-96">
              {/* Table */}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left border-b">Admission No</th>
                    <th className="px-4 py-2 text-left border-b">Roll No</th>
                    <th className="px-4 py-2 text-left border-b">Name</th>
                    <th className="px-4 py-2 text-left border-b">Father Name</th>
                    <th className="px-4 py-2 text-left border-b">Date Of Birth</th>
                    <th className="px-4 py-2 text-left border-b">Gender</th>
                    <th className="px-4 py-2 text-left border-b">Type</th>
                    <th className="px-4 py-2 text-left border-b">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {/* When there's no data, show this */}
                  <tr>
                    <td colSpan="8" className="px-4 py-2 text-center text-gray-500 border-b">
                      No Data Available In Table
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination Info */}
            <div className="text-sm text-gray-500 mt-4">
              Showing 0 to 0 of 0 entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnassignedStudentList;
