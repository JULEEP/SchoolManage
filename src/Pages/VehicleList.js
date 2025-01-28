import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import Sidebar from "./Sidebar";

const VehicleListPage = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-vehicle");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicleList(data.vehicles || []); // Ensure vehicles array exists
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Filter vehicle list based on search term
  const filteredVehicles = vehicleList.filter((vehicle) =>
    vehicle.vehicleNumber?.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-lg font-bold">Vehicle List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Vehicle No."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
          />
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
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No Data Available
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle, index) => (
                  <tr key={vehicle._id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{vehicle.vehicleNumber || "N/A"}</td>
                    <td className="px-4 py-2">{vehicle.vehicleModel || "N/A"}</td>
                    <td className="px-4 py-2">{vehicle.yearMade || "N/A"}</td>
                    <td className="px-4 py-2">{vehicle.driver || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleListPage;
