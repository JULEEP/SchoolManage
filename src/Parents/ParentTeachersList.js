import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons
import ParentSidebar from "./ParentSidebar";

const ParentTeachersList = () => {
  const [teachers, setTeachers] = useState([]); // State to store teacher details
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const studentId = "677904859d0da6e3bee4ba2e"; // Static studentId (could be dynamic based on context)

  // Default email in case the teacher does not have one
  const defaultEmail = "noemail@school.com";

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      setError(""); // Reset error
      try {
        // Fetch teachers from the API
        const response = await fetch(`https://school-backend-1-2xki.onrender.com/api/students/teachers/${studentId}`);
        const data = await response.json();

        if (response.ok) {
          // Extract teacher details from the response and set them in the state
          const teacherDetails = data.student.teachers.map((teacher) => ({
            name: teacher.name,
            subject: teacher.subject.join(", "), // Join multiple subjects with a comma
            email: teacher.email || defaultEmail, // Use default email if not available
            phone: teacher.phone || "Not available", // Provide default phone if not available
          }));

          setTeachers(teacherDetails);
        } else {
          setError(data.message || "Error fetching teachers");
        }
      } catch (err) {
        setError("An error occurred while fetching teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers(); // Call the function to fetch teachers
  }, [studentId]); // This effect runs once when the component mounts

  // Toggle Sidebar for Mobile View
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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
        <ParentSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Teachers List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-medium text-gray-700 mb-6 mt-6 ml-2">Class: 10 (A)</h2>

        {/* Teacher Names Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Teacher List</h3>

          {/* Display error if there is any */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display loading state */}
          {loading && <p className="text-gray-500">Loading teachers...</p>}

          {/* Table of Teacher Data */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3 border-b">Teacher Name</th>
                  <th className="px-6 py-3 border-b">Subject</th>
                  <th className="px-6 py-3 border-b">Email</th>
                  <th className="px-6 py-3 border-b">Phone</th>
                </tr>
              </thead>
              <tbody>
                {teachers.length > 0 ? (
                  teachers.map((teacher, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 border-b"
                    >
                      <td className="px-6 py-4">{teacher.name}</td>
                      <td className="px-6 py-4">{teacher.subject}</td>
                      <td className="px-6 py-4">{teacher.email}</td>
                      <td className="px-6 py-4">{teacher.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-gray-600 text-center py-4">
                      No teachers available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ParentTeachersList;
