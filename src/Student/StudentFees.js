import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import StudentSidebar from "../Sidebar";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function StudentFees() {
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const feesPerPage = 5;

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/students/fees/676909bcd20deeaaeca9bc31"
        );
        setFees(response.data.fees);
        setFilteredFees(response.data.fees);
        setLoading(false);
      } catch (err) {
        setError("Failed to load fees data.");
        setLoading(false);
      }
    };
    fetchFees();
  }, []);

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredFees(fees);
    } else {
      setFilteredFees(fees.filter((fee) => fee.status === statusFilter));
    }
    setCurrentPage(1);
  }, [statusFilter, fees]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const indexOfLastFee = currentPage * feesPerPage;
  const indexOfFirstFee = indexOfLastFee - feesPerPage;
  const currentFees = filteredFees.slice(indexOfFirstFee, indexOfLastFee);

  const totalPages = Math.ceil(filteredFees.length / feesPerPage);

  const downloadInvoice = (fee) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Fee Receipt", 14, 20);

  const tableColumn = ["Field", "Details"];
  const tableRows = [
    ["Invoice Number", fee.invoiceNumber],
    ["Fees Type", fee.feesType],
    ["Amount", fee.amount],
    ["Paid Amount", fee.paidAmount],
    ["Pending Payment", fee.pendingPayment],
    ["Status", fee.status],
    ["Payment Method", fee.paymentMethod],
    ["Paid Date", new Date(fee.paidDate).toLocaleDateString()],
  ];

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
  });

  doc.save(`Invoice_${fee.invoiceNumber}.pdf`);
};


  
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <StudentSidebar />
      </div>

      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Fees Details</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4 mt-4">
          {loading && <div className="text-center py-4">Loading...</div>}
          {error && <div className="text-center py-4 text-red-500">{error}</div>}

          {!loading && !error && (
            <div>
              <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2 text-lg font-semibold">Filter by Status:</label>
                <select
                  id="statusFilter"
                  className="px-4 py-2 bg-gray-200 rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

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
                      <th className="px-6 py-3 text-left">Action</th> {/* Added Action column */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentFees.map((fee, index) => (
                      <tr
                        key={fee._id}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200 hover:bg-gray-100 transition`}
                      >
                        <td className="px-6 py-4">{fee.feesType}</td>
                        <td className="px-6 py-4">{fee.invoiceNumber}</td>
                        <td className={`px-6 py-4 ${fee.status === "Pending" ? "text-red-500" : "text-green-500"}`}>
                          {fee.status}
                        </td>
                        <td className="px-6 py-4">{fee.amount}</td>
                        <td className="px-6 py-4">{fee.paidAmount}</td>
                        <td className="px-6 py-4">{fee.pendingPayment}</td>
                        <td className="px-6 py-4">{fee.paymentMethod}</td>
                        <td className="px-6 py-4">{new Date(fee.paidDate).toLocaleDateString()}</td>
                        <td className="px-2 py-2">
                          <button
                            onClick={() => downloadInvoice(fee)}
                            className="px-2 py-2 bg-purple-600 text-white rounded hover:bg-blue-700"
                          >
                            Download Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentFees;
