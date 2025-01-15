import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const DeleteStudentRecord = () => {
  const [students, setStudents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  // Sample student data, can be replaced with real data.
  const studentData = [
    { admissionNo: "89964", rollNo: "1", name: "John Doe", classSection: "10-A", fatherName: "Mr. Doe", dob: "2005-10-15", phone: "1234567890" },
    { admissionNo: "89965", rollNo: "2", name: "Jane Smith", classSection: "9-B", fatherName: "Mr. Smith", dob: "2006-08-22", phone: "2345678901" },
    // Add more sample students as needed
  ];

  // Setting the initial student data into state
  useEffect(() => {
    setStudents(studentData);
  }, []);

  const deleteRecord = (admissionNo) => {
    const updatedStudents = students.filter(student => student.admissionNo !== admissionNo);
    setStudents(updatedStudents);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen">
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Delete Student Record</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Title */}
          <h1 className="text-xl text-gray-700 mb-4">Delete Student Record</h1>

          {/* Table Section */}
          <div className="bg-white p-6 shadow-md rounded space-y-6">
            <h2 className="text-lg text-gray-700 mb-4">Student Records</h2>

            {/* Scrollable Table Wrapper */}
            <div className="overflow-x-auto max-h-96">
              {/* Table */}
              {students.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left border-b">Admission No</th>
                      <th className="px-4 py-2 text-left border-b">Roll No</th>
                      <th className="px-4 py-2 text-left border-b">Name</th>
                      <th className="px-4 py-2 text-left border-b">Class (Section)</th>
                      <th className="px-4 py-2 text-left border-b">Father Name</th>
                      <th className="px-4 py-2 text-left border-b">Date Of Birth</th>
                      <th className="px-4 py-2 text-left border-b">Phone</th>
                      <th className="px-4 py-2 text-left border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.admissionNo} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{student.admissionNo}</td>
                        <td className="border px-4 py-2">{student.rollNo}</td>
                        <td className="border px-4 py-2">{student.name}</td>
                        <td className="border px-4 py-2">{student.classSection}</td>
                        <td className="border px-4 py-2">{student.fatherName}</td>
                        <td className="border px-4 py-2">{new Date(student.dob).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">{student.phone}</td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => deleteRecord(student.admissionNo)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-500">No Data Available In Table</div>
              )}
            </div>

            <div className="text-sm text-gray-500 mt-4">
              {students.length > 0
                ? `Showing ${students.length} entries`
                : "Showing 0 to 0 of 0 entries"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudentRecord;
