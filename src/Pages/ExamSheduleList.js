import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons
import Sidebar from './Sidebar'; // Importing Sidebar
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const ExamScheduleList = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Fetch exam schedule data
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-exam-schedule');
        setScheduleData(response.data.examSchedules || []);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        toast.error('Failed to fetch exam schedule data. Please try again.');
      }
    };

    fetchScheduleData();
  }, []);

  // Get current items for the page
  const indexOfLastSchedule = currentPage * perPage;
  const indexOfFirstSchedule = indexOfLastSchedule - perPage;
  const currentSchedules = scheduleData.slice(indexOfFirstSchedule, indexOfLastSchedule);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen">
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
          <h1 className="text-lg font-bold">Exam Schedule List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="space-y-4 p-4 lg:p-6">
          <div className="overflow-x-auto bg-white shadow-md rounded-md p-4">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">SL</th>
                  <th className="px-4 py-2 text-left text-gray-600">Exam Title</th>
                  <th className="px-4 py-2 text-left text-gray-600">Class</th>
                  <th className="px-4 py-2 text-left text-gray-600">Section</th>
                  <th className="px-4 py-2 text-left text-gray-600">Subject</th>
                  <th className="px-4 py-2 text-left text-gray-600">Exam Date</th>
                </tr>
              </thead>
              <tbody>
                {currentSchedules.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  currentSchedules.map((schedule, index) => (
                    <tr key={schedule._id}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{schedule.examTitle}</td>
                      <td className="px-4 py-2">{schedule.class}</td>
                      <td className="px-4 py-2">{schedule.section}</td>
                      <td className="px-4 py-2">{schedule.subject}</td>
                      <td className="px-4 py-2">{schedule.examDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-sm bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm">Page {currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastSchedule >= scheduleData.length}
              className="text-sm bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ExamScheduleList;
