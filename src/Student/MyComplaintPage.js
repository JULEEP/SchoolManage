import React, { useEffect, useState } from "react";
import StudentSidebar from "../Sidebar"; // Import Sidebar component
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import { toast, ToastContainer } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const ComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    // Fetch student complaints data
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/students/my-complaint/6799137209c338219c673fe3"
        );
        setComplaints(response.data.complaints); // Update state with the complaints data
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Error fetching complaints. Please try again later."); // Toast notification on error
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Complaints</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Complaint List */}
        <div className="flex flex-wrap gap-8 px-6 mt-4">
          <div className="w-full">

            <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
              {complaints.length === 0 ? (
                <p className="text-center text-gray-500">No complaints available.</p>
              ) : (
                complaints.map((complaint, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-md mb-4 shadow-lg"
                  >
                    <h3 className="font-bold text-lg text-purple-700">{complaint.title}</h3>
                    <p className="text-sm text-gray-600">{complaint.description}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      <strong>Complaint By:</strong> {complaint.complaintBy}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default ComplaintPage;
