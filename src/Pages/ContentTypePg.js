import React, { useState } from "react";
import Sidebar from "./Sidebar";

const ContentTypePg = () => {
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
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar /> {/* Sidebar added here */}

    {/* Main Content */}
    <div className="flex-1 p-6 ml-64"> {/* Add ml-64 to shift the content right */}      {/* Title */}      {/* Search Bar */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Content Type</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Search
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex space-x-6">
        {/* Left Side - Form */}
        <div className="w-1/3 p-4 rounded-lg">
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

          {/* YouTube Link Field (for Video content) */}
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

          {/* OR Text */}
          {contentType && (
            <div className="mb-4 text-center text-sm text-gray-500">OR</div>
          )}

          {/* File Upload Field (for Document/Image content) */}
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
        <div className="w-2/3 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Content List</h3>

          {/* Search Input for Content List */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Content List"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Table for Content List */}
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
                    <td className="p-2 text-sm text-gray-700">{content.size ? `${content.size / 1024} KB` : "N/A"}</td>
                    <td className="p-2 text-sm text-gray-700">{content.uploadedBy}</td>
                    <td className="p-2 text-sm text-gray-700">
                      <button className="text-blue-600 hover:underline">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Share and Generate URL Buttons */}
          <div className="flex space-x-4 mt-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Share
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Generate URL
            </button>
          </div>

          {/* Pagination */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {contentList.length} to {contentList.length} of {contentList.length} entries
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContentTypePg;
