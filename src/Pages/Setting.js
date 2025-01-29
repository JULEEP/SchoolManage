import React, { useState } from "react";
import axios from "axios"; // For making API requests
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // For sidebar toggle icons
import { toast, ToastContainer } from "react-toastify"; // Importing toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importing the toast styles

const Setting = () => {
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [schoolImage, setSchoolImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleSchoolImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSchoolImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
  
    // Append form data (school details)
    formData.append("schoolName", schoolName);
    formData.append("address", address);
    formData.append("contact", contact);
    formData.append("email", email); // Append email
    formData.append("description", description); // Append description
  
    // Append image files (if available)
    if (logo) {
      formData.append("logo", logo);
    }
    if (schoolImage) {
      formData.append("schoolImage", schoolImage); // Append school image
    }
  
    try {
      const response = await axios.post(
        "https://school-backend-1-2xki.onrender.com/api/admin/settings", // Backend URL
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("School details updated successfully!"); // Success toast
      // Clear form fields after successful submission
      setSchoolName("");
      setAddress("");
      setContact("");
      setEmail("");
      setDescription("");
      setLogo(null);
      setSchoolImage(null);
    } catch (error) {
      console.error("Error updating school details:", error);
      toast.error("Failed to update school details."); // Error toast
    } finally {
      setLoading(false);
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
          <h1 className="text-lg font-bold">School Details</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}

        {/* Success/Error Message */}
        {successMessage && (
          <div className="text-center text-green-600">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-center text-red-600">{errorMessage}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* School Name */}
            <div className="w-full">
              <label htmlFor="schoolName" className="block text-sm text-gray-600 mb-1">School Name</label>
              <input
                type="text"
                id="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter School Name"
                required
              />
            </div>

            {/* Address */}
            <div className="w-full">
              <label htmlFor="address" className="block text-sm text-gray-600 mb-1">Address</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter Address"
                required
              />
            </div>

            {/* Contact */}
            <div className="w-full">
              <label htmlFor="contact" className="block text-sm text-gray-600 mb-1">Contact</label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter Contact"
                required
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Description */}
            <div className="w-full">
              <label htmlFor="description" className="block text-sm text-gray-600 mb-1">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter School Description"
                required
              />
            </div>

            {/* Logo Image Upload */}
            <div className="w-full">
              <label htmlFor="logo" className="block text-sm text-gray-600 mb-1">Upload Logo</label>
              <input
                type="file"
                id="logo"
                onChange={handleLogoChange}
                className="w-full mt-2 border-2 border-dashed border-gray-300 p-6 text-center rounded-md cursor-pointer"
                accept="image/*"
              />
              {logo && (
                <div className="mt-4 text-center">
                  <img
                    src={URL.createObjectURL(logo)}
                    alt="Logo"
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                  />
                </div>
              )}
            </div>

            {/* School Image Upload */}
            <div className="w-full">
              <label htmlFor="schoolImage" className="block text-sm text-gray-600 mb-1">Upload School Image</label>
              <input
                type="file"
                id="schoolImage"
                onChange={handleSchoolImageChange}
                className="w-full mt-2 border-2 border-dashed border-gray-300 p-6 text-center rounded-md cursor-pointer"
                accept="image/*"
              />
              {schoolImage && (
                <div className="mt-4 text-center">
                  <img
                    src={URL.createObjectURL(schoolImage)}
                    alt="School Image"
                    className="w-32 h-32 object-cover rounded-md mx-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-purple-600 text-white rounded-md focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Setting;
