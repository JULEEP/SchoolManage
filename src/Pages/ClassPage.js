import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const ClassPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    section: '',
  });

  const [sections, setSections] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-section');
        setSections(response.data.sections);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'section') {
      setSelectedSections([...selectedSections, value]);
      setFormData({ ...formData, section: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveClass = async () => {
    if (formData.name && selectedSections.length > 0) {
      try {
        const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/add-class', {
          className: formData.name,
          sections: selectedSections,
        });
        setFormData({ name: '', section: '' });
        setSelectedSections([]);
      } catch (error) {
        console.error('Error adding class:', error);
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar overlay for mobile */}
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
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Classes</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Add Class Form */}
        <div className="bg-white p-6 rounded-md shadow-md mb-6 mx-4 mt-4 lg:mx-0">
          <h2 className="text-lg text-gray-700 mb-4">Add Class</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-sm text-gray-600">
                  Class Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="section" className="text-sm text-gray-600">
                  Section *
                </label>
                <select
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled>
                    Select a section
                  </option>
                  {sections.map((section) => (
                    <option key={section._id} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedSections.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm text-gray-600">Selected Sections:</h3>
                <ul>
                  {selectedSections.map((section, index) => (
                    <li key={index} className="text-gray-600">
                      {section}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={handleSaveClass}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
