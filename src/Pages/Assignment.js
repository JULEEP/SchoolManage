import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar is a separate component
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-assignment');
        if (response.data) {
          setAssignments(response.data);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter(
    (assignment) =>
      (assignment.assignmentTitle && assignment.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (assignment.subject && assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Assignment List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Assignments</h2>
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full lg:w-1/3"
          />
        </div>

        {/* Assignments Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-full overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Assignment List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Available For</th>
                  <th className="px-4 py-2 text-left">Class (Section)</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment, index) => (
                    <tr key={assignment._id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{assignment.assignmentTitle || 'N/A'}</td>
                      <td className="px-4 py-2">{assignment.subject || 'N/A'}</td>
                      <td className="px-4 py-2">
                        {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-2">{assignment.availableFor || 'N/A'}</td>
                      <td className="px-4 py-2">
                        {assignment.class || 'N/A'} ({assignment.section || 'N/A'})
                      </td>
                      <td className="px-4 py-2">{assignment.description || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                      No assignments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentList;
