import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const OtherDownloadsList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Other Downloads</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Search */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Other Downloads List</h1>
          <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:gap-4">
            <label htmlFor="search" className="text-gray-600 text-sm mb-2 lg:mb-0">Quick Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Search by title or type..."
              className="border border-gray-300 rounded-md p-2 w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left px-4 py-2">SI</th>
                  <th className="text-left px-4 py-2">Content Title</th>
                  <th className="text-left px-4 py-2">Type</th>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Available for</th>
                  <th className="text-left px-4 py-2">Class (Section)</th>
                  <th className="text-left px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* No Data Row */}
                <tr>
                  <td className="px-4 py-2 text-center text-gray-500" colSpan="7">
                    No Data Available In Table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 text-gray-600 text-sm">
            <p>Showing 0 to 0 of 0 entries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDownloadsList;
