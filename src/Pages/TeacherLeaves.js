import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const TeacherLeaves = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch teacher leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/teacher-leaves");
        setLeaveList(response.data.teachers || []);
      } catch (error) {
        console.error("Error fetching teacher leaves:", error);
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

  const handleUpdateStatus = async (teacherId, leaveId, status) => {
    try {
      console.log(`Updating leave status: TeacherId: ${teacherId}, LeaveId: ${leaveId}, Status: ${status}`);
      
      if (!leaveId) {
        console.error("Leave ID is missing");
        return;
      }
  
      // Sending the PUT request to update status
      const response = await axios.put(
        `https://school-backend-1-2xki.onrender.com/api/admin/teacher-leaveupdate/${teacherId}/${leaveId}`,
        { status }
      );
  
      console.log("Response from server:", response.data);
  
      // Update leave status locally in the state
      setLeaveList((prevLeaves) =>
        prevLeaves.map((teacher) => {
          if (teacher.teacherId === teacherId) {
            return {
              ...teacher,
              leaves: teacher.leaves.map((leave) =>
                leave._id === leaveId ? { ...leave, status: status } : leave
              ),
            };
          }
          return teacher;
        })
      );
  
      alert("Leave status updated successfully!");
  
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };
  
  // Filter leaves based on search term
  const filteredLeaves = leaveList
    .filter((teacher) => teacher.leaves.length > 0) // Show only teachers with leaves
    .flatMap((teacher) =>
      teacher.leaves.filter(
        (leave) =>
          leave.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((leave) => ({
        ...leave,
        teacherId: teacher.teacherId,
        teacherName: teacher.teacherName,
      }))
    );

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
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
          <h1 className="text-lg font-bold">Teacher Leave List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-between items-center mt-4">
          <input
            type="text"
            placeholder="Search teacher leaves..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Teacher Leaves Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">Teacher Name</th>
                <th className="px-4 py-2 border-b">Leave Type</th>
                <th className="px-4 py-2 border-b">Start Date</th>
                <th className="px-4 py-2 border-b">End Date</th>
                <th className="px-4 py-2 border-b">Reason</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave, index) => (
                  <tr key={leave._id}>
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{leave.teacherName}</td>
                    <td className="px-4 py-2 border-b">{leave.leaveType}</td>
                    <td className="px-4 py-2 border-b">{formatDate(leave.startDate)}</td>
                    <td className="px-4 py-2 border-b">{formatDate(leave.endDate)}</td>
                    <td className="px-4 py-2 border-b">{leave.reason}</td>
                    <td className="px-4 py-2 border-b">{leave.status}</td>
                    <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleUpdateStatus(leave.teacherId, leave._id, "Approved")}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(leave.teacherId, leave._id, "Rejected")}
                      className="px-4 py-2 bg-red-500 mt-2 text-white rounded-lg ml-2"
                    >
                      Reject
                    </button>
                  </td>                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500">
                    No leaves found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Message / Error display */}
        {message && <div className="text-green-500 p-4">{message}</div>}
        {error && <div className="text-red-500 p-4">{error}</div>}
      </div>
    </div>
  );
};

export default TeacherLeaves;
