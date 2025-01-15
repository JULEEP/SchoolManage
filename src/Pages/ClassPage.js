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
  const [classes, setClasses] = useState([]);
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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-classes');
        setClasses(response.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
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

  const handleEditClass = (id) => {
    const classItem = classes.find((c) => c._id === id);
    if (classItem) {
      setFormData({ name: classItem.className, section: '' });
      setSelectedSections(classItem.sections); // Populate the selected sections
    }
  };

  

  const handleSaveClass = async () => {
    if (formData.name && selectedSections.length > 0) {
      try {
        const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/add-class', {
          className: formData.name,
          sections: selectedSections,
        });
        setClasses([
          ...classes,
          { _id: response.data.class._id, className: formData.name, sections: selectedSections, students: 0 },
        ]);
        setFormData({ name: '', section: '' });
        setSelectedSections([]);
      } catch (error) {
        console.error('Error adding class:', error);
      }
    }
  };

  const handleRemoveClass = async (id) => {
    try {
      await axios.delete(`https://school-backend-1-2xki.onrender.com/api/admin/remove-class/${id}`);
      setClasses(classes.filter((classItem) => classItem._id !== id));
    } catch (error) {
      console.error('Error removing class:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
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

        {/* Class List */}
        <div className="bg-white p-6 rounded-md shadow-lg mx-4 lg:mx-0">
          <h2 className="text-lg text-gray-700 mb-4">Class List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-600">Class</th>
                <th className="px-4 py-2 text-gray-600">Sections</th>
                <th className="px-4 py-2 text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500">
                    No Data Available In Table
                  </td>
                </tr>
              ) : (
                classes.map((classItem) => (
                  <tr key={classItem._id} className="border-t border-gray-300">
                    <td className="px-4 py-2 text-gray-600 text-center">{classItem.className}</td>
                    <td className="px-4 py-2 text-gray-600 text-center">
                      {classItem.sections.join(', ')}
                    </td>
                    <td className="px-4 py-2 text-gray-600 text-center">
                      <button
                        onClick={() => handleEditClass(classItem._id)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveClass(classItem._id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
