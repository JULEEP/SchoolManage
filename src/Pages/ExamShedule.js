import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const ExamSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [examTitle, setExamTitle] = useState('');
  const [examCenter, setExamCenter] = useState('');
  const [examClass, setExamClass] = useState('');
  const [examSection, setExamSection] = useState('');
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [examType, setExamType] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Fetch data for dropdowns and exam schedules
  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-exam-schedule');
        setScheduleData(scheduleResponse.data.examSchedules || []);

        const classResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-classes');
        setClasses(classResponse.data.classes || []);

        const sectionResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-section');
        setSections(sectionResponse.data.sections || []);

        const subjectResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-subjects-names');
        const uniqueSubjects = [...new Set(subjectResponse.data.subjectNames.filter((name) => name))];
        setSubjects(uniqueSubjects || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle adding new exam
  const handleAddExam = async (e) => {
    e.preventDefault();

    const newExam = {
      examTitle,
      class: examClass,
      section: examSection,
      subject,
      examDate,
      startTime,
      endTime,
      examType,
      examCenter
    };

    try {
      const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/add-exam-schedule', newExam);

      if (response.status === 200) {
        setScheduleData([...scheduleData, response.data.examSchedule]);
        alert('Exam schedule added successfully!');
        setExamTitle('');
        setExamClass('');
        setExamSection('');
        setSubject('');
        setExamDate('');
        setStartTime('');
        setEndTime('');
        setExamType('');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error adding exam schedule:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle generate admit card
  const handleGenerateAdmitCard = async (scheduleId) => {
    try {
      const response = await axios.post(`https://school-backend-1-2xki.onrender.com/api/admin/generate-admit-cards/${scheduleId}`);

      if (response.status === 200) {
        setScheduleData(scheduleData.map(schedule =>
          schedule._id === scheduleId ? { ...schedule, isAdmitCardGenerated: true } : schedule
        ));
        alert('Admit card generated successfully!');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error generating admit card:', error);
      alert('An error occurred while generating the admit card.');
    }
  };

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
          <h1 className="text-lg font-bold">Exam Schedule</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Add Exam Form Section */}
        <div className="space-y-4 p-4 lg:p-6">
          <h2 className="text-xl text-gray-700 mb-4">Add New Exam Schedule</h2>
          <form onSubmit={handleAddExam} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Exam Title"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Exam Center"
                value={examCenter}
                onChange={(e) => setExamCenter(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              />
              <select
                value={examClass}
                onChange={(e) => setExamClass(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls.className}>
                    {cls.className}
                  </option>
                ))}
              </select>
              <select
                value={examSection}
                onChange={(e) => setExamSection(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Section</option>
                {sections.map((sec) => (
                  <option key={sec._id} value={sec.name}>
                    {sec.name}
                  </option>
                ))}
              </select>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              />
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Exam Type</option>
                <option value="Mid-Term">Mid-Term</option>
                <option value="Final">Final</option>
                <option value="Semester">Semester</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 mt-4"
            >
              Add Exam Schedule
            </button>
          </form>
        </div>

        {/* Exam Schedule Table Section */}
        <div className="space-y-4 p-4 lg:p-6">
          <h2 className="text-xl text-gray-700 mb-4">Exam Schedule List</h2>
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
                  <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSchedules.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
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
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleGenerateAdmitCard(schedule._id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Generate Admit Card
                        </button>
                      </td>
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
    </div>
  );
};

export default ExamSchedule;
