import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-topic');
        setTopics(response.data.data || []);
      } catch (error) {
        console.error('Error fetching topics:', error);
        toast.error('Error fetching topics. Please try again later.'); // Toast for error
      }
    };

    fetchTopics();
  }, []);

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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Topic List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Topics</h2>

          <div className="mt-4">
            {topics.length === 0 ? (
              <div className="text-center text-gray-500 bg-gray-100 p-4 rounded-lg shadow-md">
                No topics available.
              </div>
            ) : (
              <div className="space-y-4">
                {topics.map((topic, index) => (
                  <div key={index} className="border rounded-lg shadow-md hover:shadow-xl transition-all p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-800">{topic.topic}</h3>
                    <p className="text-sm text-gray-600">{topic.lesson} - {topic.subject}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default TopicList;
