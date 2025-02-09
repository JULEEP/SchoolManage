import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const LessonList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lessonsPerPage] = useState(5);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-lesson");
        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }
        const data = await response.json();
        setLessons(data.lessons);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  // Get current lessons for the current page
  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <h1 className="text-lg font-bold">Lesson List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-8">Lesson List</h1>
          {loading ? (
            <p className="text-center">Loading lessons...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-purple-500 text-white">
                    <th className="px-6 py-3 text-left">Class</th>
                    <th className="px-6 py-3 text-left">Section</th>
                    <th className="px-6 py-3 text-left">Subject</th>
                    <th className="px-6 py-3 text-left">Lesson Name</th>
                    <th className="px-6 py-3 text-left">Title</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLessons.map((lesson) => (
                    <tr key={lesson._id} className="border-t">
                      <td className="px-6 py-4">{lesson.class}</td>
                      <td className="px-6 py-4">{lesson.section || "N/A"}</td>
                      <td className="px-6 py-4">{lesson.subject}</td>
                      <td className="px-6 py-4">{lesson.lessonName}</td>
                      <td className="px-6 py-4">{lesson.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded-l"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-purple-500 text-white"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * lessonsPerPage >= lessons.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LessonList;
