import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "https://school-backend-1-2xki.onrender.com/api/admin/staffs"
      );
      setStaffList(response.data.staff || []);
    } catch (error) {
      console.error("Error fetching staff:", error);
      alert("Error fetching staff. Please try again.");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStaff = staffList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(staffList.length / itemsPerPage);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const exportToCSV = () => {
    const headers = [
      "SL,First Name,Last Name,Email,Phone,Position,Department,Gender,Date of Birth,Joining Date,Salary,Employee ID,Profile Picture,Qualifications,Created At",
    ];
    const rows = staffList.map((staff, index) => [
      index + 1,
      staff.firstName || "N/A",
      staff.lastName || "N/A",
      staff.email || "N/A",
      staff.phone || "N/A",
      staff.position || "N/A",
      staff.department || "N/A",
      staff.gender || "N/A",
      new Date(staff.dateOfBirth).toLocaleDateString() || "N/A",
      new Date(staff.joiningDate).toLocaleDateString() || "N/A",
      staff.salary || "N/A",
      staff.employeeId || "N/A",
      staff.profilePicture || "N/A",
      staff.qualifications.join(", ") || "N/A",
      formatDate(staff.createdAt) || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "staff_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Staff List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-center text-3xl font-semibold text-gray-500 mb-6">Staff List</h2>

          {/* Download CSV Button */}
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={exportToCSV}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none"
            >
              Download CSV
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-6 py-3 text-left">SL</th>
                    <th className="px-6 py-3 text-left">First Name</th>
                    <th className="px-6 py-3 text-left">Last Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-left">Position</th>
                    <th className="px-6 py-3 text-left">Department</th>
                    <th className="px-6 py-3 text-left">Gender</th>
                    <th className="px-6 py-3 text-left">Date of Birth</th>
                    <th className="px-6 py-3 text-left">Joining Date</th>
                    <th className="px-6 py-3 text-left">Salary</th>
                    <th className="px-6 py-3 text-left">Employee ID</th>
                    <th className="px-6 py-3 text-left">Profile Picture</th>
                    <th className="px-6 py-3 text-left">Qualifications</th>
                    <th className="px-6 py-3 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStaff.length > 0 ? (
                    currentStaff.map((staff, index) => (
                      <tr key={staff._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3">{startIndex + index + 1}</td>
                        <td className="px-6 py-3">{staff.firstName || "N/A"}</td>
                        <td className="px-6 py-3">{staff.lastName || "N/A"}</td>
                        <td className="px-6 py-3">{staff.email || "N/A"}</td>
                        <td className="px-6 py-3">{staff.phone || "N/A"}</td>
                        <td className="px-6 py-3">{staff.position || "N/A"}</td>
                        <td className="px-6 py-3">{staff.department || "N/A"}</td>
                        <td className="px-6 py-3">{staff.gender || "N/A"}</td>
                        <td className="px-6 py-3">{new Date(staff.dateOfBirth).toLocaleDateString()}</td>
                        <td className="px-6 py-3">{new Date(staff.joiningDate).toLocaleDateString()}</td>
                        <td className="px-6 py-3">{staff.salary || "N/A"}</td>
                        <td className="px-6 py-3">{staff.employeeId || "N/A"}</td>
                        <td className="px-6 py-3">
                          {staff.profilePicture ? (
                            <img src={staff.profilePicture} alt="Profile" className="w-12 h-12 rounded-full" />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-6 py-3">{staff.qualifications.join(", ") || "N/A"}</td>
                        <td className="px-6 py-3">{formatDate(staff.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="15" className="px-6 py-3 text-center text-gray-500">
                        No staff found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffList;
