import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const StudentPromote = () => {
  const [marksList, setMarksList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [promotionDetails, setPromotionDetails] = useState({
    class: "",
    section: "",
    roll: "",
    message: "",
  });
  const [filterClass, setFilterClass] = useState("");
  const [filterSection, setFilterSection] = useState("");

  // Fetch marks
  useEffect(() => {
    fetchMarks();
  }, [filterClass, filterSection]);

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

  // Handle Promote Button Click
  const handlePromoteClick = (student) => {
    setSelectedStudent(student);
    setPromotionDetails({ class: "", section: "", roll: "", message: "" });
  };

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotionDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePromoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const { class: newClass, section, roll, message } = promotionDetails;
  
      // Make PUT request with studentId in the URL
      await axios.put(
        `https://school-backend-1-2xki.onrender.com/api/admin/promote/${selectedStudent.student?._id}`,
        {
          newClass,
          section,
          roll,
          message,
        }
      );
  
      alert("Student promoted successfully!");
      setSelectedStudent(null);
      fetchMarks(); // Refresh marks list
    } catch (error) {
      console.error("Error promoting student:", error);
      alert("Failed to promote student. Please try again.");
    }
  };
  

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMarks = marksList
    .filter(
      (student) =>
        (!filterClass || student.student?.class === filterClass) &&
        (!filterSection || student.student?.section === filterSection)
    )
    .slice(startIndex, endIndex);
  const totalPages = Math.ceil(
    marksList.filter(
      (student) =>
        (!filterClass || student.student?.class === filterClass) &&
        (!filterSection || student.student?.section === filterSection)
    ).length / itemsPerPage
  );

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
          <h1 className="text-lg font-bold">Promote</h1>
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Filter Section */}
        <div className="p-4 mb-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Class</label>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All Classes</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                {/* Add other class options as needed */}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Section</label>
              <select
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All Sections</option>
                <option value="A">A</option>
                <option value="B">B</option>
                {/* Add other section options as needed */}
              </select>
            </div>
          </div>
        </div>

        {/* Marks Table */}
        <div className="overflow-x-auto mb-8">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border-b">SL</th>
                  <th className="px-4 py-2 border-b">First Name</th>
                  <th className="px-4 py-2 border-b">Last Name</th>
                  <th className="px-4 py-2 border-b">Class</th>
                  <th className="px-4 py-2 border-b">Roll</th>
                  <th className="px-4 py-2 border-b">Section</th>
                  <th className="px-4 py-2 border-b">Overall Percentage</th>
                  <th className="px-4 py-2 border-b">Overall Status</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentMarks.map((student, index) => (
                  <tr key={student.student?._id}>
                    <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                    <td className="px-4 py-2 border-b text-center">
                      {student.student?.firstName || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {student.student?.lastName || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {student.student?.class || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {student.student?.roll || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {student.student?.section || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {student.overallPercentage || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {student.overallStatus || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b ml-2">
                      <button
                        onClick={() => handlePromoteClick(student)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md ml-4 text-center hover:bg-blue-700"
                      >
                        Promote
                      </button>
                    </td>
                  </tr>
                ))}
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

        {/* Promote Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-bold mb-4">Promote Student</h2>
              <form onSubmit={handlePromoteSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Class</label>
                  <input
                    type="text"
                    name="class"
                    value={promotionDetails.class}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Section</label>
                  <input
                    type="text"
                    name="section"
                    value={promotionDetails.section}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Roll</label>
                  <input
                    type="text"
                    name="roll"
                    value={promotionDetails.roll}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    name="message"
                    value={promotionDetails.message}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Promote
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPromote;
