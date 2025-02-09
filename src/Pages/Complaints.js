import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Complaints = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/complaint");
        setComplaintList(response.data.complaints || []);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Error fetching complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClassFilterChange = (e) => {
    setClassFilter(e.target.value);
    setCurrentPage(1); // Reset pagination when filter changes
  };

  const handleSectionFilterChange = (e) => {
    setSectionFilter(e.target.value);
    setCurrentPage(1); // Reset pagination when filter changes
  };

  const filteredComplaints = complaintList.filter((complaint) => {
    const matchesSearchTerm =
      complaint.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = classFilter ? complaint.studentId.class === classFilter : true;
    const matchesSection = sectionFilter ? complaint.studentId.section === sectionFilter : true;

    return matchesSearchTerm && matchesClass && matchesSection;
  });

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get unique class and section options for filtering
  const classOptions = [...new Set(complaintList.map((complaint) => complaint.studentId.class))];
  const sectionOptions = [...new Set(complaintList.map((complaint) => complaint.studentId.section))];

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
          <h1 className="text-lg font-bold">Complaint List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex justify-between items-center mt-4">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-6 flex justify-between items-center mt-4">
          {/* Class Filter */}
          <select
            value={classFilter}
            onChange={handleClassFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Class</option>
            {classOptions.map((cls, index) => (
              <option key={index} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          {/* Section Filter */}
          <select
            value={sectionFilter}
            onChange={handleSectionFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Section</option>
            {sectionOptions.map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Complaint By</th>
                <th className="px-4 py-2 border-b">Student Name</th>
                <th className="px-4 py-2 border-b">Class</th>
                <th className="px-4 py-2 border-b">Section</th>
                <th className="px-4 py-2 border-b">Roll No</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentComplaints.length > 0 ? (
                currentComplaints.map((complaint, index) => (
                  <tr key={complaint._id}>
                    <td className="px-4 py-2 border-b">{startIndex + index + 1}</td>
                    <td className="px-4 py-2 border-b">{complaint.title}</td>
                    <td className="px-4 py-2 border-b">{complaint.description}</td>
                    <td className="px-4 py-2 border-b">{complaint.complaintBy}</td>
                    <td className="px-4 py-2 border-b">{complaint.studentId?.firstName} {complaint.studentId?.lastName}</td>
                    <td className="px-4 py-2 border-b">{complaint.studentId?.class}</td>
                    <td className="px-4 py-2 border-b">{complaint.studentId?.section}</td>
                    <td className="px-4 py-2 border-b">{complaint.studentId?.roll}</td>
                    <td className="px-4 py-2 border-b">{formatDate(complaint.date)}</td>
                    <td className="px-4 py-2 border-b">{formatDate(complaint.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
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
              className={`px-4 py-2 mx-1 rounded-lg ${currentPage === pageNumber + 1 ? "bg-purple-500 text-white" : "bg-gray-200"}`}
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

export default Complaints;
