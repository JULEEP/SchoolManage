import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAssignVehicle = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [yearMade, setYearMade] = useState("");
  const [driver, setDriver] = useState("");
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [drivers, setDrivers] = useState(["John Doe", "Jane Smith", "Mike Johnson"]);
  const [isAddDriverPopupOpen, setIsAddDriverPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Add Driver Form Fields
  const [newDriverName, setNewDriverName] = useState("");
  const [newDriverEmail, setNewDriverEmail] = useState("");
  const [newDriverAge, setNewDriverAge] = useState("");
  const [newDriverGender, setNewDriverGender] = useState("");
  const [newDriverMobile, setNewDriverMobile] = useState(""); // New field
  const [newDriverJoiningDate, setNewDriverJoiningDate] = useState(""); // New field

  const handleSaveVehicle = async () => {
    if (vehicleNumber && vehicleModel && yearMade && driver) {
      setLoading(true);
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/add-vehicle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vehicleNumber, vehicleModel, yearMade, driver, note })
        });
        if (!response.ok) throw new Error("Failed to add vehicle");
        const data = await response.json();
        setVehicleList([...vehicleList, { ...data.vehicle, id: vehicleList.length + 1 }]);
        setVehicleNumber("");
        setVehicleModel("");
        setYearMade("");
        setDriver("");
        setNote("");
        toast.success(data.message);
      } catch (err) {
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  // Handle add new driver
  const handleAddDriver = async () => {
    if (
      newDriverName &&
      newDriverEmail &&
      newDriverAge &&
      newDriverGender &&
      newDriverMobile &&
      newDriverJoiningDate
    ) {
      const driverData = {
        name: newDriverName,
        email: newDriverEmail,
        age: newDriverAge,
        gender: newDriverGender,
        mobileNumber: newDriverMobile,
        joiningDate: newDriverJoiningDate,
      };

      setLoading(true);
      setError("");
      setSuccessMessage("");

      try {
        // Make API call to add the driver
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/add-driver", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driverData),
        });

        if (!response.ok) {
          throw new Error("Failed to add driver");
        }

        const data = await response.json();
        const newDriver = `${data.driver.name} (Email: ${data.driver.email}, Age: ${data.driver.age}, Gender: ${data.driver.gender}, Mobile: ${data.driver.mobileNumber}, Joining Date: ${data.driver.joiningDate})`;

        setDrivers([...drivers, newDriver]);

        // Reset form fields after adding the driver
        setNewDriverName("");
        setNewDriverEmail("");
        setNewDriverAge("");
        setNewDriverGender("");
        setNewDriverMobile("");
        setNewDriverJoiningDate("");
        setIsAddDriverPopupOpen(false);

        setSuccessMessage("Driver added successfully");
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="flex min-h-screen">
    <ToastContainer />
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
          <h1 className="text-lg font-bold">Add Assign Vehicle</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Main Form Section */}
        <div className="max-w-3xl mx-auto mt-4 p-6 bg-gray-100 rounded-lg shadow-lg">
          {/* Vehicle Form */}
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

          <button
            onClick={handleSaveVehicle}
            className="w-32 bg-purple-500 text-white p-2 rounded hover:bg-purple-600 float-right mt-8"
          >
            Save Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAssignVehicle;
