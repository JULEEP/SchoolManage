import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const CertificateTypePage = () => {
  const [name, setName] = useState("");
  const [applicableFor, setApplicableFor] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [certificateTypes, setCertificateTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleSave = () => {
    if (name && applicableFor && shortCode) {
      const newCertificate = {
        id: certificateTypes.length + 1,
        name,
        applicableFor,
        shortCode,
      };
      setCertificateTypes([...certificateTypes, newCertificate]);
      setName(""); // Reset Name field
      setApplicableFor(""); // Reset Applicable For field
      setShortCode(""); // Reset Short Code field
    }
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
          <h1 className="text-lg font-bold">Certificate Type</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Certificate Type</h2>

        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Side - Add Certificate Type Form */}
          <div className="w-full lg:w-1/3 p-6 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Certificate Type</h3>

            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Certificate Type"
              />
            </div>

            {/* Applicable For Dropdown */}
            <div className="mb-4">
              <label htmlFor="applicableFor" className="block text-sm font-medium text-gray-700">
                Applicable For *
              </label>
              <select
                id="applicableFor"
                value={applicableFor}
                onChange={(e) => setApplicableFor(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Applicable For</option>
                <option value="Student">Student</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            {/* Short Code Radio Buttons */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Short Code *</label>
              <div className="flex space-x-6">
                <div>
                  <input
                    type="radio"
                    id="selectAll"
                    name="shortCode"
                    value="Select All"
                    checked={shortCode === "Select All"}
                    onChange={(e) => setShortCode(e.target.value)}
                  />
                  <label htmlFor="selectAll" className="ml-2 text-sm text-gray-700">
                    Select All
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Save Certificate
            </button>
          </div>

          {/* Right Side - Certificate Types List */}
          <div className="w-full lg:w-2/3 p-6 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Certificate Types List</h3>

            {/* Search Form */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Certificate Types Table */}
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {certificateTypes.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No Data Available In Table
                    </td>
                  </tr>
                ) : (
                  certificateTypes.map((certificate) => (
                    <tr key={certificate.id}>
                      <td className="p-2 text-sm text-gray-700">{certificate.name}</td>
                      <td className="p-2 text-sm text-gray-700">{certificate.applicableFor}</td>
                      <td className="p-2 text-sm text-gray-700">
                        <button className="text-blue-600 hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 text-sm text-gray-600 text-center">
              Showing {certificateTypes.length} to {certificateTypes.length} of {certificateTypes.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTypePage;
