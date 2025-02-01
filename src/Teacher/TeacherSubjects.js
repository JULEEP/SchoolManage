import React, { useEffect, useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for sidebar toggling

const TeacherSubjects = () => {
  const [subjects, setSubjects] = useState([]); // State to store teacher's subjects
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const teacherId = "679b1272d3974a3ee745f810"; // Static teacherId (could be dynamic based on context)

  // Fetch teacher's subjects from API
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(""); // Reset error
      try {
        // Fetch teacher's subjects from API
        const response = await fetch(`https://school-backend-1-2xki.onrender.com/api/teacher/subjects/${teacherId}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setSubjects(data.subjects); // Set subjects data in state
        } else {
          setError(data.message || "Error fetching subjects");
        }
      } catch (err) {
        setError("An error occurred while fetching subjects");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects(); // Call the function to fetch subjects
  }, [teacherId]); // This effect runs once when the component mounts

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <TeacherSidebar />
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto lg:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Teacher's Subjects</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}

        {/* Subjects Section */}
        <div className="bg-white shadow-md rounded-lg mt-6 p-6">
          <h2 className="text-xl font-medium text-gray-700 mb-4">All Subjects</h2>

          {/* Display error if there is any */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display loading state */}
          {loading && <p className="text-gray-500">Loading subjects...</p>}

          {/* Subject Cards */}
          <div className="space-y-4 lg:space-y-6">
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <div
                  key={index} // Using index since the subject is a string and doesn't have an _id
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:shadow-md flex justify-between items-start h-auto"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{subject}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No subjects available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSubjects;
