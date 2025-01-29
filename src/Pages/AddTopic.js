import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const AddTopic = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [topics, setTopics] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch data for dropdowns and topics list
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

        const lessonResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-lesson');
        setLessons(lessonResponse.data.lessons || []);

        // Fetch topics
        const topicResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-topic');
        setTopics(topicResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSaveTopic = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // Validate fields
    if (!selectedClass || !selectedSection || !selectedSubject || !selectedLesson || !topicTitle) {
      setErrorMessage('All fields are required.');
      toast.error('All fields are required.'); // Show error toast
      return;
    }

    try {
      const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/add-topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          className: selectedClass,
          section: selectedSection,
          subject: selectedSubject,
          lesson: selectedLesson,
          topic: topicTitle,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Topic added successfully.');
        toast.success('Topic added successfully.'); // Show success toast
        setTopics((prevTopics) => [
          ...prevTopics,
          {
            className: selectedClass,
            section: selectedSection,
            subject: selectedSubject,
            lesson: selectedLesson,
            topic: topicTitle,
          },
        ]);
        setSelectedClass('');
        setSelectedSection('');
        setSelectedSubject('');
        setSelectedLesson('');
        setTopicTitle('');
      } else {
        setErrorMessage(data.message || 'Failed to add topic.');
        toast.error(data.message || 'Failed to add topic.'); // Show error toast
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the topic.');
      toast.error('An error occurred while adding the topic.'); // Show error toast
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Add Topic</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Topic Form */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Topic</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Class Dropdown */}
              <div>
                <label htmlFor="class" className="block text-sm text-gray-600">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  id="class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls.className}>
                      {cls.className}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section Dropdown */}
              <div>
                <label htmlFor="section" className="block text-sm text-gray-600">
                  Section <span className="text-red-500">*</span>
                </label>
                <select
                  id="section"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Section</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Dropdown */}
              <div>
                <label htmlFor="subject" className="block text-sm text-gray-600">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lesson Dropdown */}
              <div>
                <label htmlFor="lesson" className="block text-sm text-gray-600">
                  Lesson <span className="text-red-500">*</span>
                </label>
                <select
                  id="lesson"
                  value={selectedLesson}
                  onChange={(e) => setSelectedLesson(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Lesson</option>
                  {lessons.map((lesson, index) => (
                    <option key={index} value={lesson.lessonName}>
                      {lesson.lessonName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Title */}
              <div className="col-span-2 sm:col-span-4">
                <label htmlFor="topicTitle" className="block text-sm text-gray-600">
                  Add Topic <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="topicTitle"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder="Title"
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Save Button */}
              <div className="col-span-2 sm:col-span-4 mt-6">
                <button
                  type="button"
                  onClick={handleSaveTopic}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 w-full sm:w-auto"
                >
                  Save Topic
                </button>
              </div>

              {/* Feedback Messages */}
              {errorMessage && (
                <div className="text-red-500 text-sm mt-4">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-500 text-sm mt-4">{successMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer for Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddTopic;
