import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import { FaBars, FaTimes } from 'react-icons/fa'; // Mobile sidebar toggle icons

const AdmissionQuery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar Overlay */}
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
        <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Mobile View: Header and Sidebar Toggle Icon */}
          <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
            <h1 className="text-lg font-bold">Admission Query</h1>
            <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Title Section */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-8 lg:mb-8 mt-4">Admission Query</h1>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-md shadow-md mb-8">
            {/* Select Criteria */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600 text-lg">Select Criteria</p>
              <button
                onClick={toggleModal}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
              >
                + ADD
              </button>
            </div>

            {/* Input Fields Row */}
            <div className="flex flex-wrap gap-4 items-end mb-8">
              {/* Date From */}
              <div className="flex flex-col w-full sm:w-1/5 min-w-[180px]">
                <label className="text-gray-600 text-sm mb-2" htmlFor="date-from">Date From</label>
                <input
                  type="date"
                  id="date-from"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                />
              </div>

              {/* Date To */}
              <div className="flex flex-col w-full sm:w-1/5 min-w-[180px]">
                <label className="text-gray-600 text-sm mb-2" htmlFor="date-to">Date To</label>
                <input
                  type="date"
                  id="date-to"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                />
              </div>

              {/* Source */}
              <div className="flex flex-col w-full sm:w-1/5 min-w-[180px]">
                <label className="text-gray-600 text-sm mb-2" htmlFor="source">Source</label>
                <select
                  id="source"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                >
                  <option value="">Select Source</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="referral">Referral</option>
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col w-full sm:w-1/5 min-w-[180px]">
                <label className="text-gray-600 text-sm mb-2" htmlFor="status">Status</label>
                <select
                  id="status"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="">Select Status</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end">
              <button className="px-8 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
                Search
              </button>
            </div>
          </div>

          {/* Query List Table Section */}
          <div className="bg-white p-8 rounded-md shadow-md">
            <h3 className="text-xl text-gray-700 mb-4">Query List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-gray-600">SL</th>
                    <th className="px-4 py-2 text-gray-600">Name</th>
                    <th className="px-4 py-2 text-gray-600">Phone</th>
                    <th className="px-4 py-2 text-gray-600">Source</th>
                    <th className="px-4 py-2 text-gray-600">Query Date</th>
                    <th className="px-4 py-2 text-gray-600">Last Follow-up Date</th>
                    <th className="px-4 py-2 text-gray-600">Next Follow-up Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample Data Row */}
                  <tr className="border-t border-gray-300">
                    <td className="px-4 py-2 text-gray-600">1</td>
                    <td className="px-4 py-2 text-gray-600">John Doe</td>
                    <td className="px-4 py-2 text-gray-600">123-456-7890</td>
                    <td className="px-4 py-2 text-gray-600">Online</td>
                    <td className="px-4 py-2 text-gray-600">2024-12-10</td>
                    <td className="px-4 py-2 text-gray-600">2024-12-11</td>
                    <td className="px-4 py-2 text-gray-600">2024-12-15</td>
                  </tr>
                  {/* You can add more rows here */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Adding a New Query */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 w-[700px] overflow-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl text-gray-700">Admission Query</h2>
                  <button onClick={toggleModal} className="text-2xl text-gray-600">×</button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="name" className="text-gray-600 text-sm">Name *</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-gray-600 text-sm">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        placeholder="Enter Phone"
                        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-gray-600 text-sm">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="address" className="text-gray-600 text-sm">Address</label>
                      <input
                        type="text"
                        id="address"
                        placeholder="Enter Address"
                        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="text-gray-600 text-sm">Description</label>
                      <textarea
                        id="description"
                        placeholder="Enter Description"
                        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      ></textarea>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="date-from" className="text-gray-600 text-sm">Date From *</label>
                      <input
                        type="date"
                        id="date-from"
                        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="date-to" className="text-gray-600 text-sm">Date To *</label>
                      <input
                        type="date"
                        id="date-to"
                        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-between mt-8">
                    <button onClick={toggleModal} className="px-6 py-2 bg-gray-300 rounded-md">Cancel</button>
                    <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Save</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdmissionQuery;
