import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar icons
import StudentSidebar from "../Sidebar"; // Import the StudentSidebar component

const DailyRoutinePage = () => {
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar toggle

  const studentId = "677904859d0da6e3bee4ba2e"; // Static studentId (could be dynamic based on context)

  // Fetch daily routine when component mounts
  useEffect(() => {
    const fetchRoutine = async () => {
      setLoading(true);
      setError(""); // Reset error message
      try {
        // Fetch the daily routine for the student
        const response = await fetch(
          `https://school-backend-1-2xki.onrender.com/api/students/get-routine/${studentId}`
        );
        const data = await response.json();

        if (response.ok) {
          setRoutine(data.routine || []); // Ensure it's an empty array if not set
        } else {
          setError(data.message || "Error fetching routine");
        }
      } catch (err) {
        setError("An error occurred while fetching the routine");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, []);

  // Toggle Sidebar for Mobile View
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar and Menu Icon */}
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
          <h1 className="text-lg font-bold">Class Routine</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Routine Table */}
        {routine.length > 0 ? (
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Your Class Routine</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-gray-50 rounded-lg">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-3 px-4">Day</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Teacher</th>

                  </tr>
                </thead>
                <tbody>
                  {routine.map((entry) => (
                    <tr key={entry._id}>
                      <td className="py-3 px-4 text-gray-700">{entry.day}</td>
                      <td className="py-3 px-4 text-gray-700">{entry.time}</td>
                      <td className="py-3 px-4 text-gray-700">{entry.subject}</td>
                      <td className="py-3 px-4 text-gray-700">{entry.teacher || null}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !loading && <p className="text-gray-500">No routine found.</p>
        )}

        {/* Loading Message */}
        {loading && <p className="text-gray-500">Loading routine...</p>}
      </div>
    </div>
  );
};

export default DailyRoutinePage;
