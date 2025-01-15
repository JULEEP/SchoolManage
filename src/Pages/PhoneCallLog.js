import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const PhoneCallLog = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '12/15/2024',
    followUpDate: '12/15/2024',
    callDuration: '',
    description: '',
    type: 'Incoming',
  });

  const [phoneCallList, setPhoneCallList] = useState([]);
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, type: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/add-phones', formData);
      setPhoneCallList([...phoneCallList, response.data.phoneCall]);
      setFormData({
        name: '',
        phone: '',
        date: '12/15/2024',
        followUpDate: '12/15/2024',
        callDuration: '',
        description: '',
        type: 'Incoming',
      });
      setMessage('Phone call added successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding phone call.');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 z-50 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 lg:hidden">
          <h1 className="text-lg font-bold">Phone Call Log</h1>
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Form */}
        <div className="p-4 lg:p-8">
          {message && (
            <div
              className={`p-4 mb-4 text-sm ${
                message.includes('success') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
              } rounded-md`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Input Fields */}
            {['name', 'phone', 'callDuration', 'description'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="text-sm text-gray-600 capitalize">
                  {field}
                </label>
                <input
                  type={field === 'description' ? 'textarea' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required={field === 'phone'}
                />
              </div>
            ))}
            {/* Date Fields */}
            {['date', 'followUpDate'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="text-sm text-gray-600 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="date"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required={field === 'date'}
                />
              </div>
            ))}
            {/* Radio Buttons */}
            <div>
              <label className="text-sm text-gray-600">Type</label>
              <div className="flex gap-4">
                {['Incoming', 'Outgoing'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={formData.type === type}
                      onChange={handleRadioChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
              <button
                type="submit"
                className="w-full px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                Save Phone Call
              </button>
            </div>
          </form>

          {/* Phone Call List */}
          <div>
            <h2 className="text-lg text-gray-700 mb-4">Phone Call List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    {['SL', 'Name', 'Phone', 'Date', 'Follow Up Date', 'Call Duration'].map((header) => (
                      <th key={header} className="px-4 py-2 text-left text-gray-600">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {phoneCallList.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-500 py-4">
                        No Data Available
                      </td>
                    </tr>
                  ) : (
                    phoneCallList.map((call, index) => (
                      <tr key={index} className="border-t border-gray-300">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{call.name}</td>
                        <td className="px-4 py-2">{call.phone}</td>
                        <td className="px-4 py-2">{call.date}</td>
                        <td className="px-4 py-2">{call.followUpDate}</td>
                        <td className="px-4 py-2">{call.callDuration}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneCallLog;
