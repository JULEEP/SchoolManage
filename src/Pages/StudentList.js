import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-student");
        const data = await response.json();
        if (data.students) {
          setStudents(data.students);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll?.toString().includes(searchTerm)
  );

  const exportToCSV = () => {
    const headers = [
      "SL,First Name,Last Name,Roll,Class,Section,Gender,Date of Birth,Religion,Caste,Blood Group,Category,Height,Weight",
    ];
    const rows = filteredStudents.map((student, index) => [
      index + 1,
      student.firstName || "N/A",
      student.lastName || "N/A",
      student.roll || "N/A",
      student.class || "N/A",
      student.section || "N/A",
      student.gender || "N/A",
      student.dateOfBirth
        ? new Date(student.dateOfBirth).toLocaleDateString()
        : "N/A",
      student.religion || "N/A",
      student.caste || "N/A",
      student.bloodGroup || "N/A",
      student.category || "N/A",
      student.height || "N/A",
      student.weight || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay */}
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-center text-3xl font-semibold text-gray-500 mb-6">Student List</h2>

          {/* Search Section */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by Name or Roll"
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-300 rounded-md p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Download Button */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={exportToCSV}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none"
            >
              Download CSV
            </button>
          </div>

{/* Table Section */}
<div className="bg-white p-6 rounded-md shadow-md">
  {loading ? (
    <p className="text-center text-gray-500">Loading...</p>
  ) : (
    // Wrapping the table in a scrollable container
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left">SL</th>
            <th className="px-6 py-3 text-left">First Name</th>
            <th className="px-6 py-3 text-left">Last Name</th>
            <th className="px-6 py-3 text-left">Roll</th>
            <th className="px-6 py-3 text-left">Class</th>
            <th className="px-6 py-3 text-left">Section</th>
            <th className="px-6 py-3 text-left">Gender</th>
            <th className="px-6 py-3 text-left">Date of Birth</th>
            <th className="px-6 py-3 text-left">Religion</th>
            <th className="px-6 py-3 text-left">Caste</th>
            <th className="px-6 py-3 text-left">Blood Group</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Height</th>
            <th className="px-6 py-3 text-left">Weight</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="14" className="text-center text-gray-500 py-3">
                No Data Available
              </td>
            </tr>
          ) : (
            filteredStudents.map((student, index) => (
              <tr key={student._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{student.firstName || "N/A"}</td>
                <td className="px-6 py-3">{student.lastName || "N/A"}</td>
                <td className="px-6 py-3">{student.roll || "N/A"}</td>
                <td className="px-6 py-3">{student.class || "N/A"}</td>
                <td className="px-6 py-3">{student.section || "N/A"}</td>
                <td className="px-6 py-3">{student.gender || "N/A"}</td>
                <td className="px-6 py-3">
                  {student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-3">{student.religion || "N/A"}</td>
                <td className="px-6 py-3">{student.caste || "N/A"}</td>
                <td className="px-6 py-3">{student.bloodGroup || "N/A"}</td>
                <td className="px-6 py-3">{student.category || "N/A"}</td>
                <td className="px-6 py-3">{student.height || "N/A"}</td>
                <td className="px-6 py-3">{student.weight || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default StudentList;
