import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const MarksList = () => {
  const [marksList, setMarksList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMarks = marksList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(marksList.length / itemsPerPage);

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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white shadow-md">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100 overflow-x-hidden">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 ml-20">Marks List</h1>

        <div className="bg-white p-6 rounded-md shadow-md ml-20">
          {/* CSV Export Button */}
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={exportToCSV}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none"
            >
              Download CSV
            </button>
          </div>

          {/* Marks Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b px-4 py-2 text-left ml-16">SL</th>
                  <th className="border-b px-4 py-2 text-left">First Name</th>
                  <th className="border-b px-4 py-2 text-left">Last Name</th>
                  <th className="border-b px-4 py-2 text-left">Class</th>
                  <th className="border-b px-4 py-2 text-left">Roll</th>
                  <th className="border-b px-4 py-2 text-left">Section</th>
                  <th className="border-b px-4 py-2 text-left">Subject</th>
                  <th className="border-b px-4 py-2 text-left">Marks Obtained</th>
                  <th className="border-b px-4 py-2 text-left">Total Marks</th>
                  <th className="border-b px-4 py-2 text-left">Percentage</th>
                  <th className="border-b px-4 py-2 text-left">Grade</th>
                  <th className="border-b px-4 py-2 text-left">Status</th>
                  <th className="border-b px-4 py-2 text-left">Overall Percentage</th>
                  <th className="border-b px-4 py-2 text-left">Overall Status</th>
                </tr>
              </thead>
              <tbody>
                {currentMarks.length > 0 ? (
                  currentMarks.flatMap((student, index) =>
                    student.subjects.map((subject, subIndex) => (
                      <tr key={`${student.student?._id}-${subIndex}`}>
                        <td className="border-b px-4 py-2">
                          {startIndex + index + 1}
                        </td>
                        <td className="border-b px-4 py-2">
                          {student.student?.firstName || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {student.student?.lastName || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {student.student?.class || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {student.student?.roll || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {student.student?.section || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {subject.subject || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {subject.marksObtained || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {subject.totalMarks || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {subject.percentage || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {subject.grade || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {subject.status || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {subIndex === 0
                            ? student.overallPercentage || "N/A"
                            : ""}
                        </td>
                        <td className="border-b px-4 py-2">
                          {subIndex === 0
                            ? student.overallStatus || "N/A"
                            : ""}
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center text-gray-500 py-4">
                      No marks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-4 text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MarksList;
