import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const MarksList = () => {
  const [marksList, setMarksList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch marks
  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const response = await axios.get(
        "https://school-backend-1-2xki.onrender.com/api/admin/marks"
      );
      setMarksList(response.data.marks || []);
    } catch (error) {
      console.error("Error fetching marks:", error);
      alert("Error fetching marks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMarks = marksList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(marksList.length / itemsPerPage);

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "SL,First Name,Last Name,Class,Roll,Section,Father's Name,Mother's Name,Subject,Marks Obtained,Total Marks,Percentage,Grade,Status,Overall Percentage,Overall Status",
    ];
    const rows = marksList.flatMap((student, index) =>
      student.subjects.map((subject) => [
        index + 1,
        student.student?.firstName || "N/A",
        student.student?.lastName || "N/A",
        student.student?.class || "N/A",
        student.student?.roll || "N/A",
        student.student?.section || "N/A",
        student.student?.fatherName || "N/A",
        student.student?.motherName || "N/A",
        subject.subject || "N/A",
        subject.marksObtained || "N/A",
        subject.totalMarks || "N/A",
        subject.percentage || "N/A",
        subject.grade || "N/A",
        subject.status || "N/A",
        student.overallPercentage || "N/A",
        student.overallStatus || "N/A",
      ])
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "marks_data.csv");
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
          <h1 className="text-lg font-bold">Marks List</h1>
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search and Export */}
        <div className="mb-6 flex justify-between items-center">

          <button
            onClick={exportToCSV}
            className="ml-4 px-4 py-2 bg-purple-600 mt-4 text-white rounded-md hover:bg-purple-700"
          >
            Export CSV
          </button>
        </div>

        {/* Marks Table */}
        <div className="overflow-x-auto mb-8">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border-b">SL</th>
                  <th className="px-4 py-2 border-b">First Name</th>
                  <th className="px-4 py-2 border-b">Last Name</th>
                  <th className="px-4 py-2 border-b">Class</th>
                  <th className="px-4 py-2 border-b">Roll</th>
                  <th className="px-4 py-2 border-b">Section</th>
                  <th className="px-4 py-2 border-b">Father's Name</th>
                  <th className="px-4 py-2 border-b">Mother's Name</th>
                  <th className="px-4 py-2 border-b">Subject</th>
                  <th className="px-4 py-2 border-b">Marks Obtained</th>
                  <th className="px-4 py-2 border-b">Total Marks</th>
                  <th className="px-4 py-2 border-b">Percentage</th>
                  <th className="px-4 py-2 border-b">Grade</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Overall Percentage</th>
                  <th className="px-4 py-2 border-b">Overall Status</th>
                </tr>
              </thead>
              <tbody>
                {currentMarks.map((student, index) =>
                  student.subjects.map((subject, subIndex) => (
                    <tr key={`${student._id}-${subIndex}`}>
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td className="px-4 py-2 border-b">
                        {student.student?.firstName || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {student.student?.lastName || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {student.student?.class || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {student.student?.roll || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {student.student?.section || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {student.student?.fatherName || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {student.student?.motherName || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {subject.subject || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {subject.marksObtained || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {subject.totalMarks || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {subject.percentage || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {subject.grade || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {subject.status || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {student.overallPercentage || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {student.overallStatus || "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarksList;
