import React, { useState, useEffect } from 'react';
import ParentSidebar from "../Sidebar"; // Import the Sidebar component
import { FaBars, FaTimes } from 'react-icons/fa';

const LiveMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch parent meeting data from API
  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      setError("");
      try {
        //call api here
      } catch (err) {
        setError("An error occurred while fetching meetings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
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
        <ParentSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-blue-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Parent Meetings</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Meeting List Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Parent Meeting List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-left">Parent Name</th>
                    <th className="px-6 py-3 text-left">Child Name</th>
                    <th className="px-6 py-3 text-left">Created By</th>
                    <th className="px-6 py-3 text-left">Meeting Link</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">Loading meetings...</td>
                    </tr>
                  ) : meetings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">No meetings scheduled</td>
                    </tr>
                  ) : (
                    meetings.map((meeting, index) => (
                      <tr key={meeting._id} className="border-t">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{meeting.parentName}</td>
                        <td className="px-6 py-4">{meeting.childName}</td>
                        <td className="px-6 py-4">{meeting.createdBy}</td>
                        <td className="px-6 py-4 text-blue-500 underline">
                          <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">Join</a>
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

export default LiveMeeting;
