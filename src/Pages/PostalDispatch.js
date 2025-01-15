import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa'; // Mobile sidebar toggle icons

const PostalDispatch = () => {
  const [formData, setFormData] = useState({
    toTitle: '',
    referenceNo: '',
    address: '',
    note: '',
    fromTitle: '',
    date: '12/15/2024',
    file: null,
  });

  const [postalList, setPostalList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostalList([...postalList, formData]);
    setFormData({
      toTitle: '',
      referenceNo: '',
      address: '',
      note: '',
      fromTitle: '',
      date: '12/15/2024',
      file: null,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Postal Dispatch</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Add Postal Dispatch</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="toTitle" className="text-sm text-gray-600">To Title *</label>
            <input
              type="text"
              id="toTitle"
              name="toTitle"
              value={formData.toTitle}
              onChange={handleChange}
              placeholder="Enter To Title"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="referenceNo" className="text-sm text-gray-600">Reference No *</label>
            <input
              type="text"
              id="referenceNo"
              name="referenceNo"
              value={formData.referenceNo}
              onChange={handleChange}
              placeholder="Enter Reference No"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="text-sm text-gray-600">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="note" className="text-sm text-gray-600">Note</label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Enter Note"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            />
          </div>

          <div>
            <label htmlFor="fromTitle" className="text-sm text-gray-600">From Title *</label>
            <input
              type="text"
              id="fromTitle"
              name="fromTitle"
              value={formData.fromTitle}
              onChange={handleChange}
              placeholder="Enter From Title"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="text-sm text-gray-600">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="text-sm text-gray-600">File</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-2">(PDF, DOC, DOCX, JPG, JPEG, PNG, TXT are allowed for upload)</p>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm w-full"
            >
              Save
            </button>
          </div>
        </form>

        {/* Postal List Section */}
        <div className="mt-8">
          <h2 className="text-lg text-gray-700 mb-4">Postal Dispatch List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-gray-600">SL</th>
                  <th className="px-4 py-2 text-gray-600">To Title</th>
                  <th className="px-4 py-2 text-gray-600">Reference No</th>
                  <th className="px-4 py-2 text-gray-600">Address</th>
                  <th className="px-4 py-2 text-gray-600">From Title</th>
                  <th className="px-4 py-2 text-gray-600">Note</th>
                </tr>
              </thead>
              <tbody>
                {postalList.map((postal, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-600">{postal.toTitle}</td>
                    <td className="px-4 py-2 text-gray-600">{postal.referenceNo}</td>
                    <td className="px-4 py-2 text-gray-600">{postal.address}</td>
                    <td className="px-4 py-2 text-gray-600">{postal.fromTitle}</td>
                    <td className="px-4 py-2 text-gray-600">{postal.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostalDispatch;
