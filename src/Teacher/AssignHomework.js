import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";

const AddHomeworkByTeacher = () => {
  const [formData, setFormData] = useState({
    class: "8", // Default class
    section: "", // Default section
    subject: "", // Default subject
    homeworkDate: "",
    submissionDate: "",
    marks: 50,
    description: "Solve problems from Chapter 5 on page 23.",
    homeworkTitle: "Math Assignment: Chapter 5 Problems",
    homeworkBy: "", // Teacher's name will be added here manually
  });

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch classes, sections, and subjects
        const classResponse = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-classes"
        );
        setClasses(classResponse.data.classes || []);

        const sectionResponse = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-section"
        );
        setSections(sectionResponse.data.sections || []);

        const subjectResponse = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-subjects-names"
        );
        const uniqueSubjects = [
          ...new Set(subjectResponse.data.subjectNames.filter((name) => name)),
        ];
        setSubjects(uniqueSubjects || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.homeworkDate || !formData.submissionDate || !formData.homeworkTitle || !formData.homeworkBy) {
      alert("Please fill all required fields.");
      return;
    }

    const homeworkData = {
      ...formData,
    };

    try {
      const response = await axios.post(
        "https://school-backend-1-2xki.onrender.com/api/teacher/add-homework",
        homeworkData
      );
      alert("Homework added successfully!");
      console.log("Homework added successfully:", response.data);
    } catch (error) {
      alert("Error adding homework!");
      console.error("Error adding homework:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <TeacherSidebar />
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 w-full mr-6 lg:hidden">
          <h1 className="text-lg font-bold">Add Homework</h1>
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Content Wrapper with White Background, Shadow, and Rounded Corners */}
        <div className="bg-white shadow-lg rounded-lg p-6 mx-4 mt-6">
          {/* Add Homework Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Form Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Class *</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full sm:w-48 md:w-56 p-2 border rounded"
                >
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls.className}>
                      {cls.className}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full sm:w-48 md:w-56 p-2 border rounded"
                >
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Section *</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  className="w-full sm:w-48 md:w-56 p-2 border rounded"
                >
                  {sections.map((section) => (
                    <option key={section._id} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Homework Date *</label>
                <input
                  type="date"
                  name="homeworkDate"
                  value={formData.homeworkDate}
                  onChange={handleInputChange}
                  className="w-full sm:w-48 md:w-56 p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Submission Date *</label>
                <input
                  type="date"
                  name="submissionDate"
                  value={formData.submissionDate}
                  onChange={handleInputChange}
                  className="w-full sm:w-48 md:w-56 p-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Homework Title *</label>
              <input
                type="text"
                name="homeworkTitle"
                value={formData.homeworkTitle}
                onChange={handleInputChange}
                className="w-full sm:w-48 md:w-56 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full sm:w-48 md:w-56 p-2 border rounded"
              ></textarea>
            </div>

            {/* Manually Input Teacher's Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Teacher's Name *</label>
              <input
                type="text"
                name="homeworkBy"
                value={formData.homeworkBy}
                onChange={handleInputChange}
                className="w-full sm:w-48 md:w-56 p-2 border rounded"
              />
            </div>

            <div className="text-right">
              <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
                Save Homework
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHomeworkByTeacher;
