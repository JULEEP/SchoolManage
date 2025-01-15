import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const AddHomework = () => {
  const [formData, setFormData] = useState({
    class: "",
    subject: "",
    section: "",
    select: "",
    homeworkDate: "2024-12-17",
    submissionDate: "2024-12-17",
    marks: "",
    file: null,
    description: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data along with the file
    const formDataToSend = new FormData();
    formDataToSend.append("class", formData.class);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("section", formData.section);
    formDataToSend.append("select", formData.select);
    formDataToSend.append("homeworkDate", formData.homeworkDate);
    formDataToSend.append("submissionDate", formData.submissionDate);
    formDataToSend.append("marks", formData.marks);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("description", formData.description);

    try {
      // Make the API request to add homework
      const response = await axios.post("https://school-backend-1-2xki.onrender.com/api/admin/add-homework", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",  // Ensure that it's multipart form data
        },
      });

      // Handle successful response
      console.log("Homework added successfully:", response.data);
      alert("Homework added successfully!");
    } catch (error) {
      // Handle error
      console.error("Error adding homework:", error);
      alert("Error adding homework!");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay for Mobile */}
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
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Add Homework</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-xl text-gray-700 p-6">Add Homework</h1>

        {/* Add Homework Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Class */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Class *</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Subject *</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Section *</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Select */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Select</label>
              <input
                type="text"
                name="select"
                placeholder="Select"
                value={formData.select}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Homework Date */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Homework Date *
              </label>
              <input
                type="date"
                name="homeworkDate"
                value={formData.homeworkDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Submission Date */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Submission Date *
              </label>
              <input
                type="date"
                name="submissionDate"
                value={formData.submissionDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Marks */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Marks *</label>
              <input
                type="number"
                name="marks"
                placeholder="Enter Marks"
                value={formData.marks}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="space-y-4">
            {/* Attach File */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Attach File</label>
              <input
                type="file"
                name="file"
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Enter description here"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Save Homework
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHomework;
