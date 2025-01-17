import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const DeleteStudentRecord = () => {
  const [students, setStudents] = useState([
    { admissionNo: "89964", rollNo: "1", name: "John Doe", classSection: "10-A", fatherName: "Mr. Doe", dob: "2005-10-15", phone: "1234567890" },
    { admissionNo: "89965", rollNo: "2", name: "Jane Smith", classSection: "9-B", fatherName: "Mr. Smith", dob: "2006-08-22", phone: "2345678901" },
    // Add more sample students as needed
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveStudent = (admissionNo) => {
    setStudents(students.filter(student => student.admissionNo !== admissionNo));
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo?.toString().includes(searchTerm)
  );

  const exportToCSV = () => {
    const headers = [
      "SL,Admission No,Roll No,Name,Class-Section,Father's Name,DOB,Phone",
    ];
    const rows = filteredStudents.map((student, index) => [
      index + 1,
      student.admissionNo || "N/A",
      student.rollNo || "N/A",
      student.name || "N/A",
      student.classSection || "N/A",
      student.fatherName || "N/A",
      student.dob ? new Date(student.dob).toLocaleDateString() : "N/A",
      student.phone || "N/A",
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
          <h1 className="text-lg font-bold">Student Deleted List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search and Export */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded-md w-1/3 mt-2"
          />
          <button
            onClick={exportToCSV}
            className="ml-4 px-4 py-2 mt-4 bg-purple-600 text-white mr-2 rounded-md hover:bg-purple-700"
          >
            Export CSV
          </button>
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">Admission No</th>
                <th className="px-4 py-2 border-b">Roll No</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Class-Section</th>
                <th className="px-4 py-2 border-b">Father's Name</th>
                <th className="px-4 py-2 border-b">DOB</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.admissionNo}>
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{student.admissionNo}</td>
                    <td className="px-4 py-2 border-b">{student.rollNo}</td>
                    <td className="px-4 py-2 border-b">{student.name}</td>
                    <td className="px-4 py-2 border-b">{student.classSection}</td>
                    <td className="px-4 py-2 border-b">{student.fatherName}</td>
                    <td className="px-4 py-2 border-b">{student.dob ? new Date(student.dob).toLocaleDateString() : "N/A"}</td>
                    <td className="px-4 py-2 border-b">{student.phone}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleRemoveStudent(student.admissionNo)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudentRecord;
