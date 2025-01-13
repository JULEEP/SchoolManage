import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons
import StudentSidebar from "../Sidebar"; // Import the Sidebar component

function StudentFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // Fetch fees data
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/students/fees/676909bcd20deeaaeca9bc31"
        );
        setFees(response.data.fees);
        setLoading(false);
      } catch (err) {
        setError("Failed to load fees data.");
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  // Toggle Sidebar for Mobile View
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex bg-gray-100">
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
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-blue-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Fees Details</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Student Fees Details</h2>
      
        {/* Display loading or error */}
        {loading && <div className="text-center py-4">Loading...</div>}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}
      
        {/* Fees Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-700 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Fees Type</th>
                  <th className="px-6 py-3 text-left">Invoice Number</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Paid Amount</th>
                  <th className="px-6 py-3 text-left">Pending Payment</th>
                  <th className="px-6 py-3 text-left">Payment Method</th>
                  <th className="px-6 py-3 text-left">Paid Date</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee, index) => (
                  <tr
                    key={fee._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200 hover:bg-gray-100 transition`}
                  >
                    <td className="px-6 py-4">{fee.feesType}</td>
                    <td className="px-6 py-4">{fee.invoiceNumber}</td>
                    <td
                      className={`px-6 py-4 ${
                        fee.status === "Pending" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {fee.status}
                    </td>
                    <td className="px-6 py-4">{fee.amount}</td>
                    <td className="px-6 py-4">{fee.paidAmount}</td>
                    <td className="px-6 py-4">{fee.pendingPayment}</td>
                    <td className="px-6 py-4">{fee.paymentMethod}</td>
                    <td className="px-6 py-4">
                      {new Date(fee.paidDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>      
      </div>
    </div>
  );
}

export default StudentFees;
