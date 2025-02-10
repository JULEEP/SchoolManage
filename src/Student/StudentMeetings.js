import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../Pages/Sidebar';

const StudentMeeting = () => {
  const [studentsMeetings, setStudentsMeetings] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Fixed to 5 items per page

  useEffect(() => {
    const fetchStudentMeetings = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/teacher-student");
        const data = await response.json();
        if (response.ok) {
          setStudentsMeetings(data.studentsMeetings);
        } else {
          setError(data.message || "Failed to fetch student meetings");
        }
      } catch (err) {
        setError("An error occurred while fetching student meetings.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentMeetings();
  }, []);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentsMeetings.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Meetings</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-6">
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-6">Student Meetings List</h2>

            {loading ? (
              <div className="text-center p-4">Loading meetings...</div>
            ) : currentItems.length === 0 ? (
              <div className="text-center p-4">No meetings available</div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="px-6 py-3 text-left text-sm font-semibold">Sr. No</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Class</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Section</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Meeting Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Meeting Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((item, index) =>
                      item.meetings && item.meetings.length > 0 ? (
                        item.meetings.map((meeting, mIndex) => (
                          <tr key={meeting._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {indexOfFirstItem + index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.class || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.section || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(meeting.meetingTime).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {meeting.subject || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <a
                                href={meeting.meetingLink}
                                className="text-blue-500 hover:text-blue-700 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Join Meeting
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {indexOfFirstItem + index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.class || "N/A"}
                          </td>
                          <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            No meetings scheduled
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex space-x-2">
                {Array.from({ length: Math.ceil(studentsMeetings.length / itemsPerPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded transition-colors duration-200 ${
                      currentPage === i + 1
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-600 hover:bg-purple-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMeeting;