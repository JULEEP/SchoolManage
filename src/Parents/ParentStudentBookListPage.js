import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons
import ParentSidebar from "./ParentSidebar";

const ParentStudentBookListPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // Dummy book data
  const books = [
    {
      title: "JavaScript: The Good Parts",
      bookNo: "B001",
      isbnNo: "978-0596517748",
      category: "Programming",
      subject: "JavaScript",
      publisherName: "O'Reilly Media",
      authorName: "Douglas Crockford",
    },
    {
      title: "Eloquent JavaScript",
      bookNo: "B002",
      isbnNo: "978-1593279509",
      category: "Programming",
      subject: "JavaScript",
      publisherName: "No Starch Press",
      authorName: "Marijn Haverbeke",
    },
    {
      title: "Clean Code",
      bookNo: "B003",
      isbnNo: "978-0132350884",
      category: "Software Engineering",
      subject: "Coding Practices",
      publisherName: "Prentice Hall",
      authorName: "Robert C. Martin",
    },
  ];

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
          <h1 className="text-lg font-bold">Book List</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-medium text-gray-700 mb-6 mt-6 ml-2">All Books</h2>

        {/* Book List Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Book List Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Book Title</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Book No</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ISBN No</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Subject</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Publisher Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Author Name</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 text-sm text-gray-700">{book.title}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{book.bookNo}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{book.isbnNo}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{book.category}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{book.subject}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{book.publisherName}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{book.authorName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-2 text-center text-sm text-gray-600">
                      No Data Available In Table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 text-sm text-gray-600 text-center">
              Showing {books.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default ParentStudentBookListPage;
