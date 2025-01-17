import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Import Sidebar
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const FeeManagement = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feeDetails, setFeeDetails] = useState({
    feesType: "",
    invoiceNumber: "",
    status: "Pending",
    amount: "",
    paidAmount: "",
    paymentMethod: "",
    paidDate: "",
    pendingPayment: "",
  });
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);  // For success popup
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  // Handle class and section change to filter students
  const handleFilterStudents = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/get-students?class=${selectedClass}&section=${selectedSection}`);
      const data = await response.json();

      if (data && data.students) {
        setStudents(data.students);
      } else {
        console.log("No students found for this filter.");
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Open modal for fee management
  const handleManageFee = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeeDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitFee = async () => {
    const feeData = {
      studentId: selectedStudent._id, 
      feesType: feeDetails.feesType,
      invoiceNumber: feeDetails.invoiceNumber,
      status: feeDetails.status,
      amount: feeDetails.amount,
      paidAmount: feeDetails.paidAmount,
      paymentMethod: feeDetails.paymentMethod,
      paidDate: feeDetails.paidDate,
      pendingPayment: feeDetails.pendingPayment,
    };

    try {
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/add-fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feeData),
      });

      const data = await response.json();

      // Check if the API responded successfully
      if (response.ok) {
        if (data.message === "Fee added successfully") {
          console.log("Fee details added successfully:", data);
          setIsSuccessPopupOpen(true); // Open success popup

          // Reset form and close modal after success
          setFeeDetails({
            feesType: "",
            invoiceNumber: "",
            status: "Pending",
            amount: "",
            paidAmount: "",
            paymentMethod: "",
            paidDate: "",
            pendingPayment: "",
          });

          setTimeout(() => {
            setIsSuccessPopupOpen(false);
            setIsModalOpen(false); // Close the modal after a short delay
          }, 2000);
        } else {
          // Handle unexpected success message or other cases
          console.error("Unexpected response:", data.message);
        }
      } else {
        // Handle response failure (e.g., 4xx or 5xx error)
        console.error("Error adding fee details:", data.message || "Unknown error");
      }
    } catch (error) {
      // This will log network-related errors, like connection issues
      console.error("Error submitting fee details:", error);
    }
  };

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
          <h1 className="text-lg font-bold">Fee Management</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title and Filter Section */}
        <div className="p-6">

          {/* Filter Section */}
          <div className="flex flex-col sm:flex-row sm:gap-6 sm:items-center mb-6">
            <select
              className="p-2 border rounded-md focus:border-purple-500 mb-4 sm:mb-0"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="5">Class 5</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
            <select
              className="p-2 border rounded-md focus:border-purple-500 mb-4 sm:mb-0"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
            <button
              className="p-2 bg-purple-600 text-white rounded-md"
              onClick={handleFilterStudents}
            >
              Get Students
            </button>
          </div>

          {/* Students Table */}
          {students.length > 0 ? (
            <table className="w-full bg-white rounded-lg shadow-md mb-6">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Roll</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Class</th>
                  <th className="p-3 text-left">Section</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="p-3">{student.roll}</td>
                    <td className="p-3">{student.fullName}</td>
                    <td className="p-3">{student.class}</td>
                    <td className="p-3">{student.section}</td>
                    <td className="p-3 text-center">
                      <button
                        className="p-2 bg-purple-500 text-white rounded-md"
                        onClick={() => handleManageFee(student)}
                      >
                        Manage Fee
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No students found. Please filter by class and section.</p>
          )}
        </div>
        
        {/* Success Popup */}
        {isSuccessPopupOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Fee Address Successfully Added!</h3>
            </div>
          </div>
        )}

        {/* Modal for Fee Details */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
              <h2 className="text-lg font-semibold mb-4">
                Manage Fee for {selectedStudent.fullName}
              </h2>
              <div className="space-y-4">
                {/* Fields in 2 columns */}
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="feesType"
                    value={feeDetails.feesType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:border-purple-500"
                  >
                    <option value="">Select Fee Type</option>
                    <option value="Tuition">Tuition</option>
                    <option value="Exam">Exam</option>
                    <option value="Other">Other</option>
                  </select>

                  <input
                    type="text"
                    name="invoiceNumber"
                    value={feeDetails.invoiceNumber}
                    onChange={handleInputChange}
                    placeholder="Invoice Number"
                    className="w-full p-2 border rounded-md focus:border-purple-500"
                  />

                  <select
                    name="status"
                    value={feeDetails.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:border-purple-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                  </select>

                  <input
                    type="number"
                    name="amount"
                    value={feeDetails.amount}
                    onChange={handleInputChange}
                    placeholder="Total Amount"
                    className="w-full p-2 border rounded-md focus:border-purple-500"
                  />
                </div>

                {/* Remaining fields in one column */}
                <div className="space-y-4 mt-4">
                  <input
                    type="number"
                    name="paidAmount"
                    value={feeDetails.paidAmount}
                    onChange={handleInputChange}
                    placeholder="Amount Paid"
                    className="w-full p-2 border rounded-md focus:border-purple-500"
                  />
                  <input
                    type="text"
                    name="paymentMethod"
                    value={feeDetails.paymentMethod}
                    onChange={handleInputChange}
                    placeholder="Payment Method"
                    className="w-full p-2 border rounded-md focus:border-purple-500"
                  />
                  <input
                    type="date"
                    name="paidDate"
                    value={feeDetails.paidDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:border-purple-500"
                  />
                  <input
                    type="number"
                    name="pendingPayment"
                    value={feeDetails.pendingPayment}
                    onChange={handleInputChange}
                    placeholder="Pending Payment"
                    className="w-full p-2 border rounded-md focus:border-purple-500"
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="p-2 bg-gray-400 text-white rounded-md"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md"
                    onClick={handleSubmitFee}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeManagement;
