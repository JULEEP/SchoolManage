import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const CertificatePage = () => {
  const [formData, setFormData] = useState({
    certificateName: "",
    headerLeftText: "",
    date: "12/15/2024",
    body: "",
    bodyFont: "Arial",
    fontSize: "2em",
    footerLeftText: "",
    footerCenterText: "",
    footerRightText: "",
    pageLayout: "A4(Portrait)", // Default page layout
    height: "",
    width: "",
    studentPhoto: "Yes",
    image: null,
  });

  const [certificateList, setCertificateList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manage sidebar state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCertificateList([
      ...certificateList,
      {
        ...formData,
        id: certificateList.length + 1,
      },
    ]);
    setFormData({
      certificateName: "",
      headerLeftText: "",
      date: "12/15/2024",
      body: "",
      bodyFont: "Arial",
      fontSize: "2em",
      footerLeftText: "",
      footerCenterText: "",
      footerRightText: "",
      pageLayout: "A4(Portrait)",
      height: "",
      width: "",
      studentPhoto: "Yes",
      image: null,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Add Certificate</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>


        {/* Form Section */}
        <div className="bg-white p-6 rounded-md shadow-md mt-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">Certificate Name *</label>
              <input
                type="text"
                name="certificateName"
                value={formData.certificateName}
                onChange={handleChange}
                placeholder="Enter Certificate Name"
                required
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Header Left Text</label>
              <input
                type="text"
                name="headerLeftText"
                value={formData.headerLeftText}
                onChange={handleChange}
                placeholder="Enter Header Left Text"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="text-sm text-gray-600">Body</label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Enter Body (Max 500 characters)"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength={500}
              />
            </div>

            {/* Other fields */}
            {/* ... same structure, adjusting col-span where necessary */}
            
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
            >
              Save Certificate
            </button>
          </div>          
          </form>
        </div>

        {/* Certificate List Section */}
        <div className="bg-white p-6 mt-6 rounded-md shadow-md">
          <h2 className="text-lg text-gray-700 mb-4">Certificate List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-600">SL</th>
                <th className="px-4 py-2 text-gray-600">Name</th>
                <th className="px-4 py-2 text-gray-600">Background Image</th>
                <th className="px-4 py-2 text-gray-600">Default For</th>
              </tr>
            </thead>
            <tbody>
              {certificateList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500">
                    No Data Available In Table
                  </td>
                </tr>
              ) : (
                certificateList.map((certificate, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-600">{certificate.certificateName}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {certificate.image ? "Uploaded" : "None"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{certificate.pageLayout}</td>
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

export default CertificatePage;
