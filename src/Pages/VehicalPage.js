import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons

const VehiclePage = () => {
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
        setVehicleList([...vehicleList, { ...data.vehicle, id: vehicleList.length + 1 }]);
        setVehicleNumber("");
        setVehicleModel("");
        setYearMade("");
        setDriver("");
        setNote("");
        setSuccessMessage(data.message);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill in all required fields.");
    }
  };

  // Filter vehicle list based on search term
  const filteredVehicles = vehicleList.filter((vehicle) =>
    vehicle.vehicleNumber.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-lg font-bold">Vehicle</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="space-y-4">
          {/* Vehicle Form */}
          <div className="space-y-4 mt-4">
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
              className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
            >
              Save Vehicle
            </button>
          </div>
        </div>

        {/* Right Side - Vehicle List */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-600">Vehicle List</h2>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search by Vehicle No."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
              />
              <button
                onClick={() => setIsAddDriverPopupOpen(true)} // Opens the add driver modal
                className="bg-purple-500 text-white mt-2 mr-2 p-1 rounded hover:bg-purple-600"
              >
                Add Driver
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">SL</th>
                  <th className="px-4 py-2 text-left text-gray-600">Vehicle No</th>
                  <th className="px-4 py-2 text-left text-gray-600">Model No</th>
                  <th className="px-4 py-2 text-left text-gray-600">Year Made</th>
                  <th className="px-4 py-2 text-left text-gray-600">Driver Name</th>
                  <th className="px-4 py-2 text-left text-gray-600">Driver License</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No Data Available In Table
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((vehicle, index) => (
                    <tr key={vehicle.id} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{vehicle.vehicleNumber}</td>
                      <td className="px-4 py-2">{vehicle.vehicleModel}</td>
                      <td className="px-4 py-2">{vehicle.yearMade}</td>
                      <td className="px-4 py-2">{vehicle.driver}</td>
                      <td className="px-4 py-2">{vehicle.driverLicense}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-gray-500 text-sm">
            Showing {filteredVehicles.length} entries
          </div>
        </div>

        {/* Add Driver Popup */}
        {isAddDriverPopupOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-full sm:w-96 shadow-md">
              <h3 className="text-lg font-semibold mb-4">Add New Driver</h3>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Driver Name *</label>
                <input
                  type="text"
                  value={newDriverName}
                  onChange={(e) => setNewDriverName(e.target.value)}
                  placeholder="Enter driver name"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email *</label>
                <input
                  type="email"
                  value={newDriverEmail}
                  onChange={(e) => setNewDriverEmail(e.target.value)}
                  placeholder="Enter driver email"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Age *</label>
                <input
                  type="number"
                  value={newDriverAge}
                  onChange={(e) => setNewDriverAge(e.target.value)}
                  placeholder="Enter driver age"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Gender *</label>
                <select
                  value={newDriverGender}
                  onChange={(e) => setNewDriverGender(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Mobile Number *</label>
                <input
                  type="text"
                  value={newDriverMobile}
                  onChange={(e) => setNewDriverMobile(e.target.value)}
                  placeholder="Enter driver mobile"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Joining Date *</label>
                <input
                  type="date"
                  value={newDriverJoiningDate}
                  onChange={(e) => setNewDriverJoiningDate(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {loading && <p className="text-gray-500 text-sm">Saving...</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setIsAddDriverPopupOpen(false)}
                  className="w-full bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDriver}
                  className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                >
                  Save Driver
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclePage;
