import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const VehiclePage = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [yearMade, setYearMade] = useState("");
  const [driver, setDriver] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [drivers, setDrivers] = useState(["John Doe", "Jane Smith", "Mike Johnson"]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const handleSaveVehicle = async () => {
    if (vehicleNumber && vehicleModel && yearMade && driver) {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/add-vehicle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicleNumber,
            vehicleModel,
            yearMade,
            driver,
            note,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add vehicle");
        }

        const data = await response.json();
        setSuccessMessage(data.message);
        toast.success("Vehicle added successfully!"); // Success toast
        setVehicleNumber("");
        setVehicleModel("");
        setYearMade("");
        setDriver("");
        setNote("");
      } catch (err) {
        setError(err.message || "Something went wrong");
        toast.error("Failed to add vehicle. Please try again."); // Error toast
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill in all required fields.");
      toast.warning("Please fill in all required fields."); // Warning toast
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
          <h1 className="text-lg font-bold">Add Vehicle</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Vehicle Form */}
        <div className="space-y-4 mt-4 max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <div>
            <label className="block text-sm text-gray-600 mb-1 mt-2">Vehicle Number *</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="Enter vehicle number"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Vehicle Model *</label>
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              placeholder="Enter vehicle model"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Year Made</label>
            <input
              type="number"
              value={yearMade}
              onChange={(e) => setYearMade(e.target.value)}
              placeholder="Enter year made"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Driver *</label>
            <select
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Driver</option>
              {drivers.map((driverName, index) => (
                <option key={index} value={driverName}>
                  {driverName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter any notes"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {loading && <p className="text-gray-500 text-sm">Saving...</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          {/* Save Vehicle Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveVehicle}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 text-sm"
            >
              Save Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default VehiclePage;
