import React, { useState } from 'react';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';

const UploadContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [contentTitle, setContentTitle] = useState('');
  const [contentType, setContentType] = useState('');
  const [availableFor, setAvailableFor] = useState('All');
  const [date, setDate] = useState('2024-12-15');
  const [description, setDescription] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [message, setMessage] = useState('');

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
      }
    } catch (error) {
      console.error('Error uploading content:', error);
      setMessage('Error uploading content.');
    }
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
          <h1 className="text-lg font-bold">Upload Content</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload New Content</h2>
          {message && <p className="mb-4 text-green-500">{message}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Content Title"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            />
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            >
              <option value="">Select Content Type</option>
              <option value="Document">Document</option>
              <option value="Video">Video</option>
              <option value="Audio">Audio</option>
            </select>
            <select
              value={availableFor}
              onChange={(e) => setAvailableFor(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            >
              <option value="All">All</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
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
      </div>
    </div>
  );
};

export default UploadContent;
