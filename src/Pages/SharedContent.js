import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const SharedContentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sharedContentList, setSharedContentList] = useState([
    {
      id: 1,
      title: "Content 1",
      sendTo: "Student A",
      shareDate: "2024-12-01",
      validUpto: "2024-12-31",
      sharedBy: "Admin",
      description: "Description of Content 1",
    },
    {
      id: 2,
      title: "Content 2",
      sendTo: "Teacher B",
      shareDate: "2024-12-05",
      validUpto: "2024-12-20",
      sharedBy: "Admin",
      description: "Description of Content 2",
    },
  ]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
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
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Shared Content</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Search Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Shared Content</h2>
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <input
                type="text"
                placeholder="Search by Title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow p-2 border rounded-md"
              />
              <button onClick={handleSearch} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Search
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Content List</h3>

            {/* Table */}
            <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">SL</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Send To</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Share Date</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Valid Upto</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Shared By</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {sharedContentList.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      No Data Available In Table
                    </td>
                  </tr>
                ) : (
                  sharedContentList.map((content, index) => (
                    <tr key={content.id}>
                      <td className="p-2 text-sm text-gray-700">{index + 1}</td>
                      <td className="p-2 text-sm text-gray-700">{content.title}</td>
                      <td className="p-2 text-sm text-gray-700">{content.sendTo}</td>
                      <td className="p-2 text-sm text-gray-700">{content.shareDate}</td>
                      <td className="p-2 text-sm text-gray-700">{content.validUpto}</td>
                      <td className="p-2 text-sm text-gray-700">{content.sharedBy}</td>
                      <td className="p-2 text-sm text-gray-700">{content.description}</td>
                      <td className="p-2 text-sm text-gray-700">
                        <button className="text-blue-600 hover:underline">View</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing 0 to 0 of {sharedContentList.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedContentPage;
