import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';  // Make sure you have Sidebar component
import { FaBars, FaTimes } from 'react-icons/fa';

const HolidayPage = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [holidayName, setHolidayName] = useState('');
  const [holidayMessage, setHolidayMessage] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle adding a new holiday
  const handleAddHoliday = (e) => {
    e.preventDefault();

    if (holidayName && holidayMessage && fromDate && toDate) {
      const newHoliday = { fromDate, toDate, holidayName, holidayMessage };
      setHolidays((prevHolidays) => [...prevHolidays, newHoliday]);

      // Reset form fields after adding
      setFromDate('');
      setToDate('');
      setHolidayName('');
      setHolidayMessage('');
      alert('Holiday added successfully!');
    } else {
      alert('Please fill in all fields');
    }
  };

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
          <h1 className="text-lg font-bold">Holidays</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-8">Add Holidays</h1>

          {/* Form to add a new holiday */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <form onSubmit={handleAddHoliday}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* From Date */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Holiday From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* To Date */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Holiday To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Holiday Name */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Holiday Name</label>
                  <input
                    type="text"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    placeholder="Enter holiday name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Holiday Message */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Holiday Message</label>
                  <textarea
                    value={holidayMessage}
                    onChange={(e) => setHolidayMessage(e.target.value)}
                    placeholder="Enter holiday message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Add Holiday
                </button>
              </div>
            </form>
          </div>

          {/* Holiday List Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Holiday List</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-purple-500 text-white">
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

export default HolidayPage;
