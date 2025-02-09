import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import form from "../Images/form.jpg";

const MeetForm = () => {
  const [formData, setFormData] = useState({
    teacherName: "",
    date: "",
    time: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://school-backend-1-2xki.onrender.com/api/admin/teacher-meeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Meeting details posted successfully!");
        setFormData({ teacherName: "", date: "", time: "", link: "" }); // Reset form
      } else {
        setMessage(result.message || "Failed to post meeting details.");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-600 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Meet With teachers</h1>
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Meet Form */}
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
          <div className="flex-1 flex flex-col items-center p-4">
            {message && (
              <p
                className={`${
                  message.includes("success") ? "text-green-500" : "text-red-500"
                } text-sm mb-2`}
              >
                {message}
              </p>
            )}
            <form className="w-full space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="teacherName"
                placeholder="Teacher Name"
                value={formData.teacherName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="url"
                name="link"
                placeholder="Meet Link"
                value={formData.link}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 rounded"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </form>
          </div>
          {/* Image Section */}
          <div className="lg:hidden flex justify-center mt-4">
            <img src={form} alt="Class Update" className="max-w-full h-auto" />
          </div>
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <img src={form} alt="Class Update" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetForm;
