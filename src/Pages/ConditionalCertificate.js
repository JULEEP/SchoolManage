import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const ConditionalCertificatePage = () => {
  const [certificateFor, setCertificateFor] = useState("");
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    exam: "",
    certificate: "",
    role: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = () => {
    console.log("Search criteria:", formData);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Generate Certificate</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Select Criteria Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Criteria</h3>

          {/* Certificate For Dropdown */}
          <div className="mb-6">
            <label htmlFor="certificateFor" className="block text-sm font-medium text-gray-700">
              Certificate For *
            </label>
            <select
              id="certificateFor"
              value={certificateFor}
              onChange={(e) => setCertificateFor(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Certificate For</option>
              <option value="Student">Student</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          {/* Conditional Inputs */}
          {certificateFor === "Student" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Class Dropdown */}
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                  Class *
                </label>
                <select
                  id="class"
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Class</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                </select>
              </div>

              {/* Section Dropdown */}
              <div>
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                  Section
                </label>
                <select
                  id="section"
                  value={formData.section}
                  onChange={(e) =>
                    setFormData({ ...formData, section: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>

              {/* Exam Dropdown */}
              <div>
                <label htmlFor="exam" className="block text-sm font-medium text-gray-700">
                  Exam
                </label>
                <select
                  id="exam"
                  value={formData.exam}
                  onChange={(e) =>
                    setFormData({ ...formData, exam: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Exam</option>
                  <option value="Midterm">Midterm</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              {/* Certificate Dropdown */}
              <div>
                <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
                  Certificate *
                </label>
                <select
                  id="certificate"
                  value={formData.certificate}
                  onChange={(e) =>
                    setFormData({ ...formData, certificate: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Certificate</option>
                  <option value="Merit Certificate">Merit Certificate</option>
                  <option value="Participation Certificate">Participation Certificate</option>
                </select>
              </div>
            </div>
          )}

          {certificateFor === "Employee" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Role Dropdown */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role *
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              {/* Certificate Dropdown */}
              <div>
                <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
                  Certificate *
                </label>
                <select
                  id="certificate"
                  value={formData.certificate}
                  onChange={(e) =>
                    setFormData({ ...formData, certificate: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Certificate</option>
                  <option value="Experience Certificate">Experience Certificate</option>
                  <option value="Achievement Certificate">Achievement Certificate</option>
                </select>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="text-right">
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionalCertificatePage;
