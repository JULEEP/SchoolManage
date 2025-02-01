import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";

const TeacherAttendance = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState({
    date: new Date().toISOString().split("T")[0],
    subject: "Math",
    status: "Present",
  });
  const [subjects] = useState(["Math", "Science", "English"]); // Example subjects

  // Filter states
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/teacher/students"
        );
        const fetchedStudents = response.data.students.map((student) => ({
          id: student._id,
          name: `${student.firstName} ${student.lastName}`,
          roll: student.roll,
          class: student.class,
          section: student.section,
        }));
        setStudents(fetchedStudents);
      } catch (err) {
        setError("Failed to fetch students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Open popup for marking attendance
  const openPopup = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
    setAttendanceData({
      date: new Date().toISOString().split("T")[0],
      subject: "Math",
      status: "Present",
    });
  };

  // Handle attendance submission
  const submitAttendance = async () => {
    try {
      const { id } = selectedStudent;  // Get the student's ID
      const { date, subject, status } = attendanceData;  // Get the attendance form data

      // Make the API call to the backend to submit the attendance
      const response = await axios.post(
        `https://school-backend-1-2xki.onrender.com/api/teacher/add-attendance/${id}`,  // Dynamic student ID in URL
        {
          date: date,     // Pass the date
          subject: subject,  // Pass the subject
          attendanceStatus: status,  // Pass the attendance status
        }
      );

      if (response.status === 200) {
        // If the attendance is successfully marked, close the popup and reset the form
        closePopup();
        alert("Attendance marked successfully!");
      } else {
        alert("Failed to mark attendance. Please try again.");
      }
    } catch (err) {
      console.error("Error marking attendance", err);
      alert("An error occurred while marking attendance. Please try again.");
    }
  };

  // Handle filter change for class
const handleClassFilterChange = (e) => {
  setClassFilter(e.target.value);
};

// Handle filter change for section
const handleSectionFilterChange = (e) => {
  setSectionFilter(e.target.value);
};

// Filter students based on class and section
const filteredStudents = students.filter((student) => {
  // Ensure class comparison is correct (both should be strings or both should be numbers)
  const classMatches = classFilter ? student.class === parseInt(classFilter) : true;  // Convert classFilter to number for accurate comparison
  
  const sectionMatches = sectionFilter ? student.section === sectionFilter : true;

  return classMatches && sectionMatches;
});

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentStudents = filteredStudents.slice(startIdx, startIdx + rowsPerPage);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <TeacherSidebar />
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Attendance Management</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-gray-100 flex-1">
          <div className="font-sans">
            <h1 className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg">
              Teacher Attendance Management
            </h1>

            {loading && <p>Loading students...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Filters */}
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col">
                <label className="font-medium">Class:</label>
                <select
                  value={classFilter}
                  onChange={handleClassFilterChange}
                  className="p-2 border rounded-lg"
                >
                  <option value="">All</option>
                  {/* Add the available classes here */}
                  <option value="Class 1">1</option>
                  <option value="Class 2">2</option>
                  <option value="Class 3">3</option>
                  <option value="Class 4">4</option>
                  <option value="Class 5">5</option>
                  <option value="Class 6">6</option>
                  <option value="Class 7">7</option>
                  <option value="Class 8">8</option>
                  <option value="Class 9">9</option>
                  <option value="Class 10">10</option>

                  {/* Add more as needed */}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Section:</label>
                <select
                  value={sectionFilter}
                  onChange={handleSectionFilterChange}
                  className="p-2 border rounded-lg"
                >
                  <option value="">All</option>
                  {/* Add the available sections here */}
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  {/* Add more as needed */}
                </select>
              </div>
            </div>

            {/* Students Table */}
            {!loading && !error && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border text-center">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border p-2">Roll</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Class</th>
                        <th className="border p-2">Section</th>
                        <th className="border p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((student) => (
                        <tr key={student.id} className="even:bg-gray-100">
                          <td className="border p-2">{student.roll}</td>
                          <td className="border p-2">{student.name}</td>
                          <td className="border p-2">{student.class}</td>
                          <td className="border p-2">{student.section}</td>
                          <td className="border p-2">
                            <button
                              onClick={() => openPopup(student)}
                              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                              Mark Attendance
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 text-white bg-purple-300 rounded-md hover:bg-gray-400"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-gray-400"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Attendance Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                  <h2 className="text-xl font-bold mb-4">
                    Mark Attendance for {selectedStudent?.name}
                  </h2>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Date:</label>
                    <input
                      type="date"
                      value={attendanceData.date}
                      onChange={(e) =>
                        setAttendanceData({ ...attendanceData, date: e.target.value })
                      }
                      className="p-2 border rounded-lg w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Subject:</label>
                    <select
                      value={attendanceData.subject}
                      onChange={(e) =>
                        setAttendanceData({ ...attendanceData, subject: e.target.value })
                      }
                      className="p-2 border rounded-lg w-full"
                    >
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Status:</label>
                    <select
                      value={attendanceData.status}
                      onChange={(e) =>
                        setAttendanceData({ ...attendanceData, status: e.target.value })
                      }
                      className="p-2 border rounded-lg w-full"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={closePopup}
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitAttendance}
                      className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;
