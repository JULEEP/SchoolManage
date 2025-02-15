import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import certificateBackground from '../Images/certificate.jpeg';

const AdminCertificatePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

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

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const generateCertificate = (student) => {
    setSelectedStudent(student);
  };

  const downloadPDF = () => {
    if (!selectedStudent) return;

    const input = document.getElementById("studentCertificate");
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const doc = new jsPDF("landscape");
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
      doc.save("Student_Certificate.pdf");
    }).catch(err => console.error("Error generating PDF", err));
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>
      <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} h-screen`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Admin - Student Certificates</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Students</h2>
          <input
            type="text"
            placeholder="Search by name, class, or section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full lg:w-1/3"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-full overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Student List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Class</th>
                  <th className="px-4 py-2 text-left">Section</th>
                  <th className="px-4 py-2 text-left">Roll Number</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                      <td className="px-4 py-2">{student.class}</td>
                      <td className="px-4 py-2">{student.section}</td>
                      <td className="px-4 py-2">{student.roll}</td>
                      <td className="px-4 py-2">
                        <button onClick={() => generateCertificate(student)} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-blue-600">
                          Generate Certificate
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center text-gray-500">No students found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300">Previous</button>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * studentsPerPage >= filteredStudents.length} className="ml-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300">Next</button>
        </div>

        {/* Selected Certificate */}
        {selectedStudent && (
          <div id="studentCertificate" className="w-full max-w-4xl bg-white shadow-2xl rounded-xl border border-gray-300 p-10 mx-auto mt-8 text-center border-b-8 border-purple-600 relative" style={{ backgroundImage: `url(${certificateBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <h2 className="text-3xl font-extrabold text-purple-700 uppercase">{selectedStudent.certificateTitle || "Certificate of Excellence"}</h2>
            <p className="text-lg text-gray-700 mt-2 italic">This certificate is proudly presented to</p>
            <h2 className="text-4xl font-extrabold text-blue-900 mt-3 underline">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
            <p className="text-lg text-gray-600 mt-2 font-medium">Class: {selectedStudent.class} | Roll No: {selectedStudent.roll}</p>
            <p className="text-xl text-gray-800 mt-6 font-semibold">{selectedStudent.awardDetail || "For outstanding performance and dedication to academic success."}</p>
            <div className="mt-6 text-blue-900 font-bold text-lg">
              <p>Issued by: {selectedStudent.schoolName || "Greenwood International School"}</p>
              <p>Issue Date: {selectedStudent.issueDate ? new Date(selectedStudent.issueDate).toLocaleDateString() : "February 13, 2025"}</p>
            </div>
            <div className="mt-10 flex justify-between">
              <p className="border-t-4 border-gray-700 px-6 py-2 text-gray-700 ml-4 text-lg font-semibold">Principal's Signature</p>
              <p className="border-t-4 border-gray-700 px-6 py-2 text-gray-700 text-lg mr-4 font-semibold">Class Teacher's Signature</p>
            </div>
          </div>
        )}

        <div className="mt-6 w-full text-center sm:text-left">
          <button onClick={downloadPDF} className="px-8 py-3 bg-purple-700 text-white ml-4 mb-4 text-lg font-semibold rounded-lg hover:bg-purple-800 transition">
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificatePage;
