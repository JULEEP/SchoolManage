import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import { toast, ToastContainer } from "react-toastify"; // Importing toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importing the toast styles

const Subject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [category, setCategory] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [search, setSearch] = useState("");
  const [subjectList, setSubjectList] = useState([]);

  // Dummy Categories (Dropdown data)
  const categories = ["Core", "Elective", "Optional"];

  const handleSaveSubject = () => {
    if (subjectName && category && subjectCode) {
      const newSubject = {
        id: subjectList.length + 1,
        subjectName,
        category,
        subjectCode,
      };
      setSubjectList([...subjectList, newSubject]);
      setSubjectName("");
      setCategory("");
      setSubjectCode("");
      toast.success("Subject added successfully!"); // Success toast
    } else {
      toast.error("Please fill in all fields!"); // Error toast
    }
  };

  const filteredSubjects = subjectList.filter(
    (subject) =>
      subject.subjectName.toLowerCase().includes(search.toLowerCase()) ||
      subject.category.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-lg font-bold">Subject</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-xl text-gray-700 p-6">Subject</h1>

        <div className="flex flex-wrap gap-8 px-6">
          {/* Left Side - Add Subject Form */}
          <div className="w-full sm:w-1/3 bg-gray-50 p-4 rounded shadow">
            <h2 className="text-lg mb-4 text-gray-600">Add Subject</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Subject Name *
                </label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="Enter subject name"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Subject Code *
                </label>
                <input
                  type="text"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  placeholder="Enter subject code"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <button
                onClick={handleSaveSubject}
                className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
              >
                Save Subject
              </button>
            </div>
          </div>

          {/* Right Side - Subject List */}
          <div className="w-full sm:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-gray-600">Subject List</h2>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
              />
            </div>

            <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">SL</th>
                    <th className="px-4 py-2 text-left text-gray-600">Subject</th>
                    <th className="px-4 py-2 text-left text-gray-600">Category Name</th>
                    <th className="px-4 py-2 text-left text-gray-600">Subject Code</th>
                    <th className="px-4 py-2 text-left text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        No Data Available In Table
                      </td>
                    </tr>
                  ) : (
                    filteredSubjects.map((subject, index) => (
                      <tr key={subject.id} className="border-t">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{subject.subjectName}</td>
                        <td className="px-4 py-2">{subject.category}</td>
                        <td className="px-4 py-2">{subject.subjectCode}</td>
                        <td className="px-4 py-2">
                          <button className="text-red-500 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-4 text-gray-500 text-sm px-6">
              Showing {filteredSubjects.length} entries
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Subject;
