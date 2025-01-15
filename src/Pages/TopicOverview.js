import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const TopicOverview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    class: "",
    section: "",
    subject: "",
  });

  const [data, setData] = useState([]);

  const handleSearch = () => {
    setData([
      {
        lesson: "Lesson 1",
        topic: "Topic 1",
        completedDate: "2024-12-01",
        teacher: "Mr. A",
        status: "Completed",
      },
      {
        lesson: "Lesson 2",
        topic: "Topic 2",
        completedDate: "2024-12-05",
        teacher: "Ms. B",
        status: "Pending",
      },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Topic Overview</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-center mb-6">Topic Overview</h2>

          {/* Search Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 shadow-lg rounded-lg">
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md"
                value={searchTerm.class}
                onChange={(e) => setSearchTerm({ ...searchTerm, class: e.target.value })}
              >
                <option value="">Select Class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
              </select>
            </div>
            <div className="p-4 shadow-lg rounded-lg">
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md"
                value={searchTerm.section}
                onChange={(e) => setSearchTerm({ ...searchTerm, section: e.target.value })}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="p-4 shadow-lg rounded-lg">
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md"
                value={searchTerm.subject}
                onChange={(e) => setSearchTerm({ ...searchTerm, subject: e.target.value })}
              >
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mb-6 text-center">
            <button
              className="bg-purple-600 text-white p-2 px-6 rounded-lg shadow-md hover:bg-purple-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <div className="shadow-lg rounded-lg p-4">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Lesson</th>
                    <th className="px-4 py-2 border">Topic</th>
                    <th className="px-4 py-2 border">Completed Date</th>
                    <th className="px-4 py-2 border">Teacher</th>
                    <th className="px-4 py-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-4 py-2 border">{item.lesson}</td>
                        <td className="px-4 py-2 border">{item.topic}</td>
                        <td className="px-4 py-2 border">{item.completedDate}</td>
                        <td className="px-4 py-2 border">{item.teacher}</td>
                        <td className="px-4 py-2 border">{item.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-2 text-center">
                        No Data Available in Table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Entry Display */}
          <div className="text-center mt-4">
            <p>
              Showing {data.length} of {data.length} entries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicOverview;
