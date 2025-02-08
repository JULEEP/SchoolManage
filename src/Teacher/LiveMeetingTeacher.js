import React, { useState, useEffect } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { FaBars, FaTimes } from 'react-icons/fa';

const LiveMeetingTeacher = () => {
  const [meetings, setMeetings] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/teacher/admin-meetings/67769d22e51f185d83bc2d99");
        const data = await response.json();
        if (response.ok) {
          setMeetings(data.meetings);
        } else {
          setError(data.message || "Failed to fetch meetings");
        }
      } catch (err) {
        setError("An error occurred while fetching teacher meetings.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <TeacherSidebar />
      </div>
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Teacher Meetings</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="p-6">
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Meeting with Admin</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-6 py-3 text-left">Index</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Time</th>
                    <th className="px-6 py-3 text-left">Meeting Link</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center p-4">Loading meetings...</td>
                    </tr>
                  ) : meetings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-4">No teacher meetings available</td>
                    </tr>
                  ) : (
                    meetings.map((meeting, index) => (
                      <tr key={meeting._id} className="border-t">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{meeting.date}</td>
                        <td className="px-6 py-4">{meeting.time}</td>
                        <td className="px-6 py-4">
                          <a href={meeting.link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Join</a>
                        </td>
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

export default LiveMeetingTeacher;
