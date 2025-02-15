import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi"; // Import menu icon for mobile
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons
import ParentSidebar from "./ParentSidebar";

const ParentSubjectDetails = () => {
  const [subjects, setSubjects] = useState([]); // State to store the subjects
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const studentId = "676cf56dfd1eb1caa8426205"; // Static studentId (could be dynamic based on context)

  // Fetch subject details from API
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(""); // Reset error
      try {
        // Fetch subject details from API
        const response = await fetch(`https://school-backend-1-2xki.onrender.com/api/students/subjects/${studentId}`);
        const data = await response.json();

        if (response.ok) {
          setSubjects(data.student.subjects); // Set subjects data in state
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
  }, [studentId]); // This effect runs once when the component mounts

  // Toggle Sidebar for Mobile View
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ParentSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Subject Details</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}

        {/* Class and Section */}
        <h2 className="text-xl font-medium text-gray-700 mb-6 mt-6 ml-2">Class: 5 (A)</h2>

        {/* Subject Details Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject Details</h3>

          {/* Display error if there is any */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display loading state */}
          {loading && <p className="text-gray-500">Loading subjects...</p>}

          {/* Subject Details Row */}
          <div className="flex flex-col lg:flex-row justify-between space-x-8">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <div key={subject._id} className="flex-1 flex justify-between items-center mb-4 lg:mb-0">
                  {/* Subject Column */}
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-gray-700">Subject</span>
                    <p className="text-gray-600">{subject.subjectName}</p>
                  </div>

                  {/* Teacher Column */}
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-gray-700">Teacher</span>
                    <p className="text-gray-600">{subject.teacher}</p>
                  </div>

                  {/* Subject Type Column */}
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-gray-700">Subject Type</span>
                    <p className="text-gray-600">{subject.subjectType}</p>
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



export default ParentSubjectDetails;
