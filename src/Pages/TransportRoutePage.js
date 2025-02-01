import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import { MdCheckCircle } from "react-icons/md"; // Success icon for the modal

const TransportRoutePage = () => {
  const [routeTitle, setRouteTitle] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [drivers, setDrivers] = useState([]); // Drivers list
  const [stops, setStops] = useState([{ stopName: "", arrivalTime: "" }]);
  const [date, setDate] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch the list of drivers from the API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/drivers");
        setDrivers(response.data); // Assuming the response contains a list of drivers
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  // Handle adding a stop
  const handleAddStop = () => {
    setStops([...stops, { stopName: "", arrivalTime: "" }]);
  };

  // Handle remove stop
  const handleRemoveStop = (index) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    setStops(updatedStops);
  };

  // Handle save route
  const handleSaveRoute = async () => {
    if (routeTitle && driverName && driverMobile && stops.length > 0 && date) {
      try {
        const response = await axios.post(
          "https://school-backend-1-2xki.onrender.com/api/admin/add-transport-route",
          {
            routeTitle,
            driver: { name: driverName, mobileNumber: driverMobile },
            stops,
            date,
          }
        );

        if (response.status === 201) {
          setRouteTitle("");
          setDriverName("");
          setDriverMobile("");
          setStops([{ stopName: "", arrivalTime: "" }]);
          setDate("");
          setIsModalOpen(true); // Show modal on success
        }
      } catch (error) {
        console.error("Error adding route:", error);
        alert("Error adding route. Please try again.");
      }
    } else {
      alert("Please fill all fields properly.");
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
              <label className="block text-sm text-gray-600 mb-1">Driver Name *</label>
              <select
                value={driverName}
                onChange={(e) => {
                  const selectedDriver = drivers.find(driver => driver.name === e.target.value);
                  setDriverName(e.target.value);
                  setDriverMobile(selectedDriver ? selectedDriver.mobileNumber : "");
                }}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select a driver</option>
                {drivers.map((driver) => (
                  <option key={driver.name} value={driver.name}>
                    {driver.name} {/* Only show name here */}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Driver Mobile Number *</label>
              <input
                type="text"
                value={driverMobile}
                readOnly
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            

              <div>
                <label className="block text-sm text-gray-600 mb-1">Stops *</label>
                {stops.map((stop, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={stop.stopName}
                      onChange={(e) => {
                        const newStops = [...stops];
                        newStops[index].stopName = e.target.value;
                        setStops(newStops);
                      }}
                      placeholder="Enter stop name"
                      className="w-1/2 border border-gray-300 p-2 rounded"
                    />
                   {/* Arrival Time */}
<div className="flex flex-col">
<label htmlFor={`arrivalTime-${index}`} className="text-gray-600 mb-1">
  Arrival Time
</label>
<input
  type="time"
  id={`arrivalTime-${index}`}
  name="arrivalTime"
  value={stop.arrivalTime}
  onChange={(e) => {
    const updatedStops = [...stops];
    updatedStops[index].arrivalTime = e.target.value;
    setStops(updatedStops);
  }}
  className="border border-gray-300 p-2 rounded"
  required
/>
</div>

                    {stops.length > 1 && (
                      <button
                        onClick={() => handleRemoveStop(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddStop}
                  className="text-blue-500 text-sm"
                >
                  Add Stop
                </button>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Success!</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-2xl text-gray-500"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <MdCheckCircle className="text-green-500 text-4xl" />
            </div>
            <p className="text-center mt-4">You have created the route successfully!</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-green-500 text-white p-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportRoutePage;
