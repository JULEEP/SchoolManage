import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Import sidebar toggle icons

const DisabledStudents = () => {
  const [classSelected, setClassSelected] = useState(""); // State for Class dropdown
  const [sectionSelected, setSectionSelected] = useState(""); // State for Section dropdown
  const [nameSearch, setNameSearch] = useState(""); // State for searching by name
  const [admissionNoSearch, setAdmissionNoSearch] = useState(""); // State for searching by admission no
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleSearch = () => {
    // Logic for handling search (optional)
    console.log("Searching with criteria:", {
      classSelected,
      sectionSelected,
      nameSearch,
      admissionNoSearch,
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
          <h1 className="text-lg font-bold">Disabled Students</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Form */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Disabled Students</h1>

          <div className="bg-white p-6 shadow-md rounded space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Class Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Class *</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={classSelected}
                  onChange={(e) => setClassSelected(e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option value="class1">Class 1</option>
                  <option value="class2">Class 2</option>
                  <option value="class3">Class 3</option>
                </select>
              </div>

              {/* Section Dropdown */}
              <div>
                <label className="block text-gray-700 mb-2">Section *</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={sectionSelected}
                  onChange={(e) => setSectionSelected(e.target.value)}
                >
                  <option value="">Select Section</option>
                  <option value="sectionA">Section A</option>
                  <option value="sectionB">Section B</option>
                  <option value="sectionC">Section C</option>
                </select>
              </div>

              {/* Search by Name */}
              <div>
                <label className="block text-gray-700 mb-2">Search By Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Search by name"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />
              </div>

              {/* Search by Admission No */}
              <div>
                <label className="block text-gray-700 mb-2">Search by Admission No</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Search by admission number"
                  value={admissionNoSearch}
                  onChange={(e) => setAdmissionNoSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSearch}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Disabled Students List Section */}
        <div className="bg-white p-6 shadow-md rounded space-y-4">
          {/* Quick Search */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-700">Disabled Students</h2>
            <div className="flex gap-4">
              <input
                type="text"
                className="border border-gray-300 rounded p-2"
                placeholder="Quick Search"
              />
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
                Search
              </button>
            </div>
          </div>

          {/* Student List Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Admission No</th>
                  <th className="border px-4 py-2">Roll No</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Father Name</th>
                  <th className="border px-4 py-2">Date Of Birth</th>
                  <th className="border px-4 py-2">Gender</th>
                  <th className="border px-4 py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2" colSpan="8">
                    No Data Available In Table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <p className="text-gray-700">
              Showing 0 to 0 of 0 entries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisabledStudents;
