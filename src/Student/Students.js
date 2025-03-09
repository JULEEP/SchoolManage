import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StudentSidebar from "../Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineLocalPrintshop } from "react-icons/md";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [doubtText, setDoubtText] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [subject, setSubject] = useState("");
  const tableRef = useRef(null);
  const studentsPerPage = 10;

  // Fetch students
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePopupOpen = (studentId) => {
    setSelectedStudentId(studentId);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleDoubtSubmit = async () => {
    const askedBy = "67a482137d7494c75f3c59d0"; // Replace this with actual logged-in user's ID
    const askedTo = selectedStudentId;

    const requestData = {
      doubtText,
      askedBy,
      askedTo,
      subject,
    };

    try {
      const response = await axios.post("https://school-backend-1-2xki.onrender.com/api/students/ask", requestData);
      if (response.data.message) {
        alert("Doubt asked successfully!");
        handlePopupClose(); // Close the popup after submitting
      }
    } catch (error) {
      console.error("Error submitting doubt:", error);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      (student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll?.toString().includes(searchTerm))
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search Filter */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by Name, Roll"
            className="ml-4 px-4 py-2 bg-white border rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto mb-8">
          <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md" ref={tableRef}>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="px-4 py-2 border-b">SL</th>
                  <th className="px-4 py-2 border-b">First Name</th>
                  <th className="px-4 py-2 border-b">Last Name</th>
                  <th className="px-4 py-2 border-b">Class</th>
                  <th className="px-4 py-2 border-b">Section</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <tr key={student._id}>
                      <td className="px-4 py-2 border-b">{indexOfFirstStudent + index + 1}</td>
                      <td className="px-4 py-2 border-b">{student.firstName}</td>
                      <td className="px-4 py-2 border-b">{student.lastName}</td>
                      <td className="px-4 py-2 border-b">{student.class}</td>
                      <td className="px-4 py-2 border-b">{student.section}</td>
                      <td className="px-4 py-2 border-b">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md"
                          onClick={() => handlePopupOpen(student._id)}
                        >
                          Ask Doubt
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? "bg-purple-600 text-white" : "bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Ask Doubt Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4">Ask a Doubt</h2>
            <textarea
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Enter your doubt here"
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
            />
            <select
              className="w-full p-2 mb-4 border rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
            </select>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md" onClick={handlePopupClose}>
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleDoubtSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
