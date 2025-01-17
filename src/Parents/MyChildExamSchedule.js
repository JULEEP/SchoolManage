import React, { useState } from 'react';
import ParentSidebar from './ParentSidebar';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';

const MyChildExamSchedule = () => {
  const [exam, setExam] = useState('');
  const [classType, setClassType] = useState('');
  const [section, setSection] = useState('');
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Parent and student IDs (replace with dynamic values or props as needed)
  const parentId = '676f98625b442721a56ee770';
  const studentId = '676bb21bd06928a8432c676a';

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setScheduleData([]);

    try {
      const response = await axios.get(
        `https://school-backend-1-2xki.onrender.com/api/parent/my-child-examshedule/${parentId}/${studentId}`
      );

      const fetchedSchedule = response.data.examSchedule || [];
      if (fetchedSchedule.length === 0) {
        setError('No exam schedule found for the selected criteria.');
      } else {
        setScheduleData(fetchedSchedule);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to fetch exam schedule. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle Sidebar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (mobile-hidden by default, can be toggled) */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <ParentSidebar />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto lg:ml-64">
        {/* Header for Mobile */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Exam Schedule</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}

        {/* Select Criteria Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 mt-6">
          <div className="flex gap-8 mb-4 mt-6">
            {/* Exam Dropdown */}
            <div className="w-1/3">
              <label htmlFor="exam" className="block text-xs text-gray-600 mb-1">
                Exam *
              </label>
              <select
                id="exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-xs"
              >
                <option value="">Select Exam</option>
                <option value="mid-term">Mid-Term</option>
                <option value="final">Final</option>
                <option value="semester">Semester</option>
              </select>
            </div>

            {/* Class Dropdown */}
            <div className="w-1/3">
              <label htmlFor="class" className="block text-xs text-gray-600 mb-1">
                Class *
              </label>
              <select
                id="class"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-xs"
              >
                <option value="">Select Class</option>
                <option value="class-1">Class 1</option>
                <option value="class-2">Class 2</option>
                <option value="class-3">Class 3</option>
              </select>
            </div>

            {/* Section Dropdown */}
            <div className="w-1/3">
              <label htmlFor="section" className="block text-xs text-gray-600 mb-1">
                Section *
              </label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-xs"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-start">
            <button
              onClick={handleSearch}
              className="bg-purple-500 text-white p-2 rounded text-xs hover:bg-purple-600"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Exam Schedule Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xs text-gray-700 font-medium mb-4">Exam Schedule List</h2>

          {error && <div className="text-red-500 text-xs mb-4">{error}</div>}

          {scheduleData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs">SL</th>
                    <th className="px-4 py-2 text-left text-xs">Exam Title</th>
                    <th className="px-4 py-2 text-left text-xs">Class</th>
                    <th className="px-4 py-2 text-left text-xs">Section</th>
                    <th className="px-4 py-2 text-left text-xs">Subject</th>
                    <th className="px-4 py-2 text-left text-xs">Exam Date</th>
                    <th className="px-4 py-2 text-left text-xs">Start Time</th>
                    <th className="px-4 py-2 text-left text-xs">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((schedule, index) => (
                    <tr key={schedule.id}>
                      <td className="px-4 py-2 text-xs">{index + 1}</td>
                      <td className="px-4 py-2 text-xs">{schedule.examTitle}</td>
                      <td className="px-4 py-2 text-xs">{schedule.class}</td>
                      <td className="px-4 py-2 text-xs">{schedule.section}</td>
                      <td className="px-4 py-2 text-xs">{schedule.subject}</td>
                      <td className="px-4 py-2 text-xs">{schedule.examDate}</td>
                      <td className="px-4 py-2 text-xs">{schedule.startTime}</td>
                      <td className="px-4 py-2 text-xs">{schedule.endTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && !error && (
              <div className="text-gray-500 text-xs">No exam schedule available.</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChildExamSchedule;
