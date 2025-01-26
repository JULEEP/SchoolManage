import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const LessonList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonResponse = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/get-lesson");
        setLessons(lessonResponse.data.lessons || []);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Lesson List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl mr-4 focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-[70%] table-auto mx-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">SL</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Class</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Section</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Subject</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Lesson Name</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Title</th>
                </tr>
              </thead>
              <tbody>
                {lessons.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No lessons available
                    </td>
                  </tr>
                ) : (
                  lessons.map((lesson, index) => (
                    <tr key={lesson._id}>
                      <td className="p-2 text-sm text-gray-700">{index + 1}</td>
                      <td className="p-2 text-sm text-gray-700">{lesson.class}</td>
                      <td className="p-2 text-sm text-gray-700">{lesson.section || "N/A"}</td>
                      <td className="p-2 text-sm text-gray-700">{lesson.subject}</td>
                      <td className="p-2 text-sm text-gray-700">{lesson.lessonName}</td>
                      <td className="p-2 text-sm text-gray-700">{lesson.title}</td>
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

export default LessonList;
