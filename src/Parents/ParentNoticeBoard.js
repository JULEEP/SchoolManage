import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons
import ParentSidebar from "./ParentSidebar";

const ParentNoticeBoard = () => {
  const [notices, setNotices] = useState([]); // State to store the notices
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // Fetch notices from API
  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError(""); // Reset error
      try {
        // Fetch notices from API
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-notices");
        const data = await response.json();

        if (response.ok) {
          setNotices(data.notices); // Set notices data in state
        } else {
          setError(data.message || "Error fetching notices");
        }
      } catch (err) {
        setError("An error occurred while fetching notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices(); // Call the function to fetch notices
  }, []); // This effect runs once when the component mounts

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
          <h1 className="text-lg font-bold">Notice Board</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-medium text-gray-700 mb-6 mt-6 ml-2">All Notices</h2>

        {/* Notices Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          {/* Display error if there is any */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display loading state */}
          {loading && <p className="text-gray-500">Loading notices...</p>}

          {/* Notices Cards */}
          <div className="space-y-4">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div
                  key={notice._id}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:shadow-md flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{notice.title || "No Title"}</h3>
                    <p className="text-gray-700 mt-2">{notice.description || "No description available."}</p>
                  </div>
                  <div className="text-sm text-gray-500 mt-4 ml-4 flex flex-col items-end">
                    <span className="font-medium">Publish Date:</span>
                    <span>{notice.date ? new Date(notice.date).toLocaleDateString() : "N/A"}</span>

                    {/* Show the postedBy field */}
                    <span className="mt-2 text-gray-600">
                      <strong>Posted By:</strong> {notice.postedBy || "Unknown"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notices available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



export default ParentNoticeBoard;
