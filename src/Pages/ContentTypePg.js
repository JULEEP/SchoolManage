import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const ContentTypePg = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [file, setFile] = useState(null);
  const [contentList, setContentList] = useState([]);

  const handleSave = () => {
    if (name && contentType && (youtubeLink || file)) {
      setContentList([
        ...contentList,
        { name, contentType, file, youtubeLink, size: file ? file.size : 0, uploadedBy: "Admin" },
      ]);
      setName("");
      setDescription("");
      setContentType("");
      setYoutubeLink("");
      setFile(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Content Type</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Search Section */}
          <div className="mb-6">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="flex-grow p-2 border rounded-md"
              />
              <button className="bg-purple-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-purple-700 sm:w-auto w-24">
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
            {/* Left Side - Form */}
            <div className="lg:w-1/3 p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Content</h3>

              {/* Content Type Dropdown */}
              <div className="mb-4">
                <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">
                  Content Type *
                </label>
                <select
                  id="contentType"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Content Type</option>
                  <option value="Video">Video</option>
                  <option value="Document">Document</option>
                  <option value="Image">Image</option>
                </select>
              </div>

              {/* Conditional Input Fields */}
              {contentType === "Video" && (
                <div className="mb-4">
                  <label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700">
                    YouTube Link
                  </label>
                  <input
                    type="text"
                    id="youtubeLink"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter YouTube URL"
                  />
                </div>
              )}

              {contentType && (
                <div className="mb-4 text-center text-sm text-gray-500">OR</div>
              )}

              {(contentType === "Document" || contentType === "Image") && (
                <div className="mb-4">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    File Upload
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt,.xlsx,.rar,.zip"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full p-2 border rounded-md"
                  />
                  <small className="block mt-1 text-xs text-gray-500">
                    (jpg, png, jpeg, pdf, doc, docx, txt, xlsx, rar, zip are allowed)
                  </small>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Save
              </button>
            </div>

            {/* Right Side - Content List */}
            <div className="lg:w-2/3 bg-white shadow-lg rounded-lg p-4 overflow-auto">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Content List</h3>

              {/* Content List Table */}
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left text-sm font-medium text-gray-700">SL</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Document</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Content Type</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Size</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Uploaded By</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contentList.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        No Data Available In Table
                      </td>
                    </tr>
                  ) : (
                    contentList.map((content, index) => (
                      <tr key={index}>
                        <td className="p-2 text-sm text-gray-700">{index + 1}</td>
                        <td className="p-2 text-sm text-gray-700">{content.name}</td>
                        <td className="p-2 text-sm text-gray-700">{content.contentType}</td>
                        <td className="p-2 text-sm text-gray-700">
                          {content.size ? `${(content.size / 1024).toFixed(2)} KB` : "N/A"}
                        </td>
                        <td className="p-2 text-sm text-gray-700">{content.uploadedBy}</td>
                        <td className="p-2 text-sm text-gray-700">
                          <button className="text-blue-600 hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTypePg;
