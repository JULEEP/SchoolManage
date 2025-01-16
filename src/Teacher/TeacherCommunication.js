import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import TeacherSidebar from "./TeacherSidebar"; // Import TeacherSidebar component

const TeacherCommunication = () => {
  const [messages, setMessages] = useState([
    { parentName: "Parent 1", subject: "Math", message: "Message from Parent 1", response: "", date: "2025-01-16 10:00 AM" },
    { parentName: "Parent 2", subject: "Science", message: "Message from Parent 2", response: "", date: "2025-01-16 10:30 AM" },
    { parentName: "Parent 3", subject: "English", message: "Message from Parent 3", response: "", date: "2025-01-16 11:00 AM" },
    { parentName: "Parent 4", subject: "History", message: "Message from Parent 4", response: "", date: "2025-01-16 11:30 AM" },
  ]);

  const [response, setResponse] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleResponseClick = (index) => {
    setSelectedMessageIndex(index);
    setIsPopupOpen(true);
  };

  const handleSubmitResponse = () => {
    const updatedMessages = [...messages];
    updatedMessages[selectedMessageIndex].response = response;
    setMessages(updatedMessages);
    setResponse("");
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setResponse("");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <TeacherSidebar />
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" onClick={toggleSidebar}></div>
      )}

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto lg:ml-64">
        {/* Header for Mobile */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Parent Queries</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Messages Table */}
        <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Parent Queries</h2>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">No Queries received yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-400">Parent</th>
                    <th className="px-4 py-2 text-left text-gray-400">Subject</th>
                    <th className="px-4 py-2 text-left text-gray-400">Message</th>
                    <th className="px-4 py-2 text-left text-gray-400">Date</th>
                    <th className="px-4 py-2 text-left text-gray-400">Response</th>
                    <th className="px-4 py-2 text-left text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-400">{msg.parentName}</td>
                      <td className="px-4 py-2 text-gray-400">{msg.subject}</td>
                      <td className="px-4 py-2 text-gray-400">{msg.message}</td>
                      <td className="px-4 py-2 text-gray-400">{msg.date}</td>
                      <td className="px-4 py-2 text-gray-400">
                        {msg.response ? msg.response : "No response yet"}
                      </td>
                      <td className="px-4 py-2 text-gray-400">
                        <button
                          onClick={() => handleResponseClick(index)}
                          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-blue-700"
                        >
                          {msg.response ? "Edit Response" : "Respond"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Popup for Response */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-xl font-semibold mb-4">Teacher Response</h3>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                rows="4"
                placeholder="Write your response here..."
              ></textarea>
              <div className="flex justify-between">
                <button
                  onClick={handleSubmitResponse}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-green-700"
                >
                  Submit Response
                </button>
                <button
                  onClick={handleClosePopup}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCommunication;
