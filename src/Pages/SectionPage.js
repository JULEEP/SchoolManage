import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const SectionPage = () => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveSection = async () => {
    if (formData.name) {
      try {
        if (formData.id) {
          // Update section
          await axios.put(
            `https://school-backend-1-2xki.onrender.com/api/admin/update-section/${formData.id}`,
            { name: formData.name }
          );
        } else {
          // Add new section
          await axios.post(
            "https://school-backend-1-2xki.onrender.com/api/admin/add-section",
            { name: formData.name }
          );
        }
        setFormData({ id: null, name: "" }); // Clear form
      } catch (error) {
        console.error("Error saving section:", error);
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Add Section</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Add Section Form */}
        <div className="bg-white p-6 rounded-md shadow-md mb-6 mx-4 mt-4 lg:mx-0">
          <h2 className="text-lg text-gray-700 mb-4">Add Section</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-gray-600">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleSaveSection}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                {formData.id ? "Update Section" : "Save Section"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
