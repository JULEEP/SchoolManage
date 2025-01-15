import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const ComplaintBook = () => {
  const [formData, setFormData] = useState({
    complaintBy: "",
    complaintType: "",
    complaintSource: "",
    phone: "",
    date: "",
    actionsTaken: "",
    assigned: "",
    description: "",
  });

  const [complaintList, setComplaintList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/get-complaints"
        );
        setComplaintList(response.data.complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://school-backend-1-2xki.onrender.com/api/admin/complaints",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);

      setComplaintList([...complaintList, response.data.complaint]);

      setFormData({
        complaintBy: "",
        complaintType: "",
        complaintSource: "",
        phone: "",
        date: "",
        actionsTaken: "",
        assigned: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding complaint:", error);
      alert("Failed to add complaint.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentComplaints = complaintList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(complaintList.length / itemsPerPage);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Complaint Book</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Form Section */}
        <div className="bg-white p-6 rounded-md shadow-md mb-8">
          <h2 className="text-lg text-gray-700 mb-4">Add Complaint</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((field) => (
              <div key={field} className="w-90">
                <label htmlFor={field} className="text-sm text-gray-600">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}{" "}
                  {field !== "actionsTaken" && field !== "description" && field !== "assigned" ? "*" : ""}
                </label>
                {field === "description" ? (
                  <textarea
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="3"
                  />
                ) : (
                  <input
                    type={field === "date" ? "date" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required={field !== "actionsTaken" && field !== "description" && field !== "assigned"}
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
              disabled={isSubmitting}
            >
              Save
            </button>
          </form>
        </div>

        {/* Complaint List */}
        <div className="mt-8">
          <h2 className="text-lg text-gray-700 mb-4">Complaint List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-t border-b border-gray-300">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-1 text-gray-600 text-left">SL</th>
                  <th className="px-2 py-1 text-gray-600 text-left">Complaint By</th>
                  <th className="px-2 py-1 text-gray-600 text-left">Complaint Type</th>
                  <th className="px-2 py-1 text-gray-600 text-left">Source</th>
                  <th className="px-2 py-1 text-gray-600 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {currentComplaints.map((complaint, index) => (
                  <tr key={complaint._id} className="border-b">
                    <td className="px-2 py-1 text-gray-600">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-2 py-1 text-gray-600">{complaint.complaintBy}</td>
                    <td className="px-2 py-1 text-gray-600">{complaint.complaintType}</td>
                    <td className="px-2 py-1 text-gray-600">{complaint.complaintSource}</td>
                    <td className="px-2 py-1 text-gray-600">{complaint.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-md text-sm disabled:bg-gray-100"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-md text-sm disabled:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintBook;
