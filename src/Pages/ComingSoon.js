import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Import your Sidebar component
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const ImageDisplay = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  return (
    <div className="flex min-h-screen">
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
          <h1 className="text-lg font-bold">Image Display</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Image Display */}
        <div className="p-6">
          <div className="flex justify-center">
            <img
              src="https://t3.ftcdn.net/jpg/02/48/39/78/360_F_248397818_Wey1l20OH5SdyDslNe7pUgkYiEmp5koS.jpg"
              alt="Beautiful Image"
              className="w-full max-w-3xl rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
