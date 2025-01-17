import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons

const StudentExport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  // Function to handle export to CSV
  const handleExportCSV = async () => {
    try {
      const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/export-students?format=excel', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to export to CSV');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students_data.excel'); // Name of the file to download
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    }
  };

  // Function to handle export to PDF
  const handleExportPDF = async () => {
    try {
      const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/export-students?format=pdf', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to export to PDF');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students_data.pdf'); // Name of the file to download
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Export</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Export Section */}
        <div className="p-6">

          <div className="bg-white p-6 shadow-md rounded space-y-6">
            <h2 className="text-lg text-gray-700">All Student Export</h2>

            {/* Buttons: Export to CSV & Export to PDF */}
            <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
              <button
                onClick={handleExportCSV}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
              >
                Export to CSV
              </button>
              <button
                onClick={handleExportPDF}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                Export to PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExport;
