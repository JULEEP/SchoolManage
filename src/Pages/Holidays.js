import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const HolidayPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/holidays');
        if (!response.ok) {
          throw new Error('Failed to fetch holidays');
        }
        const data = await response.json();
        setHolidays(data.holidays);
      } catch (err) {
        setError(err.message);
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
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Holiday List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-8">Holiday List</h1>
          {loading ? (
            <p className="text-center">Loading holidays...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-purple-500 text-white">
                    <th className="px-6 py-3 text-left">Holiday Name</th>
                    <th className="px-6 py-3 text-left">From Date</th>
                    <th className="px-6 py-3 text-left">To Date</th>
                    <th className="px-6 py-3 text-left">Message</th>
                    <th className="px-6 py-3 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {holidays.map((holiday) => (
                    <tr key={holiday._id} className="border-t">
                      <td className="px-6 py-4">{holiday.holidayName}</td>
                      <td className="px-6 py-4">{new Date(holiday.fromDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{new Date(holiday.toDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{holiday.holidayMessage}</td>
                      <td className="px-6 py-4">{new Date(holiday.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HolidayPage;
