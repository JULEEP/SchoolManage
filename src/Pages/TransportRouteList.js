import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const TransportRouteListPage = () => {
  const [busList, setBusList] = useState([]); // Renamed to busList
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [dateFilter, setDateFilter] = useState(""); // New state for date filter
  const [startDate, setStartDate] = useState(""); // Start date for custom filter
  const [endDate, setEndDate] = useState(""); // End date for custom filter
  const [filteredBuses, setFilteredBuses] = useState([]); // Renamed to filteredBuses
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    // Fetch bus data from the new API
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/bus/get-all-buses");
        setBusList(response.data.buses); // Update with the new data structure
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBuses();
  }, []);

  const filterByDate = (buses) => {
    const today = new Date().setHours(0, 0, 0, 0); // Midnight today
    const yesterday = new Date(today - 24 * 60 * 60 * 1000); // Midnight yesterday
  
    return buses.filter(bus => {
      const busDate = new Date(bus.createdAt).setHours(0, 0, 0, 0); // Normalize to midnight
  
      switch (dateFilter) {
        case "today":
          return busDate === today;
        case "yesterday":
          return busDate === yesterday;
        case "custom":
          const start = new Date(startDate).setHours(0, 0, 0, 0); // Start of the selected start date
          const end = new Date(endDate).setHours(23, 59, 59, 999); // End of the selected end date
          return busDate >= start && busDate <= end;
        default:
          return true;
      }
    });
  };

  // Filter buses based on search term
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Apply search and date filter to buses
    const filteredBySearch = busList.filter(bus =>
      bus.busNumber ? bus.busNumber.toLowerCase().includes(search.toLowerCase()) : true
    );

    // Apply date filter
    const finalFilteredBuses = filterByDate(filteredBySearch);
    setFilteredBuses(finalFilteredBuses);

  }, [busList, search, dateFilter, startDate, endDate]);

  // Paginate buses
  const indexOfLastBus = currentPage * itemsPerPage;
  const indexOfFirstBus = indexOfLastBus - itemsPerPage;
  const currentBuses = filteredBuses.slice(indexOfFirstBus, indexOfLastBus);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

        {/* Title and Filter */}
        <div className="flex flex-wrap gap-8 px-6 mt-4">
          <div className="w-full">
            <h2 className="text-lg text-gray-600 mb-4">Buses List</h2>

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
                <thead className="bg-purple-600">
                  <tr>
                    <th className="px-4 py-2 text-left text-white">SL</th>
                    <th className="px-4 py-2 text-left text-white">Bus Number</th>
                    <th className="px-4 py-2 text-left text-white">Route Stops</th>
                    <th className="px-6 py-2 text-left text-white">Current Location</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBuses.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No Data Available In Table
                      </td>
                    </tr>
                  ) : (
                    currentBuses.map((bus, index) => (
                      <tr key={bus._id} className="border-t">
                        <td className="px-4 py-2 text-sm sm:text-base">{index + 1}</td>
                        <td className="px-4 py-2 text-sm sm:text-base">{bus.busNumber || "N/A"}</td>
                        <td className="px-4 py-2 text-sm sm:text-base">
                          {bus.route && bus.route.length > 0 ? (
                            bus.route.map((stop, stopIndex) => (
                              <div
                                key={stop._id}
                                className="inline-block mr-2 mb-1 sm:mb-0 text-ellipsis overflow-hidden whitespace-nowrap"
                              >
                                {stop.stopName} {stop.arrivalTime && `- ${stop.arrivalTime}`}
                                {stopIndex < bus.route.length - 1 && ", "}
                              </div>
                            ))
                          ) : (
                            "No Stops Available"
                          )}
                        </td>
                        <td className="px-6 py-2 text-sm sm:text-base">
                          {bus.currentLocation ? (
                            `Lat: ${bus.currentLocation.lat}, Lng: ${bus.currentLocation.lng}`
                          ) : (
                            "Location Unknown"
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-300"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {Math.ceil(filteredBuses.length / itemsPerPage)}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-300"
                disabled={currentPage === Math.ceil(filteredBuses.length / itemsPerPage)}
              >
                Next
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 text-gray-500 text-sm px-6">
              Showing {currentBuses.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportRouteListPage;
