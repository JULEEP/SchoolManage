import React, { useState } from 'react';
import Sidebar from './Sidebar';

const GenerateIdCard = () => {
  const [formData, setFormData] = useState({
    role: '',
    idCard: '',
    gridGap: '',
  });

  const roles = ['Admin', 'Employee', 'Intern']; // Example Role options
  const idCards = ['ID Card A', 'ID Card B', 'ID Card C']; // Example ID Card options

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your ID card generation logic here
    console.log('Generating ID Card with:', formData);
  };

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar /> {/* Sidebar added here */}

    {/* Main Content */}
    <div className="flex-1 p-6 ml-64"> {/* Add ml-64 to shift the content right */}      {/* Title */}      <div className="bg-white p-6 rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role, ID Card, and Grid Gap in one row */}
          <div className="flex gap-4">
            {/* Role Dropdown */}
            <div className="flex-1">
              <label htmlFor="role" className="text-sm text-gray-600">Role *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* ID Card Dropdown */}
            <div className="flex-1">
              <label htmlFor="idCard" className="text-sm text-gray-600">ID Card *</label>
              <select
                id="idCard"
                name="idCard"
                value={formData.idCard}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select ID Card</option>
                {idCards.map((idCard, index) => (
                  <option key={index} value={idCard}>
                    {idCard}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid Gap Input */}
            <div className="flex-1">
              <label htmlFor="gridGap" className="text-sm text-gray-600">Grid Gap (px) *</label>
              <input
                type="number"
                id="gridGap"
                name="gridGap"
                value={formData.gridGap}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Generate Button aligned to right */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
            >
              Generate ID Card
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default GenerateIdCard;
