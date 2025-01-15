import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const AddLesson = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [title, setTitle] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [lessons, setLessons] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonResponse = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/get-lesson");
        setLessons(lessonResponse.data.lessons || []);
        
        const classResponse = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/get-classes");
        setClasses(classResponse.data.classes || []);
        
        const sectionResponse = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/get-section");
        setSections(sectionResponse.data.sections || []);
        
        const subjectResponse = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/get-subjects-names");
        const uniqueSubjects = [...new Set(subjectResponse.data.subjectNames.filter((name) => name))];
        setSubjects(uniqueSubjects || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddLesson = () => {
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedClass || !selectedSection || !selectedSubject || !lessonName || !title || !postedBy) {
      alert("All fields are required");
      return;
    }

    try {
      const payload = {
        class: selectedClass,
        section: selectedSection,
        subject: selectedSubject,
        lessonName,
        title,
        postedBy,
      };

      const response = await axios.post("https://school-backend-1-2xki.onrender.com/api/admin/add-lesson", payload);
      if (response.status === 201) {
        alert("Lesson added successfully");
        setModalOpen(false);
        setSelectedClass("");
        setSelectedSection("");
        setSelectedSubject("");
        setLessonName("");
        setTitle("");
        setPostedBy("");

        const updatedLessons = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/get-lesson");
        setLessons(updatedLessons.data.lessons || []);
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
      alert("Failed to add lesson. Please try again.");
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedClass("");
    setSelectedSection("");
    setSelectedSubject("");
    setLessonName("");
    setTitle("");
    setPostedBy("");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Add Lesson</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl mr-4 focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Add Lesson Button */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={handleAddLesson} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
              + ADD
            </button>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Class Drop-down */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-3/4 sm:w-1/2 p-2 border rounded-md"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls.className}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Drop-down */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-3/4 sm:w-1/2 p-2 border rounded-md"
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section._id} value={section.name}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Drop-down */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-3/4 sm:w-1/2 p-2 border rounded-md"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Placeholder for Lesson List */}
          <div className="overflow-x-auto mb-6">
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
                    <td colSpan="7" className="p-4 text-center text-gray-500">
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

          {/* Modal for Adding Lesson */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-700">Add Lesson</h3>
                  <button onClick={handleCancel} className="text-gray-500 text-xl font-semibold">
                    ×
                  </button>
                </div>

                {/* Lesson Form */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Class *</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-3/4 sm:w-1/2 p-2 border rounded-md"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls.className}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Section *</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-3/4 sm:w-1/2 p-2 border rounded-md"
                  >
                    <option value="">Select Section</option>
                    {sections.map((section) => (
                      <option key={section._id} value={section.name}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Subject *</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-3/4 sm:w-1/2 p-2 border rounded-md"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Lesson Name *</label>
                  <input
                    type="text"
                    value={lessonName}
                    onChange={(e) => setLessonName(e.target.value)}
                    placeholder="Lesson Name"
                    className="w-3/4 sm:w-1/2 p-2 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-3/4 sm:w-1/2 p-2 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Posted By *</label>
                  <input
                    type="text"
                    value={postedBy}
                    onChange={(e) => setPostedBy(e.target.value)}
                    placeholder="Posted By"
                    className="w-3/4 sm:w-1/2 p-2 border rounded-md"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
