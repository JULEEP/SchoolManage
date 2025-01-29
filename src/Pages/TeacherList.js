import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Importing toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importing the toast styles

const TeacherList = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/teachers"
        );
        setTeacherList(response.data || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        toast.error("Error fetching teachers. Please try again."); // Adding toast notification
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter teachers based on name or email
  const filteredTeachers = teacherList.filter(
    (teacher) =>
      teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const currentTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const exportToCSV = () => {
    const headers = [
      "SL,Name,Email,Phone,Address,Experience,Age,Gender,Education,Joining Date",
    ];
    const rows = filteredTeachers.map((teacher, index) => [
      index + 1,
      teacher.name || "N/A",
      teacher.email || "N/A",
      teacher.phone || "N/A",
      teacher.address || "N/A",
      teacher.lastExperience || "N/A",
      teacher.age || "N/A",
      teacher.gender || "N/A",
      teacher.education || "N/A",
      teacher.joiningDate
        ? new Date(teacher.joiningDate).toLocaleDateString()
        : "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "teachers_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Exported Successfully!"); // Adding success toast notification
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Teacher List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search and Export */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            className="px-4 py-2 w-1/3 border border-gray-300 rounded-md"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={exportToCSV}
            className="ml-4 px-4 py-2 bg-purple-600 text-white mt-4 rounded-md hover:bg-purple-700"
          >
            Export CSV
          </button>
        </div>

        {/* Teacher Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b">Address</th>
                <th className="px-4 py-2 border-b">Experience</th>
                <th className="px-4 py-2 border-b">Age</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Education</th>
                <th className="px-4 py-2 border-b">Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.length > 0 ? (
                currentTeachers.map((teacher, index) => (
                  <tr key={teacher._id}>
                    <td className="px-4 py-2 border-b">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-2 border-b">{teacher.name}</td>
                    <td className="px-4 py-2 border-b">{teacher.email}</td>
                    <td className="px-4 py-2 border-b">{teacher.phone}</td>
                    <td className="px-4 py-2 border-b">{teacher.address}</td>
                    <td className="px-4 py-2 border-b">{teacher.lastExperience || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.age || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.gender || "N/A"}</td>
                    <td className="px-4 py-2 border-b">{teacher.education || "N/A"}</td>
                    <td className="px-4 py-2 border-b">
                      {teacher.joiningDate ? new Date(teacher.joiningDate).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-gray-500">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            disabled={currentPage === totalPages}
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

export default TeacherList;
