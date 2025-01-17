import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const CertificateTemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Template 1",
      userType: "Student",
      pageLayout: "Layout 1",
      background: "Blue",
      status: "active",
    },
    {
      id: 2,
      name: "Template 2",
      userType: "Employee",
      pageLayout: "Layout 2",
      background: "Green",
      status: "inactive",
    },
    {
      id: 3,
      name: "Template 3",
      userType: "Student",
      pageLayout: "Layout 3",
      background: "Red",
      status: "active",
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleStatus = (id) => {
    const updatedTemplates = templates.map((template) => {
      if (template.id === id) {
        return {
          ...template,
          status: template.status === "active" ? "inactive" : "active",
        };
      }
      return template;
    });
    setTemplates(updatedTemplates);
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
          <h1 className="text-lg font-bold">Certificate Templates</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>


        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Side - Search and Action Button */}
          <div className="w-full lg:w-1/3 p-6 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Search Templates</h3>

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

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Search
            </button>
          </div>

          {/* Right Side - Certificate Templates List */}
          <div className="w-full lg:w-2/3 p-6 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Certificate Templates List</h3>

            {/* Certificate Templates Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">User Type</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Page Layout</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Background</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        No Data Available In Table
                      </td>
                    </tr>
                  ) : (
                    templates.map((template) => (
                      <tr key={template.id}>
                        <td className="p-2 text-sm text-gray-700">{template.name}</td>
                        <td className="p-2 text-sm text-gray-700">{template.userType}</td>
                        <td className="p-2 text-sm text-gray-700">{template.pageLayout}</td>
                        <td className="p-2 text-sm text-gray-700">{template.background}</td>
                        <td className="p-2 text-sm text-gray-700">
                          <button
                            onClick={() => handleToggleStatus(template.id)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${template.status === "active" ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-600"}`}
                          >
                            {template.status === "active" ? "✓" : "×"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="mt-4 text-sm text-gray-600 text-center">
                Showing {templates.length} to {templates.length} of {templates.length} entries
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplatesPage;
