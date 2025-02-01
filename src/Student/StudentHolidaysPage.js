import React, { useState, useEffect } from 'react';
import StudentSidebar from "../Sidebar"; // Import the Sidebar component
import { FaBars, FaTimes } from 'react-icons/fa';

const StudentHolidayPage = () => {
  const [holidays, setHolidays] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch holiday data from API
  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      setError(""); // Reset any previous error
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/holidays");
        const data = await response.json();

        if (response.ok) {
          setHolidays(data.holidays || []); // Set holidays data from API response
        } else {
          setError("Failed to load holidays.");
        }
      } catch (err) {
        setError("An error occurred while fetching holidays.");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Holidays</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Holiday List Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Holiday List</h2>
            <div className="overflow-x-auto"> {/* This div enables horizontal scrolling */}
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-6 py-3 text-left">Holiday Name</th>
                    <th className="px-6 py-3 text-left">From Date</th>
                    <th className="px-6 py-3 text-left">To Date</th>
                    <th className="px-6 py-3 text-left">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center p-4">Loading holidays...</td>
                    </tr>
                  ) : holidays.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-4">No holidays added</td>
                    </tr>
                  ) : (
                    holidays.map((holiday) => (
                      <tr key={holiday._id} className="border-t">
                        <td className="px-6 py-4">{holiday.holidayName}</td>
                        <td className="px-6 py-4">{new Date(holiday.fromDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{new Date(holiday.toDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{holiday.holidayMessage}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHolidayPage;
