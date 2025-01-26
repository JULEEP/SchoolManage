import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons

const TransportRoutePage = () => {
  const [routeTitle, setRouteTitle] = useState("");
  const [fare, setFare] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Handle save route
  const handleSaveRoute = async () => {
    if (routeTitle && fare) {
      try {
        const response = await axios.post(
          "https://school-backend-1-2xki.onrender.com/api/admin/add-transport-route",
          {
            routeTitle,
            fare,
          }
        );

        if (response.status === 201) {
          setRouteTitle("");
          setFare("");
        }
      } catch (error) {
        console.error("Error adding route:", error);
      }
    } else {
      alert("Please provide both route title and fare.");
    }
  };

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
          <h1 className="text-lg font-bold">Transport Route</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-wrap gap-8 px-6">
          {/* Left Side - Add Route Form */}
          <div className="w-full sm:w-1/3 bg-gray-50 p-4 rounded shadow mt-4">
            <h2 className="text-lg mb-4 text-gray-600">Add Route</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Route Title *</label>
                <input
                  type="text"
                  value={routeTitle}
                  onChange={(e) => setRouteTitle(e.target.value)}
                  placeholder="Enter route title"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Fare *</label>
                <input
                  type="number"
                  value={fare}
                  onChange={(e) => setFare(e.target.value)}
                  placeholder="Enter fare amount"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <button
                onClick={handleSaveRoute}
                className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
              >
                Save Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportRoutePage;
