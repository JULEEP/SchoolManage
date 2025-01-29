import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Importing toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importing the toast styles

const Staffs = () => {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch staff
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/staffs"
        );
        setStaffList(response.data.staff || []);
      } catch (error) {
        console.error("Error fetching staff:", error);
        toast.error("Error fetching staff. Please try again."); // Using toast for error
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStaff = filteredStaff.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

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
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Staff List</h1>
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
            placeholder="Search staff..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">First Name</th>
                <th className="px-4 py-2 border-b">Last Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b">Position</th>
                <th className="px-4 py-2 border-b">Department</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Date of Birth</th>
                <th className="px-4 py-2 border-b">Joining Date</th>
                <th className="px-4 py-2 border-b">Salary</th>
                <th className="px-4 py-2 border-b">Employee ID</th>
                <th className="px-4 py-2 border-b">Profile Picture</th>
                <th className="px-4 py-2 border-b">Qualifications</th>
                <th className="px-4 py-2 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentStaff.length > 0 ? (
                currentStaff.map((staff, index) => (
                  <tr key={staff._id}>
                    <td className="px-4 py-2 border-b">{startIndex + index + 1}</td>
                    <td className="px-4 py-2 border-b">{staff.firstName}</td>
                    <td className="px-4 py-2 border-b">{staff.lastName}</td>
                    <td className="px-4 py-2 border-b">{staff.email}</td>
                    <td className="px-4 py-2 border-b">{staff.phone}</td>
                    <td className="px-4 py-2 border-b">{staff.position}</td>
                    <td className="px-4 py-2 border-b">{staff.department}</td>
                    <td className="px-4 py-2 border-b">{staff.gender}</td>
                    <td className="px-4 py-2 border-b">{formatDate(staff.dateOfBirth)}</td>
                    <td className="px-4 py-2 border-b">{formatDate(staff.joiningDate)}</td>
                    <td className="px-4 py-2 border-b">{staff.salary}</td>
                    <td className="px-4 py-2 border-b">{staff.employeeId}</td>
                    <td className="px-4 py-2 border-b">{staff.profilePicture}</td>
                    <td className="px-4 py-2 border-b">{staff.qualifications?.join(", ") || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{formatDate(staff.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" className="text-center text-gray-500">
                    No staff found.
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
              className={`px-4 py-2 mx-1 rounded-lg ${currentPage === pageNumber + 1 ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
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

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Staffs;
