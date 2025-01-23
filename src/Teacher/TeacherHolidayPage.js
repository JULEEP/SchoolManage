import React, { useState, useEffect } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { FaBars, FaTimes } from 'react-icons/fa';

const TeacherHolidayPage = () => {
  const [holidays, setHolidays] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch holiday data (use a similar API call or mock data)
  useEffect(() => {
    const fetchHolidays = () => {
      // Example of hardcoded data
      const holidayData = [
        { holidayName: 'New Year', fromDate: '2025-01-01', toDate: '2025-01-01', holidayMessage: 'Happy New Year!' },
        // Add more holidays here
      ];
      setHolidays(holidayData);
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
        <TeacherSidebar />
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

          {/* Holiday List Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Holiday List</h2>
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
                {holidays.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4">No holidays added</td>
                  </tr>
                ) : (
                  holidays.map((holiday, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4">{holiday.holidayName}</td>
                      <td className="px-6 py-4">{holiday.fromDate}</td>
                      <td className="px-6 py-4">{holiday.toDate}</td>
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
  );
};

export default TeacherHolidayPage;
