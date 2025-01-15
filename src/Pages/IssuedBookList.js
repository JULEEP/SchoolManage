import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons

const IssuedBookList = () => {
  const [searchBookID, setSearchBookID] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  // Placeholder for API data
  const [issuedBooks, setIssuedBooks] = useState([]);

  // Dummy Subjects (For dropdown)
  const subjects = ["Math", "Science", "History", "English"];

  const handleSearch = () => {
    // API Call to fetch issued books based on criteria (Simulated here)
    console.log("Search criteria:", {
      bookTitle,
      searchBookID,
      selectedSubject,
    });

    // Placeholder for API integration: Dummy data response
    setIssuedBooks([
      {
        id: 1,
        title: "Mathematics Vol 1",
        bookNo: "BK001",
        isbn: "123-456789",
        memberName: "John Doe",
        author: "Jane Author",
        issueDate: "2024-06-01",
        returnDate: "2024-06-15",
        status: "Returned",
      },
      {
        id: 2,
        title: "Science Textbook",
        bookNo: "BK002",
        isbn: "987-654321",
        memberName: "Jane Smith",
        author: "Mark Author",
        issueDate: "2024-06-02",
        returnDate: "2024-06-20",
        status: "Pending",
      },
    ]);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

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
          <h1 className="text-lg font-bold">Issued Book List</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-xl text-gray-700 p-6">Issued Book List</h1>

        {/* Select Criteria */}
        <div className="flex flex-wrap gap-4 items-center px-6">
          <input
            type="text"
            placeholder="Book"
            className="border border-gray-300 rounded p-2 w-full sm:w-1/5"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search By Book ID"
            className="border border-gray-300 rounded p-2 w-full sm:w-1/5"
            value={searchBookID}
            onChange={(e) => setSearchBookID(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded p-2 w-full sm:w-1/5"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* All Issued Books List */}
        <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
          <h2 className="text-lg text-gray-700 mb-4">All Issued Book</h2>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Quick Search"
              className="border border-gray-300 rounded p-2 w-full sm:w-1/3"
              onChange={(e) => console.log("Quick search:", e.target.value)}
            />
          </div>

          {/* Table */}
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Book Title</th>
                <th className="px-4 py-2 text-left text-gray-600">Book No</th>
                <th className="px-4 py-2 text-left text-gray-600">ISBN No</th>
                <th className="px-4 py-2 text-left text-gray-600">Member Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Author</th>
                <th className="px-4 py-2 text-left text-gray-600">Issue Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Return Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No Data Available In Table
                  </td>
                </tr>
              ) : (
                issuedBooks.map((book) => (
                  <tr key={book.id} className="border-t">
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.bookNo}</td>
                    <td className="px-4 py-2">{book.isbn}</td>
                    <td className="px-4 py-2">{book.memberName}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.issueDate}</td>
                    <td className="px-4 py-2">{book.returnDate}</td>
                    <td className="px-4 py-2">{book.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 text-gray-500 text-sm px-6">
          Showing {issuedBooks.length} entries
        </div>
      </div>
    </div>
  );
};

export default IssuedBookList;
