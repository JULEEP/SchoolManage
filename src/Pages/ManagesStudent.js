import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from 'axios'

const ManageStudent = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [classValue, setClassValue] = useState("");
  const [section, setSection] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const [searchByRoll, setSearchByRoll] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);



  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch students data from API
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-student"
        );
        const data = await response.json();
        if (response.ok) {
          setStudents(data.students);
        } else {
          setError(data.message || "Error fetching students");
        }
      } catch (error) {
        setError("Error fetching students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleViewStudent = (studentId) => {
    axios.get(`https://school-backend-1-2xki.onrender.com/api/admin/get-studentdetails/${studentId}`)
      .then(response => {
        setSelectedStudent(response.data.student); // Extract student object correctly
        setIsPopupOpen(true);
      })
      .catch(error => {
        console.error("Error fetching student details:", error);
      });
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedStudent(null);
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the current page's students
  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = students
    .filter(
      (student) =>
        (searchByName === "" ||
          student.firstName.toLowerCase().includes(searchByName.toLowerCase())) &&
        (searchByRoll === "" || student.admissionNumber.includes(searchByRoll)) &&
        (academicYear === "" || student.academicYear === academicYear) &&
        (classValue === "" || student.class === classValue) &&
        (section === "" || student.section === section)
    )
    .slice(indexOfFirstStudent, indexOfLastStudent);

  // Pagination controls
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get the name of the parent based on the relationship
  const getParentName = (parents, relationship) => {
    const parent = parents.find((p) => p.relationship === relationship);
    return parent ? parent.name : "";
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
        style={{ height: "100vh", top: "0", left: "0" }} // Ensuring sidebar takes full height of the screen
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Manage Student</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700">Academic Year *</label>
              <select
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option value="">Select Academic Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Class *</label>
              <select
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Section *</label>
              <select
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          {/* Search Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700">Search By Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                placeholder="Name"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Search By Roll</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                placeholder="Roll"
                value={searchByRoll}
                onChange={(e) => setSearchByRoll(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button className="bg-purple-500 text-white px-6 py-2 rounded">Search</button>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 shadow-md rounded">
            <h2 className="text-lg text-gray-700 mb-4">Student List</h2>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="border-b px-4 py-2 text-left">Admission No</th>
                      <th className="border-b px-4 py-2 text-left">Name</th>
                      <th className="border-b px-4 py-2 text-left">Father Name</th>
                      <th className="border-b px-4 py-2 text-left">Mother Name</th>
                      <th className="border-b px-4 py-2 text-left">Guardian Name</th>
                      <th className="border-b px-4 py-2 text-left">DOB</th>
                      <th className="border-b px-4 py-2 text-left">Class(Section)</th>
                      <th className="border-b px-4 py-2 text-left">Gender</th>
                      <th className="border-b px-4 py-2 text-left">Category</th>
                      {/* New columns */}
                      <th className="border-b px-4 py-2 text-left">Address</th>
                      <th className="border-b px-4 py-2 text-left">Role</th>
                      <th className="border-b px-4 py-2 text-left">Academic Year</th>
                      <th className="border-b px-4 py-2 text-left">Section</th>
                      <th className="border-b px-4 py-2 text-left">Admission Date</th>
                      <th className="border-b px-4 py-2 text-left">Roll</th>
                      <th className="border-b px-4 py-2 text-left">Group</th>
                      <th className="border-b px-4 py-2 text-left">Religion</th>
                      <th className="border-b px-4 py-2 text-left">Caste</th>
                      <th className="border-b px-4 py-2 text-left">Email</th>
                      <th className="border-b px-4 py-2 text-left">Phone</th>
                      <th className="border-b px-4 py-2 text-left">Document Type</th>
                      <th className="border-b px-4 py-2 text-left">Previous School</th>
                      <th className="border-b px-4 py-2 text-left">Grade Completed</th>
                      <th className="border-b px-4 py-2 text-left">School Address</th>
                      <th className="border-b px-4 py-2 text-left">Random Password</th>
                      <th className="border-b px-4 py-2 text-left">Created At</th>
                      <th className="p-2 border">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {currentStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="border-b px-4 py-2">{student.admissionNumber}</td>
                        <td className="border-b px-4 py-2">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="border-b px-4 py-2">{getParentName(student.myParents, "Father")}</td>
                        <td className="border-b px-4 py-2">{getParentName(student.myParents, "Mother")}</td>
                        <td className="border-b px-4 py-2">{getParentName(student.myParents, "Guardian")}</td>
                        <td className="border-b px-4 py-2">
                          {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : ""}
                        </td>
                        <td className="border-b px-4 py-2">{student.class}</td>
                        <td className="border-b px-4 py-2">{student.gender}</td>
                        <td className="border-b px-4 py-2">{student.category}</td>
                        {/* New fields */}
                        <td className="border-b px-4 py-2">{student.address}</td>
                        <td className="border-b px-4 py-2">{student.role}</td>
                        <td className="border-b px-4 py-2">{student.academicYear}</td>
                        <td className="border-b px-4 py-2">{student.section}</td>
                        <td className="border-b px-4 py-2">{student.admissionDate}</td>
                        <td className="border-b px-4 py-2">{student.roll}</td>
                        <td className="border-b px-4 py-2">{student.group}</td>
                        <td className="border-b px-4 py-2">{student.religion}</td>
                        <td className="border-b px-4 py-2">{student.caste}</td>
                        <td className="border-b px-4 py-2">{student.email}</td>
                        <td className="border-b px-4 py-2">{student.phone}</td>
                        <td className="border-b px-4 py-2">{student.documentType}</td>
                        <td className="border-b px-4 py-2">{student.previousSchoolName}</td>
                        <td className="border-b px-4 py-2">{student.gradeCompleted}</td>
                        <td className="border-b px-4 py-2">{student.schoolAddress}</td>
                        <td className="border-b px-4 py-2">{student.randomPassword}</td>
                        <td className="border-b px-4 py-2">{new Date(student.createdAt).toLocaleDateString()}</td>
                        <td className="p-2 border">
                        <button 
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                          onClick={() => handleViewStudent(student._id)}
                        >
                          View
                        </button>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isPopupOpen && selectedStudent && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-6xl h-full overflow-y-auto">
                  <h3 className="text-2xl font-bold text-blue-500 mb-6 text-center">Student Details</h3>
            
                  {/* Personal Info Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Personal Info</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.lastName || "No data"}</div>
                      <div><strong>Gender:</strong> {selectedStudent.gender || "No data"}</div>
                      <div><strong>Date of Birth:</strong> {selectedStudent.dateOfBirth ? new Date(selectedStudent.dateOfBirth).toLocaleDateString() : "No data"}</div>
                      <div><strong>Religion:</strong> {selectedStudent.religion || "No data"}</div>
                      <div><strong>Caste:</strong> {selectedStudent.caste || "No data"}</div>
                    </div>
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  {/* Contact Info Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Contact Info</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Email:</strong> {selectedStudent.email || "No data"}</div>
                      <div><strong>Phone:</strong> {selectedStudent.phone || "No data"}</div>
                      <div><strong>Guardian:</strong> {selectedStudent.myParents && selectedStudent.myParents[0] ? selectedStudent.myParents[0].name : "No data"}</div>
                    </div>
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  {/* Address Info Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Address Info</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Address:</strong> {selectedStudent.address || "No data"}</div>
                      <div><strong>Previous School:</strong> {selectedStudent.previousSchoolName || "No data"}</div>
                      <div><strong>School Address:</strong> {selectedStudent.schoolAddress || "No data"}</div>
                    </div>
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  {/* Academic Info Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Academic Info</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Class:</strong> {selectedStudent.class || "No data"}</div>
                      <div><strong>Section:</strong> {selectedStudent.section || "No data"}</div>
                      <div><strong>Admission Number:</strong> {selectedStudent.admissionNumber || "No data"}</div>
                      <div><strong>Admission Date:</strong> {selectedStudent.admissionDate ? new Date(selectedStudent.admissionDate).toLocaleDateString() : "No data"}</div>
                      <div><strong>Grade Completed:</strong> {selectedStudent.gradeCompleted || "No data"}</div>
                    </div>
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  {/* Document Info Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Document Info</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Document Type:</strong> {selectedStudent.documentType || "No data"}</div>
                      <div><strong>Document Number:</strong> {selectedStudent.documentNumber || "No data"}</div>
                      <div><strong>Issue Date:</strong> {selectedStudent.issueDate ? new Date(selectedStudent.issueDate).toLocaleDateString() : "No data"}</div>
                      <div><strong>Expiration Date:</strong> {selectedStudent.expirationDate ? new Date(selectedStudent.expirationDate).toLocaleDateString() : "No data"}</div>
                    </div>
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  {/* Routine Info Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Routine Info</h4>
                    {selectedStudent.routine && selectedStudent.routine.length > 0 ? (
                      selectedStudent.routine.map((routine, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><strong>Day:</strong> {routine.day}</div>
                          <div><strong>Time:</strong> {routine.time}</div>
                          <div><strong>Subject:</strong> {routine.subject}</div>
                        </div>
                      ))
                    ) : (
                      <p>No routine data available</p>
                    )}
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  {/* Leaves Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Leaves</h4>
                    {selectedStudent.leaves && selectedStudent.leaves.length > 0 ? (
                      selectedStudent.leaves.map((leave, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</div>
                          <div><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</div>
                          <div><strong>Reason:</strong> {leave.reason}</div>
                          <div><strong>Status:</strong> {leave.status}</div>
                        </div>
                      ))
                    ) : (
                      <p>No leave data available</p>
                    )}
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  {/* Marks Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Marks</h4>
                    {selectedStudent.marks && selectedStudent.marks.length > 0 ? (
                      selectedStudent.marks.map((mark, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><strong>Subject:</strong> {mark.subject}</div>
                          <div><strong>Marks Obtained:</strong> {mark.marksObtained} / {mark.totalMarks}</div>
                          <div><strong>Exam Date:</strong> {new Date(mark.examDate).toLocaleDateString()}</div>
                          {mark.examType && <div><strong>Exam Type:</strong> {mark.examType}</div>}
                        </div>
                      ))
                    ) : (
                      <p>No marks data available</p>
                    )}
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  {/* Exam Schedule Section */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-4">Exam Schedule</h4>
                    {selectedStudent.examSchedule && selectedStudent.examSchedule.length > 0 ? (
                      selectedStudent.examSchedule.map((exam, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><strong>Subject:</strong> {exam.subject}</div>
                          <div><strong>Exam Date:</strong> {new Date(exam.examDate).toLocaleDateString()}</div>
                          <div><strong>Exam Type:</strong> {exam.examType}</div>
                          <div><strong>Admit Card Generated:</strong> {exam.isAdmitCardGenerated ? "Yes" : "No"}</div>
                        </div>
                      ))
                    ) : (
                      <p>No exam schedule data available</p>
                    )}
                  </div>
            
                  <div className="border-t-4 border-purple-600 my-6"></div>
            
                  <button 
                    className="mt-8 bg-red-500 text-white px-8 py-3 rounded-xl w-full"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            
            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Previous
              </button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
