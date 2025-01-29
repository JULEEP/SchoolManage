import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Importing toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importing the toast styles

const SectionListPage = () => {
  const [sections, setSections] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch sections from the backend
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-section"
        );
        setSections(response.data.sections);
      } catch (error) {
        console.error("Error fetching sections:", error);
        toast.error("Error fetching sections!"); // Error toast
      }
    };

    fetchSections();
  }, []);

  const handleRemoveSection = async (id) => {
    try {
      await axios.delete(
        `https://school-backend-1-2xki.onrender.com/api/admin/delete-section/${id}`
      );
      setSections(sections.filter((section) => section._id !== id));
      toast.success("Section removed successfully!"); // Success toast
    } catch (error) {
      console.error("Error removing section:", error);
      toast.error("Error removing section!"); // Error toast
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
          <h1 className="text-lg font-bold">Section List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Section List */}
        <div className="bg-white p-6 rounded-md shadow-lg mx-4 lg:mx-0 mt-4">
          <h2 className="text-lg text-gray-700 mb-4">Section List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-600">SL</th>
                <th className="px-4 py-2 text-gray-600">Name</th>
                <th className="px-4 py-2 text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {sections.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500">
                    No Data Available In Table
                  </td>
                </tr>
              ) : (
                sections.map((section, index) => (
                  <tr key={section._id} className="border-t border-gray-300">
                    <td className="px-4 py-2 text-gray-600 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-600 text-center">{section.name}</td>
                    <td className="px-4 py-2 text-gray-600 text-center">
                      <button
                        onClick={() => handleRemoveSection(section._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ToastContainer */}
      <ToastContainer />
    </div>
  );
};

export default SectionListPage;
