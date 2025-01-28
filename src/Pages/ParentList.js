import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const Parents = () => {
  const [parentList, setParentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch parents
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/parents");
        setParentList(response.data.parents || []);
      } catch (error) {
        console.error("Error fetching parents:", error);
        alert("Error fetching parents. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchParents();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredParents = parentList.filter(
    (parent) =>
      parent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParents = filteredParents.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Parents List</h1>
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-between items-center mt-4">
          <input
            type="text"
            placeholder="Search parents..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Parents Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Role</th>
                <th className="px-4 py-2 border-b">Students</th>
                <th className="px-4 py-2 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentParents.length > 0 ? (
                currentParents.map((parent, index) => (
                  <tr key={parent._id}>
                    <td className="px-4 py-2 border-b">{startIndex + index + 1}</td>
                    <td className="px-4 py-2 border-b">{parent.name}</td>
                    <td className="px-4 py-2 border-b">{parent.email}</td>
                    <td className="px-4 py-2 border-b">{parent.role}</td>
                    <td className="px-4 py-2 border-b">
                      {parent.myStudents.length > 0
                        ? parent.myStudents.join(", ")
                        : "No Students"}
                    </td>
                    <td className="px-4 py-2 border-b">{formatDate(parent.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500">
                    No parents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === pageNumber + 1 ? "bg-purple-500 text-white" : "bg-gray-200"
              }`}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-purple-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parents;
