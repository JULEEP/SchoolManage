import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes, FaPlus, FaBusAlt, FaTrash } from "react-icons/fa";

const BusForm = () => {
  const [busNumber, setBusNumber] = useState("");
  const [stopName, setStopName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [route, setRoute] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to add a stop to the route
  const handleAddStop = () => {
    if (!stopName || !lat || !lng) {
      alert("Please fill all fields before adding a stop.");
      return;
    }

    setRoute((prevRoute) => [
      ...prevRoute,
      { stopName, lat: parseFloat(lat), lng: parseFloat(lng) },
    ]);

    // Clear input fields after adding
    setStopName("");
    setLat("");
    setLng("");
  };

  // Function to remove a stop
  const handleRemoveStop = (index) => {
    setRoute((prevRoute) => prevRoute.filter((_, i) => i !== index));
  };

  // Function to submit the bus route data
  const handleSubmit = async () => {
    if (!busNumber || route.length === 0) {
      alert("Please enter a bus number and add at least one stop.");
      return;
    }

    const data = { busNumber, route };

    try {
      const response = await fetch(
        "https://school-backend-1-2xki.onrender.com/api/bus/update-location",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      alert(result.message);
      setBusNumber("");
      setRoute([]);
    } catch (error) {
      console.error("Error submitting bus route:", error);
      alert("Failed to update bus route.");
    }
  };

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

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
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-600 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold flex items-center">
            <FaBusAlt className="mr-2" /> Bus Management
          </h1>
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Bus Form */}
        <div className="bg-white p-6 rounded-md shadow-md mt-6 mx-4 lg:mx-0">
          <h2 className="text-lg text-gray-700 mb-4">Update Bus Route</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bus Number */}
            <div>
              <label className="text-sm text-gray-600">Bus Number *</label>
              <input
                type="text"
                placeholder="Bus Number"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Stop Name */}
            <div>
              <label className="text-sm text-gray-600">Stop Name *</label>
              <input
                type="text"
                placeholder="Stop Name"
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Latitude */}
            <div>
              <label className="text-sm text-gray-600">Latitude *</label>
              <input
                type="number"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Longitude */}
            <div>
              <label className="text-sm text-gray-600">Longitude *</label>
              <input
                type="number"
                placeholder="Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Add Stop Button */}
          <button
            onClick={handleAddStop}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Stop
          </button>

          {/* Stop List */}
          {route.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm text-gray-600">Added Stops:</h3>
              <ul className="bg-gray-50 p-4 rounded-md border border-gray-200">
                {route.map((stop, index) => (
                  <li
                    key={index}
                    className="py-2 px-3 bg-white rounded-md shadow-sm mb-2 flex justify-between items-center"
                  >
                    <span>
                      <strong>{stop.stopName}</strong> - {stop.lat}, {stop.lng}
                    </span>
                    <button
                      onClick={() => handleRemoveStop(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Bus Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusForm;
