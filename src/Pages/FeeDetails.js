import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import Sidebar component
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

function FeeDetails() {
  const [feeData, setFeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For Filter
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

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

    setFilteredData(filtered);
  };

  // Handle Class and Section Filter Change
  const handleClassChange = (e) => {
    setClassFilter(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSectionFilter(e.target.value);
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
          <h2 className="text-2xl font-semibold mb-4">Fee Details</h2>

          {/* Filters for Class and Section */}
          <div className="mb-4 flex flex-col sm:flex-row sm:gap-6 sm:items-center">
            <select
              value={classFilter}
              onChange={handleClassChange}
              className="border px-4 py-2 rounded-md mb-4 sm:mb-0"
            >
              <option value="">Select Class</option>
              <option value="5">Class 5</option>
              <option value="10">Class 10</option>
              {/* Add more options here based on available classes */}
            </select>

            <select
              value={sectionFilter}
              onChange={handleSectionChange}
              className="border px-4 py-2 rounded-md mb-4 sm:mb-0"
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              {/* Add more options here based on available sections */}
            </select>

            {/* Filter Button */}
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
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Student Name</th>
                  <th className="px-6 py-3 text-left">Class</th>
                  <th className="px-6 py-3 text-left">Section</th>
                  <th className="px-6 py-3 text-left">Roll Number</th>
                  <th className="px-6 py-3 text-left">Fees Type</th>
                  <th className="px-6 py-3 text-left">Invoice Number</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Paid Amount</th>
                  <th className="px-6 py-3 text-left">Payment Method</th>
                  <th className="px-6 py-3 text-left">Paid Date</th>
                  <th className="px-6 py-3 text-left">Pending Payment</th>
                  <th className="px-6 py-3 text-left">Created At</th>
                  <th className="px-6 py-3 text-left">Updated At</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredData.map((fee) => (
                  <tr key={fee._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{fee.studentId.firstName} {fee.studentId.lastName}</td>
                    <td className="px-6 py-3">{fee.studentId.class}</td>
                    <td className="px-6 py-3">{fee.studentId.section}</td>
                    <td className="px-6 py-3">{fee.studentId.roll}</td>
                    <td className="px-6 py-3">{fee.feesType}</td>
                    <td className="px-6 py-3">{fee.invoiceNumber}</td>
                    <td className="px-6 py-3">{fee.status}</td>
                    <td className="px-6 py-3">{fee.amount}</td>
                    <td className="px-6 py-3">{fee.paidAmount}</td>
                    <td className="px-6 py-3">{fee.paymentMethod}</td>
                    <td className="px-6 py-3">{new Date(fee.paidDate).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{fee.pendingPayment}</td>
                    <td className="px-6 py-3">{new Date(fee.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{new Date(fee.updatedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeDetails;
