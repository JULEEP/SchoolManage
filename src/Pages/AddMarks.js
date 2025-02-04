import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import axios from "axios";

const StudentsMarksPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marksSubject, setMarksSubject] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [examDate, setExamDate] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [examType, setExamType] = useState(""); // Add this line to define the state
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Show 5 students per page
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added missing state

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/teacher/students");
        const fetchedStudents = response.data.students.map((student) => ({
          id: student._id,
          name: `${student.firstName} ${student.lastName}`,
          roll: student.roll,
          class: student.class,
          section: student.section,
        }));
        setStudents(fetchedStudents);
        setFilteredStudents(fetchedStudents);
      } catch (err) {
        setError("Failed to fetch students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSubjects = async () => {
      try {
        const subjectResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-subjects-names');
        const uniqueSubjects = [...new Set(subjectResponse.data.subjectNames.filter((name) => name))];
        setSubjects(uniqueSubjects || []);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    };

    fetchStudents();
    fetchSubjects();
  }, []);

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClassFilterChange = (event) => {
    const classValue = event.target.value;
    setClassFilter(classValue);
    filterStudents(classValue, sectionFilter);
  };

  const handleSectionFilterChange = (event) => {
    const sectionValue = event.target.value;
    setSectionFilter(sectionValue);
    filterStudents(classFilter, sectionValue);
  };

  const filterStudents = (classValue, sectionValue) => {
    let filtered = students;
    if (classValue) {
      filtered = filtered.filter((student) => student.class === classValue);
    }
    if (sectionValue) {
      filtered = filtered.filter((student) => student.section === sectionValue);
    }
    setFilteredStudents(filtered);
  };

  const openMarksModal = (student) => {
    setSelectedStudent(student);
    setMarksSubject("");
    setMarksObtained("");
    setTotalMarks("");
    setExamDate("");
  };

  const closeMarksModal = () => {
    setSelectedStudent(null);
  };

  const submitMarks = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/teacher/add-marks/${selectedStudent.id}`,
        {
          subject: marksSubject,
          marksObtained: marksObtained,
          totalMarks: totalMarks,
          examDate: examDate,
          examType: examType
        }
      );
      alert("Marks added successfully!");
      closeMarksModal();
    } catch (err) {
      alert("Failed to add marks. Please try again.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <Sidebar />
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
          <h1 className="text-lg font-bold">Add Marks</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-gray-100 flex-1">
          <h1 className="text-xl font-bold text-purple-700 mb-6 hidden lg:block">
            Add Marks
          </h1>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Filter Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="classFilter" className="block text-gray-600 mb-2">
                  Class
                </label>
                <select
                  id="classFilter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  value={classFilter}
                  onChange={handleClassFilterChange}
                >
                  <option value="">All Classes</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                </select>
              </div>

              <div>
                <label htmlFor="sectionFilter" className="block text-gray-600 mb-2">
                  Section
                </label>
                <select
                  id="sectionFilter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  value={sectionFilter}
                  onChange={handleSectionFilterChange}
                >
                  <option value="">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student List */}
          {loading ? (
            <p>Loading students...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-medium text-gray-700 mb-4">Student List</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-gray-50 rounded-lg">
                  <thead>
                    <tr className="text-left text-gray-600 border-b">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Roll Number</th>
                      <th className="py-3 px-4">Class</th>
                      <th className="py-3 px-4">Section</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudents.length > 0 ? (
                      currentStudents.map((student) => (
                        <tr key={student.id}>
                          <td className="py-3 px-4 text-gray-700">{student.name}</td>
                          <td className="py-3 px-4 text-gray-700">{student.roll}</td>
                          <td className="py-3 px-4 text-gray-700">{student.class}</td>
                          <td className="py-3 px-4 text-gray-700">{student.section}</td>
                          <td className="py-3 px-4 text-gray-700">
                            <button
                              className="px-4 py-2 rounded-md text-white bg-blue-500 mr-2 sm:px-2 mb-2 h-20 sm:py-1 sm:mr-1"
                              onClick={() => openMarksModal(student)}
                            >
                              Add Marks
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-3 px-4 text-center text-gray-700">
                          No students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <button
              className="px-4 py-2 bg-purple-300 rounded-md ml-2 text-white"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-purple-500 rounded-md ml-2 text-white"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * studentsPerPage >= filteredStudents.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Marks Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Add Marks for {selectedStudent.name}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Subject</label>
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={marksSubject}
                onChange={(e) => setMarksSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Marks Obtained</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={marksObtained}
                onChange={(e) => setMarksObtained(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Total Marks</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Exam Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Exam Type</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-purple-500 text-white rounded-md mr-2"
                onClick={submitMarks}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={closeMarksModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsMarksPage;
