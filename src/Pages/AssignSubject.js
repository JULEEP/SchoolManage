import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaBars, FaTimes } from "react-icons/fa";

const AssignSubjectPage = () => {
  const [formData, setFormData] = useState({
    className: '',
    sectionName: '',
    teacher: '',
    subject: '',
  });

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const classResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-classes');
        setClasses(classResponse.data.classes || []);

        const sectionResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-section');
        setSections(sectionResponse.data.sections || []);

        const teacherResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/teachers');
        const teacherData = teacherResponse.data.map((teacher) => teacher.name);
        setTeachers(teacherData || []);

        const subjectResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-subjects-names');
        const uniqueSubjects = [...new Set(subjectResponse.data.subjectNames.filter((name) => name))];
        setSubjects(uniqueSubjects || []);

        const assignmentsResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-assign-subject');
        setAssignments(assignmentsResponse.data.data || []);
      } catch (error) {
        setError(error.message || 'Failed to fetch dropdown data');
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAssignSubject = async () => {
    setError('');
    setSuccess('');

    const payload = {
      class: formData.className,
      section: formData.sectionName,
      subject: formData.subject,
      teacher: formData.teacher,
    };

    try {
      const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/assign-subject', payload);
      setSuccess(response.data.message || 'Subject teacher assigned successfully.');
    } catch (error) {
      setError(error.response?.data?.message || 'Error assigning subject teacher.');
    }
  };

  const currentRecords = assignments.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil(assignments.length / recordsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Assign Subject</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg text-gray-700 mb-4">Assign Subject to Teacher</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Class Dropdown */}
                <div>
                  <label htmlFor="className" className="text-sm text-gray-600">Class *</label>
                  <select
                    id="className"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.length > 0 ? (
                      classes.map((classOption, index) => (
                        <option key={index} value={classOption.className}>{classOption.className}</option>
                      ))
                    ) : (
                      <option value="">Loading Classes...</option>
                    )}
                  </select>
                </div>

                {/* Section Dropdown */}
                <div>
                  <label htmlFor="sectionName" className="text-sm text-gray-600">Section *</label>
                  <select
                    id="sectionName"
                    name="sectionName"
                    value={formData.sectionName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Section</option>
                    {sections.length > 0 ? (
                      sections.map((sectionOption, index) => (
                        <option key={index} value={sectionOption.name}>{sectionOption.name}</option>
                      ))
                    ) : (
                      <option value="">Loading Sections...</option>
                    )}
                  </select>
                </div>

                {/* Teacher Dropdown */}
                <div>
                  <label htmlFor="teacher" className="text-sm text-gray-600">Teacher *</label>
                  <select
                    id="teacher"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Teacher</option>
                    {teachers.length > 0 ? (
                      teachers.map((teacher, index) => (
                        <option key={index} value={teacher}>{teacher}</option>
                      ))
                    ) : (
                      <option value="">Loading Teachers...</option>
                    )}
                  </select>
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label htmlFor="subject" className="text-sm text-gray-600">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.length > 0 ? (
                      subjects.map((subjectOption, index) => (
                        <option key={index} value={subjectOption}>{subjectOption}</option>
                      ))
                    ) : (
                      <option value="">Loading Subjects...</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Assign Subject Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAssignSubject}
                  className={`px-6 py-2 rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Assigning...' : 'Assign Subject'}
                </button>
              </div>
            </form>
          </div>

          {/* Assigned Subjects Table */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-lg text-gray-700 mb-4">Assigned Subjects</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-gray-600">Class</th>
                    <th className="px-4 py-2 text-gray-600">Section</th>
                    <th className="px-4 py-2 text-gray-600">Subject</th>
                    <th className="px-4 py-2 text-gray-600">Teacher</th>
                    <th className="px-4 py-2 text-gray-600">Assigned On</th>
                  </tr>
                </thead>
              </table>
              <div className="max-h-64">
                <table className="min-w-full table-auto">
                  <tbody>
                    {currentRecords.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-gray-500">
                          No Data Available
                        </td>
                      </tr>
                    ) : (
                      currentRecords.map((assignment, index) => (
                        <tr key={index} className="border-t border-gray-300">
                          <td className="px-4 py-2 text-gray-600 text-center">{assignment.class}</td>
                          <td className="px-4 py-2 text-gray-600 text-center">{assignment.section}</td>
                          <td className="px-4 py-2 text-gray-600 text-center">{assignment.subject}</td>
                          <td className="px-4 py-2 text-gray-600 text-center">{assignment.teacher}</td>
                          <td className="px-4 py-2 text-gray-600 ml-8">{new Date(assignment.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <nav className="inline-flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`px-4 py-2 rounded-md bg-gray-200 text-gray-600 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`px-4 py-2 rounded-md bg-gray-200 text-gray-600 ${currentRecords.length < recordsPerPage && 'opacity-50 cursor-not-allowed'}`}
                  disabled={currentRecords.length < recordsPerPage}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignSubjectPage;
