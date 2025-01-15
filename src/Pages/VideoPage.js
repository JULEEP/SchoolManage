import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const VideoPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [sharedVideos, setSharedVideos] = useState([]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleAddVideo = () => {
    setModalOpen(true);
  };

  const handleSave = () => {
    const newVideo = {
      id: sharedVideos.length + 1,
      class: selectedClass,
      section: selectedSection,
      title,
      videoLink,
      description,
    };

    setSharedVideos([...sharedVideos, newVideo]);
    setModalOpen(false);
    setSelectedClass("");
    setSelectedSection("");
    setTitle("");
    setVideoLink("");
    setDescription("");
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedClass("");
    setSelectedSection("");
    setTitle("");
    setVideoLink("");
    setDescription("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Video</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Search Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Video</h2>
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow p-2 border rounded-md"
              />
              <button
                onClick={handleSearch}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Search
              </button>
            </div>
          </div>

          {/* Add Video Button */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleAddVideo}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              + ADD
            </button>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Class Drop-down */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Class</option>
                <option value="class-1">Class 1</option>
                <option value="class-2">Class 2</option>
                <option value="class-3">Class 3</option>
              </select>
            </div>

            {/* Section Drop-down */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Placeholder for Video List */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">SL</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Class</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Section</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {sharedVideos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No Data Available In Table
                    </td>
                  </tr>
                ) : (
                  sharedVideos.map((video, index) => (
                    <tr key={video.id}>
                      <td className="p-2 text-sm text-gray-700">{index + 1}</td>
                      <td className="p-2 text-sm text-gray-700">{video.title}</td>
                      <td className="p-2 text-sm text-gray-700">{video.class}</td>
                      <td className="p-2 text-sm text-gray-700">{video.section}</td>
                      <td className="p-2 text-sm text-gray-700">
                        <button className="text-blue-600 hover:underline">View</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {sharedVideos.length} to {sharedVideos.length} of {sharedVideos.length} entries
          </div>

          {/* Modal for Adding Video */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-700">Add Video</h3>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 text-xl font-semibold"
                  >
                    ×
                  </button>
                </div>

                {/* Video Form */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Class *</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Class</option>
                    <option value="class-1">Class 1</option>
                    <option value="class-2">Class 2</option>
                    <option value="class-3">Class 3</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Section *</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Video Link *</label>
                  <input
                    type="text"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="YouTube Link"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
