import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const TransportRouteListPage = () => {
  const [routeList, setRouteList] = useState([]);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    // Fetch route list data
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-transport-route"
        );
        setRouteList(response.data.routes); // Assuming response data contains 'routes' array
      } catch (error) {
        console.error("Error fetching route list:", error);
        toast.error("Error fetching route list. Please try again later."); // Toast notification on error
      }
    };

    fetchRoutes();
  }, []);

  // Filter routes based on search term
  const filteredRoutes = routeList.filter((route) =>
    route.routeTitle ? route.routeTitle.toLowerCase().includes(search.toLowerCase()) : true
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
          <h1 className="text-lg font-bold">Transport Route List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-wrap gap-8 px-6 mt-4">
          <div className="w-full">
            <h2 className="text-lg text-gray-600 mb-4">Routes List</h2>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full sm:w-1/3 mb-4"
            />

            <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">SL</th>
                    <th className="px-4 py-2 text-left text-gray-600">Route Title</th>
                    <th className="px-4 py-2 text-left text-gray-600">Fare</th>
                    <th className="px-4 py-2 text-left text-gray-600">Driver</th>
                    <th className="px-4 py-2 text-left text-gray-600">Pickup Time</th>
                    <th className="px-4 py-2 text-left text-gray-600">Drop Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500">
                        No Data Available In Table
                      </td>
                    </tr>
                  ) : (
                    filteredRoutes.map((route, index) => (
                      <tr key={route._id} className="border-t">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{route.routeTitle || "N/A"}</td>
                        <td className="px-4 py-2">{route.fare || "N/A"}</td>
                        <td className="px-4 py-2">{route.driver?.name || "N/A"}</td>
                        <td className="px-4 py-2">{route.pickupTime || "N/A"}</td>
                        <td className="px-4 py-2">{route.dropTime || "N/A"}</td>
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

      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default TransportRouteListPage;
