import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Mobile sidebar toggle icons

const AddTeacher = () => {
  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    lastExperience: "",
    age: "",
    gender: "",
    education: "",
    joiningDate: new Date().toISOString().split("T")[0],
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherDetails({
      ...teacherDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(teacherDetails).forEach((key) => {
      formData.append(key, teacherDetails[key]);
    });

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://school-backend-1-2xki.onrender.com/api/admin/add-teacher",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Teacher added successfully!");
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("Failed to add teacher");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
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
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile View: Header and Sidebar Toggle Icon */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Add Teacher</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title Section */}

        {/* Add Teacher Form */}
        <div className="bg-white p-6 rounded-md shadow-md mb-8 w-full max-w-5xl mt-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              { label: "Teacher Name", name: "name", type: "text", placeholder: "Enter teacher name" },
              { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
              { label: "Phone", name: "phone", type: "text", placeholder: "Enter phone" },
              { label: "Address", name: "address", type: "text", placeholder: "Enter address" },
              { label: "Experience", name: "lastExperience", type: "text", placeholder: "Enter experience" },
              { label: "Age", name: "age", type: "number", placeholder: "Enter age" },
              { label: "Education", name: "education", type: "text", placeholder: "Enter education" },
            ].map((field, index) => (
              <div key={index}>
                <label htmlFor={field.name} className="text-sm text-gray-600">{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={teacherDetails[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-gray-600">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={teacherDetails.joiningDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
