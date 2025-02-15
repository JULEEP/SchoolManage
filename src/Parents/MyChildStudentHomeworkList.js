import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons
import ParentSidebar from "./ParentSidebar";

const MyChildStudentHomeworkList = () => {
  const [homework, setHomework] = useState([]); // Homework state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [assignedByFilter, setAssignedByFilter] = useState(""); // Assigned by filter
  const [homeworkDate, setHomeworkDate] = useState(""); // Homework date filter
  const itemsPerPage = 5; // Limit per page

  const studentId = "677904859d0da6e3bee4ba2e"; // Updated studentId

  // Fetch homework when component mounts
  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const response = await fetch(
          `https://school-backend-1-2xki.onrender.com/api/students/get-homework/${studentId}`
        );
        const data = await response.json();

        if (response.ok) {
          setHomework(data.homework); // Extract the homework array from response
        } else {
          setError(data.message || "Error fetching homework");
        }
      } catch (err) {
        setError("An error occurred while fetching homework");
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, [studentId]);

  // Toggle Sidebar for Mobile View
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const filteredHomework = homework.filter((hw) => {
    const matchesAssignedBy = assignedByFilter
      ? hw.homeworkBy.toLowerCase().includes(assignedByFilter.toLowerCase())
      : true;
    
    const matchesHomeworkDate = homeworkDate 
      ? new Date(hw.homeworkDate).toISOString().split("T")[0] === homeworkDate
      : true;
  
    return matchesAssignedBy && matchesHomeworkDate;
  });
  
  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHomework = filteredHomework.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredHomework.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handle Loading/Error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
        <ParentSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto lg:ml-64">
        {/* Header for Mobile */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Homework List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-white shadow-md rounded-lg flex space-x-4">
          <input
            type="text"
            placeholder="Filter by Assigned By"
            value={assignedByFilter}
            onChange={(e) => setAssignedByFilter(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={homeworkDate}
            onChange={(e) => setHomeworkDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* Homework Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-400">Title</th>
                <th className="px-4 py-2 text-left text-gray-400">Description</th>
                <th className="px-4 py-2 text-left text-gray-400">Assigned By</th>
                <th className="px-4 py-2 text-left text-gray-400">Homework Date</th>
                <th className="px-4 py-2 text-left text-gray-400">Submission Date</th>
                <th className="px-4 py-2 text-left text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentHomework.length > 0 ? (
                currentHomework.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-gray-600">{item.homeworkTitle}</td>
                    <td className="px-4 py-2 text-gray-600">{item.description}</td>
                    <td className="px-4 py-2 text-gray-600">{item.homeworkBy}</td>
                    <td className="px-4 py-2 text-gray-600">{new Date(item.homeworkDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-gray-600">{new Date(item.submissionDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-gray-600">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center text-gray-600">No Homework Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
         {/* Pagination Controls */}
         <div className="flex justify-between mt-4">
         <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-400">
           Previous
         </button>
         <span className="text-gray-600">Page {currentPage}</span>
         <button onClick={nextPage} disabled={indexOfLastItem >= homework.length} className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-400">
           Next
         </button>
       </div>
      </div>
    </div>
  );
};

export default MyChildStudentHomeworkList;


