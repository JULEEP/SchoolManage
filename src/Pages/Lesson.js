import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";  // Importing Sidebar component
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing sidebar toggle icons

const AddLesson = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [title, setTitle] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        setSelectedClass("");
        setSelectedSection("");
        setSelectedSubject("");
        setLessonName("");
        setTitle("");
        setPostedBy("");
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
      alert("Failed to add lesson. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar /> {/* Add the Sidebar component here */}
      </div>

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Add Lesson</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl mr-4 focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-6 ml-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Lesson</h2>

          {/* Lesson Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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

          {/* Lesson Name */}
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

          {/* Title */}
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

          {/* Posted By */}
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
              onClick={handleSave}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
