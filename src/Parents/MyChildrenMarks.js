import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import StudentSidebar from "../Sidebar";

const MyChildMarksPage = () => {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const response = await fetch(
          "https://school-backend-1-2xki.onrender.com/api/parent/my-child-marks/676cf56dfd1eb1caa8426205"
        );
        const data = await response.json();

        if (data.message === "Comparison with topper retrieved successfully") {
          setComparison(data.comparisonResult);
        } else {
          setError(data.message || "Failed to fetch comparison");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StudentSidebar />
      </div>

      <div
        className={`flex-grow overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Child Marks Comparison</h1>
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : comparison ? (
          <div className="bg-white shadow-lg rounded-lg p-6 my-6 max-w-4xl mx-auto space-y-6">
            <h2 className="text-xl font-semibold text-blue-700 text-center">
              Topper Comparison
            </h2>

            {/* Your Child's Information */}
            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                Your Child's Information
              </h3>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-3 px-4 border">Field</th>
                    <th className="py-3 px-4 border">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Name</td>
                    <td className="py-3 px-4 border">
                      {comparison.student.firstName} {comparison.student.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Roll Number</td>
                    <td className="py-3 px-4 border">{comparison.student.roll}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Class</td>
                    <td className="py-3 px-4 border">{comparison.student.class}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Section</td>
                    <td className="py-3 px-4 border">{comparison.student.section}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Father's Name</td>
                    <td className="py-3 px-4 border">
                      {comparison.student.fatherName}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Mother's Name</td>
                    <td className="py-3 px-4 border">
                      {comparison.student.motherName}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Percentage</td>
                    <td className="py-3 px-4 border text-blue-600">
                      {comparison.studentPercentage}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Topper's Information */}
            <div className="overflow-x-auto mt-6">
              <h3 className="text-lg font-semibold text-red-700 mb-4">
                Topper's Information
              </h3>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-3 px-4 border">Field</th>
                    <th className="py-3 px-4 border">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Name</td>
                    <td className="py-3 px-4 border">
                      {comparison.topper.firstName} {comparison.topper.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Roll Number</td>
                    <td className="py-3 px-4 border">{comparison.topper.roll}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Class</td>
                    <td className="py-3 px-4 border">{comparison.topper.class}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Section</td>
                    <td className="py-3 px-4 border">{comparison.topper.section}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Father's Name</td>
                    <td className="py-3 px-4 border">
                      {comparison.topper.fatherName}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Mother's Name</td>
                    <td className="py-3 px-4 border">
                      {comparison.topper.motherName}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border font-bold">Percentage</td>
                    <td className="py-3 px-4 border text-blue-600">
                      {comparison.topperPercentage}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

           {/* Comparison Result */}
<div className="mt-6">
<h3
  className={`text-lg font-semibold ${
    comparison.comparison === "Your children are below the topper"
      ? "text-red-600"
      : "text-green-600"
  }`}
>
  Comparison Result: {comparison.comparison}
</h3>
{comparison.suggestion && (
  <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 p-4">
    <p className="text-blue-700 font-semibold">
      Suggestion: {comparison.suggestion}
    </p>
  </div>
)}
</div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No data available</div>
        )}
      </div>
    </div>
  );
};

export default MyChildMarksPage;
