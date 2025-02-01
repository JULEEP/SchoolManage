import React, { useEffect, useState } from "react";
import StudentSidebar from "../Sidebar"; // Import the Sidebar component
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const TransportPage = () => {
  const [routeList, setRouteList] = useState([]);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [dateFilter, setDateFilter] = useState(""); // New state for date filter
  const [startDate, setStartDate] = useState(""); // Start date for custom filter
  const [endDate, setEndDate] = useState(""); // End date for custom filter
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    // Fetch route list data
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-transport-route"
        );
        setRouteList(response.data.routes); // Update with the new data structure
      } catch (error) {
        console.error("Error fetching route list:", error);
        toast.error("Error fetching route list. Please try again later."); // Toast notification on error
      }
    };

    fetchRoutes();
  }, []);

  const filterByDate = (routes) => {
    const today = new Date().setHours(0, 0, 0, 0); // Midnight today
    const yesterday = new Date(today - 24 * 60 * 60 * 1000); // Midnight yesterday
  
    return routes.filter(route => {
      const routeDate = new Date(route.date).setHours(0, 0, 0, 0); // Normalize to midnight
  
      switch (dateFilter) {
        case "today":
          return routeDate === today;
        case "yesterday":
          return routeDate === yesterday;
        case "custom":
          // Ensure that the start and end date comparisons are set to include the entire range of the day
          const start = new Date(startDate).setHours(0, 0, 0, 0); // Start of the selected start date
          const end = new Date(endDate).setHours(23, 59, 59, 999); // End of the selected end date
  
          // Check if the route's date is within the start and end range
          return routeDate >= start && routeDate <= end;
        default:
          return true; // If no filter is applied, show all
      }
    });
  };
  
  // Filter routes based on search term
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Apply search and date filter to routes
    const filteredBySearch = routeList.filter(route =>
      route.routeTitle ? route.routeTitle.toLowerCase().includes(search.toLowerCase()) : true
    );

    // Apply date filter
    const finalFilteredRoutes = filterByDate(filteredBySearch);
    setFilteredRoutes(finalFilteredRoutes);

  }, [routeList, search, dateFilter, startDate, endDate]);

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
        <StudentSidebar />
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

        {/* Title and Filter */}
        <div className="flex flex-wrap gap-8 px-6 mt-4">
          <div className="w-full">
            <h2 className="text-lg text-gray-600 mb-4">Routes List</h2>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="border border-gray-300 p-2 rounded w-full sm:w-1/3 mb-4"
            />

            {/* Date Filter */}
            <div className="mb-4">
              <label className="mr-2 text-sm text-gray-600">Filter by Date:</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Custom Date Range */}
            {dateFilter === "custom" && (
              <div className="flex gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600">Start Date:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">End Date:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </div>
            )}

            <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">SL</th>
                    <th className="px-4 py-2 text-left text-gray-600">Route Title</th>
                    <th className="px-4 py-2 text-left text-gray-600">Driver</th>
                    <th className="px-4 py-2 text-left text-gray-600">Driver Mobile</th>
                    <th className="px-6 py-2 text-left text-gray-600">Stops & Arrival Time</th> {/* Merged column */}
                    <th className="px-4 py-2 text-left text-gray-600">Date</th>
                    <th className="px-6 py-2 text-left text-gray-600">Created At</th> {/* Increased width */}
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-gray-500">
                        No Data Available In Table
                      </td>
                    </tr>
                  ) : (
                    filteredRoutes.map((route, index) => (
                      <tr key={route._id} className="border-t">
                        <td className="px-4 py-2 text-sm sm:text-base">{index + 1}</td>
                        <td className="px-4 py-2 text-sm sm:text-base">{route.routeTitle || "N/A"}</td>
                        <td className="px-4 py-2 text-sm sm:text-base">{route.driver?.name || "N/A"}</td>
                        <td className="px-4 py-2 text-sm sm:text-base">{route.driver?.mobileNumber || "N/A"}</td>
                        <td className="px-6 py-2 text-sm sm:text-base">
                          {route.stops && route.stops.length > 0 ? (
                            route.stops.map((stop, stopIndex) => (
                              <div
                                key={stop._id}
                                className="inline-block mr-2 mb-1 sm:mb-0 text-ellipsis overflow-hidden whitespace-nowrap"
                              >
                                {stop.stopName} {stop.arrivalTime && `- ${stop.arrivalTime}`}
                                {stopIndex < route.stops.length - 1 && ", "}
                              </div>
                            ))
                          ) : (
                            "No Stops Available"
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm sm:text-base">{new Date(route.date).toLocaleDateString() || "N/A"}</td>
                        <td className="px-6 py-2 text-sm sm:text-base">
                          {route.createdAt ? new Date(route.createdAt).toLocaleString() : "N/A"}
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

      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default TransportPage;
