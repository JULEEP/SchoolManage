import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from 'react-icons/fa'; // Sidebar toggle icons
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const AddBook = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [formData, setFormData] = useState({
    bookTitle: '',
    category: '',
    subject: '',
    bookNo: '',
    isbnNo: '',
    publisherName: '',
    authorName: '',
    rackNumber: '',
    quantity: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form submission logic goes here

    // Trigger success toast notification
    toast.success("Book added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
          <h1 className="text-lg font-bold">Add Book</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-xl text-gray-700 p-6">Add Book</h1>

        {/* Form Container */}
        <div className="p-6 bg-gray-100 rounded shadow">
          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
              {/* Book Title */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Book Title *
                </label>
                <input
                  type="text"
                  name="bookTitle"
                  value={formData.bookTitle}
                  onChange={handleChange}
                  placeholder="Enter Book Title"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Book Categories */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Book Categories *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select Category</option>
                  <option>Fiction</option>
                  <option>Non-Fiction</option>
                  <option>Science</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select Subject</option>
                  <option>Math</option>
                  <option>Science</option>
                  <option>Literature</option>
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
              {/* Book No */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Book No</label>
                <input
                  type="text"
                  name="bookNo"
                  value={formData.bookNo}
                  onChange={handleChange}
                  placeholder="Enter Book No"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* ISBN No */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">ISBN No</label>
                <input
                  type="text"
                  name="isbnNo"
                  value={formData.isbnNo}
                  onChange={handleChange}
                  placeholder="Enter ISBN No"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Publisher Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Publisher Name
                </label>
                <input
                  type="text"
                  name="publisherName"
                  value={formData.publisherName}
                  onChange={handleChange}
                  placeholder="Enter Publisher Name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
              {/* Author Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  placeholder="Enter Author Name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Rack Number */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Rack Number
                </label>
                <input
                  type="text"
                  name="rackNumber"
                  value={formData.rackNumber}
                  onChange={handleChange}
                  placeholder="Enter Rack Number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter Quantity"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
              {/* Book Price */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Book Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter Book Price"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="w-full p-2 border border-gray-300 rounded h-20"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded"
              >
                Save Book
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AddBook;
