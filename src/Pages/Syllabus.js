import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const SyllabusList = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-syllabus');
        if (response.data) {
          setSyllabusList(response.data);
        }
      } catch (error) {
        console.error('Error fetching syllabus data:', error);
      }
    };

    fetchSyllabus();
  }, []);

  const filteredSyllabus = syllabusList.filter(
    (syllabus) =>
      (syllabus.syllabusTitle && syllabus.syllabusTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (syllabus.syllabusType && syllabus.syllabusType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Syllabus List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Search */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Syllabus List</h1>
          <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:gap-4">
            <label htmlFor="search" className="text-gray-600 text-sm mb-2 lg:mb-0">Quick Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Search by title or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left px-4 py-2">Syllabus Title</th>
                  <th className="text-left px-4 py-2">Type</th>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Available for</th>
                  <th className="text-left px-4 py-2">Class (Section)</th>
                  <th className="text-left px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSyllabus.length > 0 ? (
                  filteredSyllabus.map((syllabus) => (
                    <tr key={syllabus._id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{syllabus.syllabusTitle || 'N/A'}</td>
                      <td className="px-4 py-2">{syllabus.syllabusType || 'N/A'}</td>
                      <td className="px-4 py-2">
                        {syllabus.date ? new Date(syllabus.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-2">{syllabus.availableFor || 'N/A'}</td>
                      <td className="px-4 py-2">
                        {syllabus.class || 'N/A'} ({syllabus.section || 'N/A'})
                      </td>
                      <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">
                        <a href={`/${syllabus.file}`} target="_blank" rel="noopener noreferrer">
                          View File
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                      No syllabus data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 text-gray-600 text-sm">
            <p>Showing {filteredSyllabus.length} entries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusList;
