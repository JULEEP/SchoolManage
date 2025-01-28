import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
        alert("Error fetching staff. Please try again.");
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

  const exportToCSV = () => {
    const headers = [
      "SL,First Name,Last Name,Email,Phone,Position,Department,Gender,Date of Birth,Joining Date,Salary,Employee ID,Profile Picture,Qualifications,Created At",
    ];
    const rows = filteredStaff.map((staff, index) => [
      index + 1,
      staff.firstName || "N/A",
      staff.lastName || "N/A",
      staff.email || "N/A",
      staff.phone || "N/A",
      staff.position || "N/A",
      staff.department || "N/A",
      staff.gender || "N/A",
      formatDate(staff.dateOfBirth),
      formatDate(staff.joiningDate),
      staff.salary || "N/A",
      staff.employeeId || "N/A",
      staff.profilePicture || "N/A",
      staff.qualifications?.join(", ") || "N/A",
      formatDate(staff.createdAt),
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

        {/* Search and Export */}
        <div className="mb-6 flex justify-between items-center">
          {/* Search Filter */}
          <div className="w-full sm:w-1/2 md:w-1/3 mt-2">
            <input
              type="text"
              placeholder="Search by Name or Email"
              className="ml-4 px-4 py-2 bg-white border rounded-md w-70"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Export Button */}
          <div className="w-full sm:w-1/3 md:w-1/4 mr-8">
            <button
              onClick={exportToCSV}
              className="ml-4 px-4 py-2 mt-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 w-full"
            >
              Export CSV
            </button>
          </div>
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
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff, index) => (
                  <tr key={staff._id}>
                    <td className="px-4 py-2 border-b">{index + 1}</td>
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
                    <td className="px-4 py-2 border-b">
                      {staff.qualifications?.join(", ") || "N/A"}
                    </td>
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
      </div>
    </div>
  );
};

export default StaffList;
