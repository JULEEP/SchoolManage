import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const ExamTypeListPage = () => {
  const [examTypes, setExamTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    const fetchExamTypes = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-examtype");
        if (!response.ok) {
          throw new Error("Failed to fetch exam types");
        }
        const data = await response.json();
        setExamTypes(data.examTypes || []); // Set exam types data
      } catch (err) {
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchExamTypes();
  }, []);

  // Filter exam types based on search term
  const filteredExamTypes = examTypes.filter((exam) =>
    exam.examName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay for Mobile */}
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
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Exam Types</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Exam Type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-purple-600">
              <tr>
                <th className="px-4 py-2 text-left text-white">SL</th>
                <th className="px-4 py-2 text-left text-white">Exam Name</th>
                <th className="px-4 py-2 text-left text-white">Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredExamTypes.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No Data Available
                  </td>
                </tr>
              ) : (
                filteredExamTypes.map((exam, index) => (
                  <tr key={exam._id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{exam.examName || "N/A"}</td>
                    <td className="px-4 py-2">{new Date(exam.createdAt).toLocaleDateString() || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ExamTypeListPage;
