import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons
import Sidebar from './Sidebar'; // Importing Sidebar

const ExamScheduleList = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');

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
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, [classFilter, sectionFilter]);

  const indexOfLastSchedule = currentPage * perPage;
  const indexOfFirstSchedule = indexOfLastSchedule - perPage;
  const currentSchedules = scheduleData.slice(indexOfFirstSchedule, indexOfLastSchedule);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen">
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto transition-all duration-300">
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Exam Schedule List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:w-1/2 w-full">
              <label className="text-gray-600">Class</label>
              <input type="text" value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="border p-2 rounded-md w-full" placeholder="Enter class" />
            </div>
            <div className="flex flex-col sm:w-1/2 w-full">
              <label className="text-gray-600">Section</label>
              <input type="text" value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)} className="border p-2 rounded-md w-full" placeholder="Enter section" />
            </div>
            <div className="sm:w-auto w-full">
              <button onClick={fetchScheduleData} className="bg-purple-700 text-white p-2 rounded-md w-full sm:w-auto hover:bg-purple-800">Filter</button>
            </div>
          </div>
        </div>

        {/* Table Layout */}
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border p-2">Exam Title</th>
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Section</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Exam Date</th>
                  <th className="border p-2">Start Time</th>
                  <th className="border p-2">End Time</th>
                </tr>
              </thead>
              <tbody>
                {currentSchedules.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 p-4">No Data Available</td>
                  </tr>
                ) : (
                  currentSchedules.map((schedule) => (
                    schedule.exams.map((exam, examIndex) => (
                      <tr key={`${schedule._id.class}-${schedule._id.section}-${exam.subject}-${examIndex}`}>
                        <td className="border p-2">{schedule.examTitle}</td>
                        <td className="border p-2">{schedule._id.class}</td>
                        <td className="border p-2">{schedule._id.section}</td>
                        <td className="border p-2">{exam.subject}</td>
                        <td className="border p-2">{new Date(exam.examDate).toLocaleDateString()}</td>
                        <td className="border p-2">{exam.startTime}</td>
                        <td className="border p-2">{exam.endTime}</td>
                      </tr>
                    ))
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="text-sm bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50">Prev</button>
          <span className="text-sm">Page {currentPage}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastSchedule >= scheduleData.length} className="text-sm bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ExamScheduleList;
