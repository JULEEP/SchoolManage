import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const AddMeeting = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [agenda, setAgenda] = useState('');
  const [location, setLocation] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false); // state to control popup visibility

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle meeting creation
  const handleCreateMeeting = async () => {
    try {
      if (!date || !time || !agenda || !location) {
        alert("All fields are required.");
        return;
      }

      const response = await axios.post('http://localhost:4000/api/admin/create-meeting', {
        date,
        time,
        agenda,
        location
      });

      if (response.status === 201) {
        setIsPopupVisible(true); // show popup on success
        setDate('');
        setTime('');
        setAgenda('');
        setLocation('');
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
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
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Create Meeting</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Meeting</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm text-gray-600">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm text-gray-600">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Agenda */}
              <div>
                <label htmlFor="agenda" className="block text-sm text-gray-600">
                  Agenda <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="agenda"
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm text-gray-600">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-2 mt-6">
                <button
                  type="button"
                  onClick={handleCreateMeeting}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 w-full sm:w-auto"
                >
                  Create Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full text-center">
            <div className="text-green-500 text-2xl mb-4">
              <span role="img" aria-label="check icon">✔️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Meeting Created Successfully</h3>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMeeting;
