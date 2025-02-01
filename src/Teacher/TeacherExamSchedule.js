import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons
import TeacherSidebar from "./TeacherSidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const TeacherExamSchedulePage = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [classFilter, setClassFilter] = useState(''); // Class filter state
  const [sectionFilter, setSectionFilter] = useState(''); // Section filter state

  // Fetch exam schedule data based on class and section
  const fetchScheduleData = async () => {
    try {
      const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-exam-schedule', {
        params: {
          class: classFilter,
          section: sectionFilter,
        },
      });
      setScheduleData(response.data.examSchedules || []);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      toast.error('Failed to fetch exam schedule data. Please try again.');
    }
  };

  // Fetch data when class or section filter changes
  useEffect(() => {
    fetchScheduleData();
  }, [classFilter, sectionFilter]);

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
        <TeacherSidebar />
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

        {/* Filter Inputs */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:w-1/2 w-full">
              <label className="text-gray-600">Class</label>
              <input
                type="text"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="border p-2 rounded-md w-full"
                placeholder="Enter class (e.g., 10)"
              />
            </div>
            <div className="flex flex-col sm:w-1/2 w-full">
              <label className="text-gray-600">Section</label>
              <input
                type="text"
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="border p-2 rounded-md w-full"
                placeholder="Enter section (e.g., A)"
              />
            </div>
            <div className="sm:w-auto w-full">
              <button
                onClick={fetchScheduleData}
                className="bg-purple-700 text-white p-2 rounded-md w-full sm:w-auto hover:bg-purple-800"
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Card Layout for Exam Schedules */}
        <div className="space-y-4 p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSchedules.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">
                No Data Available
              </div>
            ) : (
              currentSchedules.map((schedule, scheduleIndex) => (
                schedule.exams.map((exam, examIndex) => (
                  <div
                    key={`${schedule._id.class}-${schedule._id.section}-${exam.subject}-${examIndex}`}
                    className="bg-white shadow-md rounded-md p-4"
                  >
                    <div className="text-lg font-semibold mb-2">{schedule.examTitle}</div>
                    <div className="text-gray-600">Class: {schedule._id.class}</div>
                    <div className="text-gray-600">Section: {schedule._id.section}</div>
                    <div className="text-gray-600">Subject: {exam.subject}</div>
                    <div className="text-gray-600">Exam Date: {new Date(exam.examDate).toLocaleDateString()}</div>
                    <div className="text-gray-600">Start Time: {exam.startTime}</div>
                    <div className="text-gray-600">End Time: {exam.endTime}</div>
                  </div>
                ))
              ))
            )}
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

export default TeacherExamSchedulePage;

