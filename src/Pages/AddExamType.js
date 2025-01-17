import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons

const AddExamType = () => {
  const [examName, setExamName] = useState("");
  const [examTypes, setExamTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Handle Save Exam Type
  const handleSaveExamType = async () => {
    if (examName) {
      try {
        const response = await axios.post("https://school-backend-1-2xki.onrender.com/api/admin/examtype", {
          examName: examName,
        });

        if (response.status === 201) {
          // Add the new exam type to the local state
          const newExamType = response.data.examType;
          setExamTypes([...examTypes, { id: newExamType._id, name: newExamType.examName }]);
          setExamName(""); // Clear the input field after saving
        } else {
          alert("Failed to add exam type.");
        }
      } catch (error) {
        alert(`Error adding exam type: ${error.response?.data?.message || error.message}`);
      }
    } else {
      alert("Please enter an exam name.");
    }
  };

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
          <h1 className="text-lg font-bold">Add Exam Type</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Main Form Section */}
        <div className="space-y-4 px-4 lg:px-8 py-4">
          <h1 className="text-xl text-gray-700 mb-4">Exam Type</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Add Exam Type Form */}
            <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded shadow mb-6 lg:mb-0">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Exam Name *</label>
                  <input
                    type="text"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter Exam Name"
                  />
                </div>

                <button
                  onClick={handleSaveExamType}
                  className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                >
                  Save Exam Type
                </button>
              </div>
            </div>

            {/* Right Side - Exam Type List */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-lg text-gray-600 mb-4">Exam Type List</h2>

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

              {/* Footer */}
              <div className="mt-4 text-gray-500 text-sm">
                Showing {filteredExamTypes.length} entries
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExamType;
