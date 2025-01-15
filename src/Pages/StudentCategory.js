import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const StudentCategory = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const handleAddCategory = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Check if category is empty
    if (!category) {
      setErrorMessage("Category name is required.");
      return;
    }

    try {
      // Sending a POST request to the backend API with 'type' as the field
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: category }), // Send 'type' instead of 'name'
      });

      const data = await response.json();

      if (response.ok) {
        // On success, display the success message and add category to the list
        setSuccessMessage("Category added successfully.");
        setCategories((prevCategories) => [...prevCategories, category]);
        setCategory(""); // Reset input field
      } else {
        // On failure, display the error message
        setErrorMessage(data.message || "Failed to add category.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the category.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Category</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-6">
          {/* Left Side: Add Student Category Form */}
          <div className="w-full lg:w-1/3 bg-white p-4 shadow-md rounded mb-6 lg:mb-0">
            <h2 className="mb-4 text-gray-700">Add Student Category</h2>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddCategory}
                className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
              >
                Save Category
              </button>
            </div>
            {/* Feedback Messages */}
            {errorMessage && <div className="mt-4 text-red-600 text-sm">{errorMessage}</div>}
            {successMessage && <div className="mt-4 text-green-600 text-sm">{successMessage}</div>}
          </div>

          {/* Right Side: Student Category List */}
          <div className="w-full lg:w-2/3 bg-white p-4 shadow-md rounded">
            <h2 className="mb-4 text-gray-700">Student Category List</h2>
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 text-gray-700"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left text-gray-600">SL</th>
                  <th className="border border-gray-300 p-2 text-left text-gray-600">Category</th>
                  <th className="border border-gray-300 p-2 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories
                  .filter((cat) =>
                    cat.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((cat, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 text-gray-700">{index + 1}</td>
                      <td className="border border-gray-300 p-2 text-gray-700">{cat}</td>
                      <td className="border border-gray-300 p-2 text-gray-700">
                        <button
                          onClick={() =>
                            setCategories(categories.filter((_, i) => i !== index))
                          }
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCategory;
