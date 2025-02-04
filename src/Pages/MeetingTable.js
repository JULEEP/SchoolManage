import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const MeetingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredMeetings, setFilteredMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/meetings');
        if (!response.ok) {
          throw new Error('Failed to fetch meetings');
        }
        const data = await response.json();
        setMeetings(data.meetings);
        setFilteredMeetings(data.meetings); // Initially set all meetings
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  // Handle date range filter
  const handleDateFilter = () => {
    const filtered = meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      const from = new Date(fromDate);
      const to = new Date(toDate);

      return meetingDate >= from && meetingDate <= to;
    });
    setFilteredMeetings(filtered);
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
          <h1 className="text-lg font-bold">Meeting List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-8">Meeting List</h1>

          {/* Date Filter */}
          <div className="mb-6 flex justify-center space-x-4">
            <div>
              <label className="text-sm text-gray-700">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            <button
              onClick={handleDateFilter}
              className="bg-purple-500 text-white p-2 rounded-md"
            >
              Filter
            </button>
          </div>

          {loading ? (
            <p className="text-center">Loading meetings...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-purple-500 text-white">
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Time</th>
                    <th className="px-6 py-3 text-left">Agenda</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeetings.map((meeting) => (
                    <tr key={meeting._id} className="border-t">
                      <td className="px-6 py-4">{new Date(meeting.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{meeting.time}</td>
                      <td className="px-6 py-4">{meeting.agenda}</td>
                      <td className="px-6 py-4">{meeting.location}</td>
                      <td className="px-6 py-4">{new Date(meeting.createdAt).toLocaleDateString()}</td>
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

export default MeetingPage;
