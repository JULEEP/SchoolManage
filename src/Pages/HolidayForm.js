import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import { FaBars, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const HolidayForm = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [holidayName, setHolidayName] = useState('');
  const [holidayMessage, setHolidayMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle the form submission
  const handleAddHoliday = async (e) => {
    e.preventDefault();
    if (holidayName && holidayMessage && fromDate && toDate) {
      const holidayData = {
        fromDate,
        toDate,
        holidayName,
        holidayMessage,
      };

      try {
        // Making the POST request to the API
        const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/add-holidays', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(holidayData),
        });

        // Debugging: Log the response status and body
        console.log('Response Status:', response.status);
        const data = await response.json();
        console.log('Response Data:', data);

        // Check if the response is successful (status 200 or 201)
        if (response.status === 201) {
          toast.success('Holiday added successfully!'); // Using toast instead of alert
          
          // Reset form fields
          setFromDate('');
          setToDate('');
          setHolidayName('');
          setHolidayMessage('');
        } else {
          toast.error('Failed to add holiday. Please try again.'); // Using toast for error message
        }
      } catch (error) {
        console.error('Error adding holiday:', error);
        toast.error('An error occurred while adding the holiday.'); // Using toast for error message
      }
    } else {
      toast.warning('Please fill in all fields'); // Using toast for warning
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
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
          <h1 className="text-lg font-bold">Add Holiday</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-8">Add Holiday</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <form onSubmit={handleAddHoliday}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Holiday Name</label>
                  <input
                    type="text"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    placeholder="Enter holiday name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Holiday Message</label>
                  <textarea
                    value={holidayMessage}
                    onChange={(e) => setHolidayMessage(e.target.value)}
                    placeholder="Enter holiday message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Add Holiday
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HolidayForm;
