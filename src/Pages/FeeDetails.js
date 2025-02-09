import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import Sidebar component
import { jsPDF } from 'jspdf';
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

function FeeDetails() {
  const [feeData, setFeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For Filters
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Show 5 items per page

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedFee, setSelectedFee] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newPaidAmount, setNewPaidAmount] = useState('');

  useEffect(() => {
    axios.get('https://school-backend-1-2xki.onrender.com/api/admin/fees')
      .then((response) => {
        setFeeData(response.data.fees);
        setFilteredData(response.data.fees); // Initial data
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  // Handle Filter Change
  const handleFilter = () => {
    let filtered = [...feeData];

    if (classFilter) {
      filtered = filtered.filter(fee => fee.studentId.class === classFilter);
    }

    if (sectionFilter) {
      filtered = filtered.filter(fee => fee.studentId.section === sectionFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(fee => fee.status === statusFilter);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page whenever filter is applied
  };

  // Handle Class, Section, and Status Filter Change
  const handleClassChange = (e) => {
    setClassFilter(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSectionFilter(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

   // Open Modal for Fee Update
   const openModal = (fee) => {
    setSelectedFee(fee);
    setNewStatus(fee.status);
    setNewPaidAmount(fee.paidAmount);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFee(null);
  };

  // Function to generate CSV
  const generateCSV = () => {
    const headers = [
      "Student Name", "Class", "Section", "Roll Number", "Fees Type",
      "Invoice Number", "Status", "Amount", "Paid Amount", "Payment Method",
      "Paid Date", "Pending Payment", "Created At", "Updated At"
    ];

    const rows = filteredData.map(fee => [
      `${fee.studentId.firstName} ${fee.studentId.lastName}`,
      fee.studentId.class,
      fee.studentId.section,
      fee.studentId.roll,
      fee.feesType,
      fee.invoiceNumber,
      fee.status,
      fee.amount,
      fee.paidAmount,
      fee.paymentMethod,
      new Date(fee.paidDate).toLocaleDateString(),
      fee.pendingPayment,
      new Date(fee.createdAt).toLocaleDateString(),
      new Date(fee.updatedAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','), // Headers row
      ...rows.map(row => row.join(',')) // Data rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'fee_details.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

// Function to update fee status
const updateFeeStatus = async () => {
  if (!selectedFee) return;

  try {
    await axios.put('https://school-backend-1-2xki.onrender.com/api/admin/update-fee', {
      feeId: selectedFee._id,
      newStatus,
      paidAmount: newPaidAmount,
    });


    const updatedData = feeData.map(fee =>
      fee._id === selectedFee._id
        ? { ...fee, status: newStatus, paidAmount: newPaidAmount }
        : fee
    );

    setFeeData(updatedData);
    setFilteredData(updatedData);
    closeModal();
  } catch (error) {
  }
};

  // Get current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-300 text-green-800';
      case 'Pending':
        return 'bg-yellow-300 text-yellow-800';
      case 'Overdue':
        return 'bg-red-300 text-red-800';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  // Function to generate invoice as PDF
  const downloadInvoice = (fee) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.text("Invoice", 20, 20);
    doc.text(`Invoice Number: ${fee.invoiceNumber}`, 20, 30);
    doc.text(`Student: ${fee.studentId.firstName} ${fee.studentId.lastName}`, 20, 40);
    doc.text(`Class: ${fee.studentId.class}`, 20, 50);
    doc.text(`Section: ${fee.studentId.section}`, 20, 60);
    doc.text(`Amount: ${fee.amount}`, 20, 70);
    doc.text(`Paid Amount: ${fee.paidAmount}`, 20, 80);
    doc.text(`Payment Method: ${fee.paymentMethod}`, 20, 90);
    doc.text(`Status: ${fee.status}`, 20, 100);
    doc.text(`Paid Date: ${new Date(fee.paidDate).toLocaleDateString()}`, 20, 110);
    doc.text(`Pending Payment: ${fee.pendingPayment}`, 20, 120);
    doc.text(`Created At: ${new Date(fee.createdAt).toLocaleDateString()}`, 20, 130);
    doc.text(`Updated At: ${new Date(fee.updatedAt).toLocaleDateString()}`, 20, 140);

    doc.save(`invoice_${fee.invoiceNumber}.pdf`);
  };


  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Fee Details</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Filter Section */}
        <div className="p-6">
          {/* Filters for Class, Section, and Status */}
          <div className="mb-4 flex flex-col sm:flex-row sm:gap-6 sm:items-center">
            <select
              value={classFilter}
              onChange={handleClassChange}
              className="border px-4 py-2 rounded-md mb-4 sm:mb-0"
            >
              <option value="">Select Class</option>
              <option value="5">Class 5</option>
              <option value="10">Class 10</option>
            </select>

            <select
              value={sectionFilter}
              onChange={handleSectionChange}
              className="border px-4 py-2 rounded-md mb-4 sm:mb-0"
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>

            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="border px-4 py-2 rounded-md mb-4 sm:mb-0"
            >
              <option value="">Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>

            <button
              onClick={handleFilter}
              className="px-4 py-2 bg-purple-500 text-white rounded-md"
            >
              Apply Filter
            </button>
          </div>

          {/* CSV Download Button */}
          <button
            onClick={generateCSV}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Download CSV
          </button>

          {/* Horizontal Scrollable Table Container */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="px-6 py-3 text-left">Student Name</th>
                  <th className="px-6 py-3 text-left">Class</th>
                  <th className="px-6 py-3 text-left">Section</th>
                  <th className="px-6 py-3 text-left">Roll Number</th>
                  <th className="px-6 py-3 text-left">Fees Type</th>
                  <th className="px-6 py-3 text-left">Invoice Number</th>
                  <th className="px-6 py-3 text-left text-center">Status</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Paid Amount</th>
                  <th className="px-6 py-3 text-left">Payment Method</th>
                  <th className="px-6 py-3 text-left">Paid Date</th>
                  <th className="px-6 py-3 text-left">Pending Payment</th>
                  <th className="px-6 py-3 text-left">Created At</th>
                  <th className="px-6 py-3 text-left">Updated At</th>
                  <th className="px-6 py-3 text-left">Action</th> {/* Action Column */}
                  <th className="px-6 py-3 text-left">Download</th> 

                </tr>
              </thead>
              <tbody>
                {currentItems.map(fee => (
                  <tr key={fee._id} className="border-b">
                    <td className="px-6 py-4">{fee.studentId.firstName} {fee.studentId.lastName}</td>
                    <td className="px-6 py-4">{fee.studentId.class}</td>
                    <td className="px-6 py-4">{fee.studentId.section}</td>
                    <td className="px-6 py-4">{fee.studentId.roll}</td>
                    <td className="px-6 py-4">{fee.feesType}</td>
                    <td className="px-6 py-4">{fee.invoiceNumber}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full ${getStatusColor(fee.status)}`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{fee.amount}</td>
                    <td className="px-6 py-4">{fee.paidAmount}</td>
                    <td className="px-6 py-4">{fee.paymentMethod}</td>
                    <td className="px-6 py-4">{new Date(fee.paidDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{fee.pendingPayment}</td>
                    <td className="px-6 py-4">{new Date(fee.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(fee.updatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(fee)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-md"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => downloadInvoice(fee)} // Added downloadInvoice function
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Download Invoice
                  </button>
                </td>                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-500 text-white rounded-l-md"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= filteredData.length}
              className="px-4 py-2 bg-purple-600 text-white rounded-r-md"
            >
              Next
            </button>
          </div>
        </div>
         {/* Modal for Updating Fee */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Update Fee Status</h2>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="border px-4 py-2 mb-2">
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
            <input
              type="number"
              value={newPaidAmount}
              onChange={(e) => setNewPaidAmount(e.target.value)}
              className="border px-4 py-2 mb-2"
              placeholder="Enter Paid Amount"
            />
            <button onClick={updateFeeStatus} className="px-4 py-2 bg-green-500 text-white">Update</button>
            <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white ml-2">Cancel</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default FeeDetails;
