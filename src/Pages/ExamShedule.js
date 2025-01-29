import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const ExamSchedule = () => {
  const [examTitle, setExamTitle] = useState('');
  const [examCenter, setExamCenter] = useState('');
  const [examClass, setExamClass] = useState('');
  const [examSection, setExamSection] = useState('');
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [examType, setExamType] = useState('');

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examTypes, setExamTypes] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Fetch data for dropdowns and exam schedules
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-classes');
        setClasses(classResponse.data.classes || []);

        const sectionResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-section');
        setSections(sectionResponse.data.sections || []);

        const subjectResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-subjects-names');
        const uniqueSubjects = [...new Set(subjectResponse.data.subjectNames.filter((name) => name))];
        setSubjects(uniqueSubjects || []);

        const examTypeResponse = await axios.get('http://localhost:4000/api/admin/get-examtype');
        setExamTypes(examTypeResponse.data.examTypes || []);
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
        toast.success('Exam schedule added successfully!');
        setExamTitle('');
        setExamClass('');
        setExamSection('');
        setSubject('');
        setExamDate('');
        setStartTime('');
        setEndTime('');
        setExamType('');
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error adding exam schedule:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

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
                {examTypes.map((type) => (
                  <option key={type._id} value={type.examName}>
                    {type.examName}
                  </option>
                ))}
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
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ExamSchedule;
