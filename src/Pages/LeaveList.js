import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const Leaves = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/student-leaves");
        setLeaveList(response.data.allLeaves || []);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusUpdate = async (studentId, leaveId, newStatus) => {
    try {
      const response = await axios.put(
        `https://school-backend-1-2xki.onrender.com/api/admin/student-leaveupdate/${studentId}/${leaveId}`,
        { status: newStatus }
      );
      // Update leave status locally
      setLeaveList((prevLeaves) =>
        prevLeaves.map((student) => {
          if (student.studentId === studentId) {
            return {
              ...student,
              leaves: student.leaves.map((leave) =>
                leave._id === leaveId ? { ...leave, status: newStatus } : leave
              ),
            };
          }
          return student;
        })
      );
      alert("Leave status updated successfully!");
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const filteredLeaves = leaveList
    .filter((student) => student.leaves.length > 0) // Show only students with leaves
    .flatMap((student) =>
      student.leaves.filter(
        (leave) =>
          leave.leaveType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          leave.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((leave) => ({
        ...leave,
        studentId: student.studentId,
        studentName: student.studentName,
        class: student.class,
        section: student.section,
      }))
    );

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeaves = filteredLeaves.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
    <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} h-screen`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
        <h1 className="text-lg font-bold">Studnet Leave List</h1>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>


        {/* Search */}
        <div className="mb-6 flex justify-between items-center mt-4">
          <input
            type="text"
            placeholder="Search leaves..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Leaves Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">Student Name</th>
                <th className="px-4 py-2 border-b">Class</th>
                <th className="px-4 py-2 border-b">Section</th>
                <th className="px-4 py-2 border-b">Leave Type</th>
                <th className="px-4 py-2 border-b">Start Date</th>
                <th className="px-4 py-2 border-b">End Date</th>
                <th className="px-4 py-2 border-b">Reason</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLeaves.length > 0 ? (
                currentLeaves.map((leave, index) => (
                  <tr key={leave._id}>
                    <td className="px-4 py-2 border-b">{startIndex + index + 1}</td>
                    <td className="px-4 py-2 border-b">{leave.studentName}</td>
                    <td className="px-4 py-2 border-b">{leave.class}</td>
                    <td className="px-4 py-2 border-b">{leave.section}</td>
                    <td className="px-4 py-2 border-b">{leave.leaveType}</td>
                    <td className="px-4 py-2 border-b">{formatDate(leave.startDate)}</td>
                    <td className="px-4 py-2 border-b">{formatDate(leave.endDate)}</td>
                    <td className="px-4 py-2 border-b">{leave.reason}</td>
                    <td className="px-4 py-2 border-b">{leave.status}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleStatusUpdate(leave.studentId, leave._id, "Approved")}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(leave.studentId, leave._id, "Rejected")}
                        className="px-4 py-2 bg-red-500 mt-2 text-white rounded-lg ml-2"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-gray-500">
                    No leaves found.
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
    </div>
  );
};

export default Leaves;
