import React, { useState, useEffect } from 'react';
import ParentSidebar from './ParentSidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const MyChildLiveClass = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLiveClasses = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/students/my-meetings/677904859d0da6e3bee4ba2e");
        const data = await response.json();
        setLiveClasses(
          data.meetings.map(meeting => ({
            _id: meeting._id,
            classSection: `${meeting.class} ${meeting.section}`,
            time: meeting.meetingTime,
            link: `${meeting.meetingLink}`,
            createdBy: "Admin" // Placeholder, modify if needed
          }))
        );
      } catch (err) {
        setError("An error occurred while fetching live classes.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveClasses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ParentSidebar />
      </div>
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Live Classes</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <div className="p-6">
          {error && <p className="text-red-500 mt-4">{error}</p>}
          
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Live Class Schedule</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-left">Class & Section</th>
                    <th className="px-6 py-3 text-left">Time</th>
                    <th className="px-6 py-3 text-left">Live Class Link</th>
                    <th className="px-6 py-3 text-left">Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">Loading live classes...</td>
                    </tr>
                  ) : liveClasses.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">No live classes available</td>
                    </tr>
                  ) : (
                    liveClasses.map((liveClass, index) => (
                      <tr key={liveClass._id} className="border-t">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{liveClass.classSection}</td>
                        <td className="px-6 py-4">{new Date(liveClass.time).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <a href={liveClass.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Join Class</a>
                        </td>
                        <td className="px-6 py-4">{liveClass.createdBy}</td>
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

export default MyChildLiveClass;
