import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons
import StudentSidebar from "../Sidebar"; // Import the StudentSidebar component

const StudentHomeworkList = () => {
  const [homework, setHomework] = useState([]); // Homework state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  const studentId = "676bb21bd06928a8432c676a"; // Static studentId (change if needed)

  // Fetch homework when component mounts
  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const response = await fetch(
          `https://school-backend-1-2xki.onrender.com/api/students/get-homework/${studentId}`
        );
        const data = await response.json();

        if (response.ok) {
          setHomework(data);
        } else {
          setError(data.message || "Error fetching homework");
        }
      } catch (err) {
        setError("An error occurred while fetching homework");
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, [studentId]);

  // Toggle Sidebar for Mobile View
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Handle Loading/Error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto lg:ml-64">
        {/* Header for Mobile */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Homework List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Heading */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">10 (A)</h2>
          <div className="my-4 border-t border-gray-300"></div>

          {/* Week Section */}

          {/* Homework Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-400">Subject</th>
                  <th className="px-4 py-2 text-left text-gray-400">Marks</th>
                  <th className="px-4 py-2 text-left text-gray-400">Homework Date</th>
                  <th className="px-4 py-2 text-left text-gray-400">Submission Date</th>
                  <th className="px-4 py-2 text-left text-gray-400">Evaluation Date</th>
                  <th className="px-4 py-2 text-left text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Render each homework dynamically */}
                {homework.length > 0 ? (
                  homework.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-600">{item.subject}</td>
                      <td className="px-4 py-2 text-gray-600">{item.marks}</td>
                      <td className="px-4 py-2 text-gray-600">
                        {item.homeworkDate
                          ? new Date(item.homeworkDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2 text-gray-600">
                        {item.submissionDate
                          ? new Date(item.submissionDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2 text-gray-600">
                        {item.updatedAt
                          ? new Date(item.updatedAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{item.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-2 text-center text-gray-600">
                      No Homework Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHomeworkList;
