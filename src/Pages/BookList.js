import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const BookList = () => {
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
          <h1 className="text-lg font-bold">Book List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-xl text-gray-700 p-6">Book List</h1>

        {/* Book List Table */}
        <div className="p-4 bg-gray-100 rounded shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">SL</th>
                  <th className="px-4 py-2 text-left text-gray-600">Book Title</th>
                  <th className="px-4 py-2 text-left text-gray-600">Book No</th>
                  <th className="px-4 py-2 text-left text-gray-600">ISBN No</th>
                  <th className="px-4 py-2 text-left text-gray-600">Category</th>
                  <th className="px-4 py-2 text-left text-gray-600">Publisher Name</th>
                  <th className="px-4 py-2 text-left text-gray-600">Author Name</th>
                  <th className="px-4 py-2 text-left text-gray-600">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
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
  );
};

export default BookList;
