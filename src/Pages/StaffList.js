import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { CSVLink } from "react-csv";

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-1-2xki.onrender.com/api/admin/staffs"
        );
        setStaffList(response.data.staff || []);
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `<html><head><title>Print</title></head><body>${printContent}</body></html>`;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "N/A");

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredStaff.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredStaff.length / recordsPerPage);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
      </div>
      <div className="flex-grow overflow-y-auto transition-all duration-300 p-4">
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Staff List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <input type="text" placeholder="Search by Name or Email" className="px-4 py-2 bg-white border rounded-md" value={searchTerm} onChange={handleSearch} />
          <div className="flex gap-4">
          <button 
          onClick={handlePrint} 
          className="p-2 bg-transparent text-purple-600 hover:text-purple-800 text-2xl"
        >
        <MdOutlineLocalPrintshop />
        </button>            
        <CSVLink data={filteredStaff} filename="staff_data.csv" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Download CSV</CSVLink>
          </div>
        </div>
        <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md" ref={tableRef}>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="px-4 py-2 border-b">SL</th>
                <th className="px-4 py-2 border-b">First Name</th>
                <th className="px-4 py-2 border-b">Last Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b">Position</th>
                <th className="px-4 py-2 border-b">Department</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Date of Birth</th>
                <th className="px-4 py-2 border-b">Joining Date</th>
                <th className="px-4 py-2 border-b">Salary</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((staff, index) => (
                  <tr key={staff._id}>
                    <td className="px-4 py-2 border-b">{firstIndex + index + 1}</td>
                    <td className="px-4 py-2 border-b">{staff.firstName}</td>
                    <td className="px-4 py-2 border-b">{staff.lastName}</td>
                    <td className="px-4 py-2 border-b">{staff.email}</td>
                    <td className="px-4 py-2 border-b">{staff.phone}</td>
                    <td className="px-4 py-2 border-b">{staff.position}</td>
                    <td className="px-4 py-2 border-b">{staff.department}</td>
                    <td className="px-4 py-2 border-b">{staff.gender}</td>
                    <td className="px-4 py-2 border-b">{formatDate(staff.dateOfBirth)}</td>
                    <td className="px-4 py-2 border-b">{formatDate(staff.joiningDate)}</td>
                    <td className="px-4 py-2 border-b">{staff.salary}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="11" className="text-center py-4">No staff found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-600 text-white rounded-md">Previous</button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-md">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StaffList;
