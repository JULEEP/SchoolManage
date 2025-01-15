import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar is a separate component
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';

const UploadContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [contentTitle, setContentTitle] = useState('');
  const [contentType, setContentType] = useState('');
  const [availableFor, setAvailableFor] = useState('All');
  const [date, setDate] = useState('2024-12-15');
  const [description, setDescription] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [message, setMessage] = useState('');
  const [contentList, setContentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-content');
        if (response.data.message === 'Content retrieved successfully.') {
          setContentList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!contentTitle.trim() || !contentType.trim()) {
      setMessage('Title and Type are required fields.');
      return;
    }

    const formData = {
      contentTitle,
      contentType,
      availableFor,
      date,
      description,
      sourceURL: sourceUrl,
    };

    try {
      const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/upload-content', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === 'Content uploaded successfully.') {
        setMessage(response.data.message);
        setContentTitle('');
        setContentType('');
        setAvailableFor('All');
        setDate('2024-12-15');
        setDescription('');
        setSourceUrl('');

        const contentResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-content');
        if (contentResponse.data.message === 'Content retrieved successfully.') {
          setContentList(contentResponse.data.data);
        }
      }
    } catch (error) {
      console.error('Error uploading content:', error);
      setMessage('Error uploading content.');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contentList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contentList.length / itemsPerPage);

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
          <h1 className="text-lg font-bold">Upload Content</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload New Content</h2>
          {message && <p className="mb-4 text-green-500">{message}</p>}
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Content Title"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-3"
            />
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="border border-gray-300 rounded-md p-3"
            >
              <option value="">Select Content Type</option>
              <option value="Document">Document</option>
              <option value="Video">Video</option>
              <option value="Audio">Audio</option>
            </select>
            <select
              value={availableFor}
              onChange={(e) => setAvailableFor(e.target.value)}
              className="border border-gray-300 rounded-md p-3"
            >
              <option value="All">All</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-md p-3"
            />
          </div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full mt-4"
          ></textarea>
          <input
            type="text"
            placeholder="Source URL"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full mt-4"
          />
          <button
            type="button"
            onClick={handleSave}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-md"
          >
            Save
          </button>
        </div>

        {/* Content List Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Uploaded Content</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">SL</th>
                  <th className="px-4 py-2 text-left">Content Title</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Available For</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((content, index) => (
                  <tr key={content._id}>
                    <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                    <td className="px-4 py-2">{content.contentTitle}</td>
                    <td className="px-4 py-2">{content.contentType}</td>
                    <td className="px-4 py-2">{new Date(content.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{content.availableFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;
