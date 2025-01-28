import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaBars, FaTimes } from "react-icons/fa";

const AssignClassTeacherPage = () => {
  const [formData, setFormData] = useState({
    className: '',
    sectionName: '',
    name: '', // Changed 'teacher' to 'name'
    subject: '', // Added subject
  });

  const [classTeacherAssignments, setClassTeacherAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentsPerPage] = useState(5);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const classResponse = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/get-classes');
        const classData = await classResponse.json();
        setClasses(classData.classes || []);

        const sectionResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-section');
        setSections(sectionResponse.data.sections || []);

        const teacherResponse = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/get-teacher');
        const teacherData = await teacherResponse.json();
        const teacherNames = teacherData.data.map((teacher) => teacher.name);
        setTeachers(teacherNames || []);

        const subjectResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-subjects-names');
        setSubjects(subjectResponse.data.subjectNames || []);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-assign-teacher');
        setClassTeacherAssignments(response.data.assignments || []);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchAssignments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveAssignment = async () => {
    setError('');
    if (formData.className && formData.sectionName && formData.name && formData.subject) {
      setIsLoading(true);
      try {
        const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/assign-teacher', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            class: formData.className,
            section: formData.sectionName,
            name: formData.name,
            subject: formData.subject,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to assign class teacher.');
        }

        const data = await response.json();
        setClassTeacherAssignments([...classTeacherAssignments, { ...data.assignment }]);
        setFormData({ className: '', sectionName: '', name: '', subject: '' });
      } catch (error) {
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleRemoveAssignment = (id) => {
    setClassTeacherAssignments(classTeacherAssignments.filter((assignment) => assignment.id !== id));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = classTeacherAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

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
          <h1 className="text-lg font-bold">Assign Class Teacher</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg text-gray-700 mb-4">Assign Class Teacher</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
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
                  <label htmlFor="name" className="text-sm text-gray-600">Teacher *</label>
                  <select
                    id="name"
                    name="name"
                    value={formData.name}
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
                      subjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))
                    ) : (
                      <option value="">Loading Subjects...</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSaveAssignment}
                  className={`px-6 py-2 rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Class Teacher'}
                </button>
              </div>
            </form>
          </div>

          {/* Assignments Table */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-lg text-gray-700 mb-4">Class Teacher List</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-gray-600">Class</th>
                  <th className="px-4 py-2 text-gray-600">Section</th>
                  <th className="px-4 py-2 text-gray-600">Teacher</th>
                  <th className="px-4 py-2 text-gray-600">Subject</th>
                </tr>
              </thead>
              <tbody>
                {currentAssignments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500">
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  currentAssignments.map((assignment) => (
                    <tr key={assignment.id} className="border-t border-gray-300">
                      <td className="px-4 py-2 text-gray-600">{assignment.class || 'null'}</td>
                      <td className="px-4 py-2 text-gray-600">{assignment.section || 'null'}</td>
                      <td className="px-4 py-2 text-gray-600">{assignment.name || 'null'}</td>
                      <td className="px-4 py-2 text-gray-600">{assignment.subject || 'null'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav className="inline-flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`px-4 py-2 rounded-md bg-gray-200 text-gray-600 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`px-4 py-2 rounded-md bg-gray-200 text-gray-600 ${currentAssignments.length < assignmentsPerPage && 'opacity-50 cursor-not-allowed'}`}
                disabled={currentAssignments.length < assignmentsPerPage}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignClassTeacherPage;
