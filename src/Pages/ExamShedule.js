import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExamSchedule = () => {
  const [examTitle, setExamTitle] = useState('');
  const [examCenter, setExamCenter] = useState('');
  const [examClass, setExamClass] = useState('');
  const [examSection, setExamSection] = useState('');
  const [examType, setExamType] = useState('');

  const [examDays, setExamDays] = useState([{ date: '', exams: [{ subject: '', startTime: '', endTime: '', examTime: '' }] }]);

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examTypes, setExamTypes] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar if click is outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebarElement = document.getElementById('sidebar');
      if (sidebarElement && !sidebarElement.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        const examTypeResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-examtype');
        setExamTypes(examTypeResponse.data.examTypes || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle adding a new exam day with exams
  const handleAddExamDay = () => {
    setExamDays([...examDays, { date: '', exams: [{ subject: '', startTime: '', endTime: '', examTime: '' }] }]);
  };

  // Handle adding a new exam for a specific day
  const handleAddExam = (dayIndex) => {
    const updatedExamDays = [...examDays];
    updatedExamDays[dayIndex].exams.push({ subject: '', startTime: '', endTime: '', examTime: '' });
    setExamDays(updatedExamDays);
  };

  // Handle input change for exam days and exams
  const handleInputChange = (e, dayIndex, examIndex) => {
    const { name, value } = e.target;
    const updatedExamDays = [...examDays];
    if (name === 'date') {
      updatedExamDays[dayIndex].date = value;
    } else {
      updatedExamDays[dayIndex].exams[examIndex][name] = value;
    }
    setExamDays(updatedExamDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExamSchedule = {
      examTitle,
      class: examClass,
      section: examSection,
      examCenter,
      examType,
      examDays
    };
  
    try {
      const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/add-exam-schedule', newExamSchedule);
      
      if (response.status === 201) {
        toast.success('Exam schedule added successfully!');
        // Reset form
        setExamTitle('');
        setExamClass('');
        setExamSection('');
        setExamCenter('');
        setExamType('');
        setExamDays([{ date: '', exams: [{ subject: '', startTime: '', endTime: '', examTime: '' }] }]);
      } else {
        toast.error(`Error: ${response.data.message || 'Unexpected error occurred'}`);
      }
    } catch (error) {
      console.error('Error adding exam schedule:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0 shadow-md' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Exam Schedule</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Add Exam Form Section */}
        <div className="space-y-4 p-4 lg:p-6">
          <h2 className="text-xl text-gray-700 mb-4">Add New Exam Schedule</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Exam Title */}
              <div className="flex flex-col">
                <label htmlFor="examTitle" className="text-gray-600 mb-1">Exam Title</label>
                <input
                  type="text"
                  id="examTitle"
                  placeholder="Exam Title"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
              </div>

              {/* Exam Center */}
              <div className="flex flex-col">
                <label htmlFor="examCenter" className="text-gray-600 mb-1">Exam Center</label>
                <input
                  type="text"
                  id="examCenter"
                  placeholder="Exam Center"
                  value={examCenter}
                  onChange={(e) => setExamCenter(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
              </div>

              {/* Class */}
              <div className="flex flex-col">
                <label htmlFor="examClass" className="text-gray-600 mb-1">Class</label>
                <select
                  id="examClass"
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
              </div>

              {/* Section */}
              <div className="flex flex-col">
                <label htmlFor="examSection" className="text-gray-600 mb-1">Section</label>
                <select
                  id="examSection"
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
              </div>

              {/* Exam Type */}
              <div className="flex flex-col">
                <label htmlFor="examType" className="text-gray-600 mb-1">Exam Type</label>
                <select
                  id="examType"
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
            </div>

            {/* Dynamic Exam Days Section */}
            {examDays.map((day, dayIndex) => (
              <div key={dayIndex} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor={`examDay-${dayIndex}`} className="text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    id={`examDay-${dayIndex}`}
                    name="date"
                    value={day.date}
                    onChange={(e) => handleInputChange(e, dayIndex)}
                    className="border border-gray-300 p-2 rounded"
                    required
                  />
                </div>

                {/* Exams for each day */}
                {day.exams.map((exam, examIndex) => (
                  <div key={examIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Subject */}
                    <div className="flex flex-col">
                      <label htmlFor={`subject-${examIndex}`} className="text-gray-600 mb-1">Subject</label>
                      <select
                        id={`subject-${examIndex}`}
                        name="subject"
                        value={exam.subject}
                        onChange={(e) => handleInputChange(e, dayIndex, examIndex)}
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
                    </div>

                    {/* Start Time */}
                    <div className="flex flex-col">
                      <label htmlFor={`startTime-${examIndex}`} className="text-gray-600 mb-1">Start Time</label>
                      <input
                        type="time"
                        id={`startTime-${examIndex}`}
                        name="startTime"
                        value={exam.startTime}
                        onChange={(e) => handleInputChange(e, dayIndex, examIndex)}
                        className="border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col">
                      <label htmlFor={`endTime-${examIndex}`} className="text-gray-600 mb-1">End Time</label>
                      <input
                        type="time"
                        id={`endTime-${examIndex}`}
                        name="endTime"
                        value={exam.endTime}
                        onChange={(e) => handleInputChange(e, dayIndex, examIndex)}
                        className="border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>

                    {/* Exam Time */}
                    <div className="flex flex-col">
                      <label htmlFor={`examTime-${examIndex}`} className="text-gray-600 mb-1">Exam Time</label>
                      <select
                        id={`examTime-${examIndex}`}
                        name="examTime"
                        value={exam.examTime}
                        onChange={(e) => handleInputChange(e, dayIndex, examIndex)}
                        className="border border-gray-300 p-2 rounded"
                        required
                      >
                        <option value="">Select Exam Time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddExam(dayIndex)}
                  className="text-blue-500"
                >
                  Add Another Exam
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddExamDay}
              className="text-blue-500"
            >
              Add Another Exam Day
            </button>

            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded mt-4"
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
