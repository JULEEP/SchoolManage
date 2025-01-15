import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons

const TransportRoutePage = () => {
  const [routeTitle, setRouteTitle] = useState("");
  const [fare, setFare] = useState("");
  const [search, setSearch] = useState("");
  const [routeList, setRouteList] = useState([]);

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
          // If the route is successfully added, update the route list
          setRouteList([...routeList, response.data.route]);
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

  // Filter routes based on search term
  const filteredRoutes = routeList.filter((route) =>
    route.routeTitle.toLowerCase().includes(search.toLowerCase())
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

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
        <h1 className="text-xl text-gray-700 p-6">Transport Route</h1>

        <div className="flex flex-wrap gap-8 px-6">
          {/* Left Side - Add Route Form */}
          <div className="w-full sm:w-1/3 bg-gray-50 p-4 rounded shadow">
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

          {/* Right Side - Route List */}
          <div className="w-full sm:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-gray-600">Route List</h2>
              <input
                type="text"
                placeholder="Search"
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
                    <th className="px-4 py-2 text-left text-gray-600">Route Title</th>
                    <th className="px-4 py-2 text-left text-gray-600">Fare</th>
                    <th className="px-4 py-2 text-left text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No Data Available In Table
                      </td>
                    </tr>
                  ) : (
                    filteredRoutes.map((route, index) => (
                      <tr key={route.id} className="border-t">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{route.routeTitle}</td>
                        <td className="px-4 py-2">{route.fare}</td>
                        <td className="px-4 py-2">
                          <button className="text-red-500 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-4 text-gray-500 text-sm px-6">
              Showing {filteredRoutes.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportRoutePage;
