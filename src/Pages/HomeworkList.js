import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const HomeworkList = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [search, setSearch] = useState(""); // Search query state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Fetch homeworks data from the API
  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/homeworks");
        setHomeworks(response.data); // Set the fetched homeworks to state
      } catch (error) {
        console.error("Error fetching homework data:", error);
      }
    };

    fetchHomeworks();
  }, []);

  const handleInputChange = (e) => {
    setSearch(e.target.value); // Update the search query
  };

  // Filter homeworks based on search query
  const filteredHomeworks = homeworks.filter((hw) =>
    hw.subject && hw.subject.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-lg font-bold">Homework List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-xl text-gray-700 p-6">Homework List</h1>

        {/* Search Bar */}
        <div className="p-6">
          <input
            type="text"
            placeholder="Search by Subject"
            value={search}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Homework List */}
        <div className="p-6">
          {filteredHomeworks.length === 0 ? (
            <p>No homework found.</p>
          ) : (
            <div className="space-y-4">
              {filteredHomeworks.map((homework) => (
                <div key={homework._id} className="bg-white shadow-md rounded-lg p-4">
                  <h2 className="font-bold text-lg">{homework.subject} - {homework.class}</h2>
                  <p className="text-sm text-gray-600">Section: {homework.section}</p>
                  <p className="text-sm text-gray-600">Homework Date: {homework.homeworkDate}</p>
                  <p className="text-sm text-gray-600">Submission Date: {homework.submissionDate}</p>
                  <p className="text-sm text-gray-600">Marks: {homework.marks}</p>
                  <p className="text-sm text-gray-600">{homework.description}</p>
                  <div className="mt-4">
                    {homework.file && (
                      <a
                        href={homework.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Download File
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeworkList;
