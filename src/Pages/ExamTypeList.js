import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons

const ExamTypeList = () => {
  const [examTypes, setExamTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    // Fetch exam types
    const fetchExamTypes = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/examtypes");
        setExamTypes(response.data.examTypes);
      } catch (error) {
        alert("Failed to fetch exam types.");
      }
    };

    fetchExamTypes();
  }, []);

  // Filter exam types based on search
  const filteredExamTypes = examTypes.filter((examType) =>
    examType.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-lg font-bold">Exam Types List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Main Section */}
        <div className="space-y-4 px-4 lg:px-8 py-4">

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Exam Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-full border border-gray-300 p-2 rounded"
          />

          <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">SL</th>
                  <th className="px-4 py-2 text-left text-gray-600">Exam Name</th>
                  <th className="px-4 py-2 text-left text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredExamTypes.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No Data Available In Table
                    </td>
                  </tr>
                ) : (
                  filteredExamTypes.map((examType, index) => (
                    <tr key={examType.id} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{examType.name}</td>
                      <td className="px-4 py-2">
                        <button className="text-purple-500 hover:text-purple-600">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTypeList;
