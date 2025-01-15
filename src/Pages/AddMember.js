import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const AddMember = () => {
  const [memberType, setMemberType] = useState("");
  const [memberID, setMemberID] = useState("");
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

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
          <h1 className="text-lg font-bold">Add Member</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-xl text-gray-700 p-6">Add Member</h1>

        <div className="flex flex-col lg:flex-row gap-6 p-4">
          {/* Left Side: Add Member Form */}
          <div className="w-full lg:w-1/3 p-4 bg-gray-100 shadow rounded">
            <h2 className="text-lg text-gray-600 mb-4">Add Member</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Member Type *
                </label>
                <select
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-400"
                  value={memberType}
                  onChange={(e) => setMemberType(e.target.value)}
                >
                  <option value="">Select Member Type</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Member ID *
                </label>
                <input
                  type="text"
                  placeholder="Enter Member ID"
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-400"
                  value={memberID}
                  onChange={(e) => setMemberID(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded"
              >
                Save Member
              </button>
            </form>
          </div>

          {/* Right Side: Issue/Return Book List */}
          <div className="w-full lg:w-2/3 p-4 bg-gray-100 shadow rounded">
            <h2 className="text-lg text-gray-600 mb-4">Issue/Return Book</h2>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded p-2 w-full lg:w-1/2 focus:outline-none focus:border-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">SL</th>
                    <th className="px-4 py-2 text-left text-gray-600">Name</th>
                    <th className="px-4 py-2 text-left text-gray-600">Member Type</th>
                    <th className="px-4 py-2 text-left text-gray-600">Member ID</th>
                    <th className="px-4 py-2 text-left text-gray-600">Email</th>
                    <th className="px-4 py-2 text-left text-gray-600">Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No Data Available In Table
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-4 text-gray-500 text-sm">
              Showing 0 to 0 of 0 entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
