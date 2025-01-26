import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import { FaBars, FaTimes } from 'react-icons/fa';

const HolidayPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Static data for holidays
  const holidays = [
    {
      holidayName: 'New Year',
      fromDate: '01-01-2025',
      toDate: '01-01-2025',
      holidayMessage: 'Happy New Year!',
    },
    {
      holidayName: 'Independence Day',
      fromDate: '15-08-2025',
      toDate: '15-08-2025',
      holidayMessage: 'Celebrating freedom!',
    },
    {
      holidayName: 'Christmas',
      fromDate: '25-12-2025',
      toDate: '25-12-2025',
      holidayMessage: 'Merry Christmas!',
    },
    {
      holidayName: 'Diwali',
      fromDate: '11-11-2025',
      toDate: '11-11-2025',
      holidayMessage: 'Festival of lights!',
    },
    {
      holidayName: 'Eid',
      fromDate: '21-04-2025',
      toDate: '21-04-2025',
      holidayMessage: 'Eid Mubarak!',
    },
    // Add more static holidays if needed
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Holiday List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-8">
            Holiday List
          </h1>
          <div className="mt-8">
            {/* Horizontal Scroll Wrapper */}
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-purple-500 text-white">
                    <th className="px-6 py-3 text-left">Holiday Name</th>
                    <th className="px-6 py-3 text-left">From Date</th>
                    <th className="px-6 py-3 text-left">To Date</th>
                    <th className="px-6 py-3 text-left">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {holidays.map((holiday, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4">{holiday.holidayName}</td>
                      <td className="px-6 py-4">{holiday.fromDate}</td>
                      <td className="px-6 py-4">{holiday.toDate}</td>
                      <td className="px-6 py-4">{holiday.holidayMessage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayPage;
