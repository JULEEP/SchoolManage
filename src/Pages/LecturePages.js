import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import AdminSidebar from "../Sidebar"; // Import the Sidebar component

const LecturePage = () => {
  const [lectures, setLectures] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch lectures data from API
  useEffect(() => {
    const fetchLectures = async () => {
      setLoading(true);
      setError("");
      try {
        // API call to fetch lectures
      } catch (err) {
        setError("An error occurred while fetching lectures.");
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
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
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 text-white bg-blue-700 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Lecture Management</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && <p className="mt-4 text-red-500">{error}</p>}

          {/* Lecture List Table */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-center text-blue-600">Lecture List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="text-white bg-blue-600">
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-left">Lecture Name</th>
                    <th className="px-6 py-3 text-left">Subject</th>
                    <th className="px-6 py-3 text-left">Teacher</th>
                    <th className="px-6 py-3 text-left">Lecture Link</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-4 text-center">Loading lectures...</td>
                    </tr>
                  ) : lectures.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-4 text-center">No lectures available</td>
                    </tr>
                  ) : (
                    lectures.map((lecture, index) => (
                      <tr key={lecture._id} className="border-t">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{lecture.name}</td>
                        <td className="px-6 py-4">{lecture.subject}</td>
                        <td className="px-6 py-4">{lecture.teacher}</td>
                        <td className="px-6 py-4 text-blue-500 underline">
                          <a href={lecture.link} target="_blank" rel="noopener noreferrer">Join</a>
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

export default LecturePage;
