import React, { useState } from 'react';
import ParentSidebar from './ParentSidebar'; // Assuming you have this component
import { FaBars, FaTimes } from 'react-icons/fa';

const CommunicationForm = () => {
  const [teacher, setTeacher] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [parentReply, setParentReply] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [messages, setMessages] = useState([]); // State to store the submitted messages

  const teachers = ['Teacher 1', 'Teacher 2', 'Teacher 3']; // Replace with actual teacher data
  const subjects = ['Math', 'Science', 'English', 'History']; // Optional subject data

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { teacher, subject, message, response: '', parentReply: '', date: new Date().toLocaleString() };
    setMessages([newMessage, ...messages]); // Add new message at the beginning of the array
    setTeacher('');
    setSubject('');
    setMessage('');
  };

  const handleTeacherResponseSubmit = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].response = response; // Set teacher response
    setMessages(updatedMessages); // Update the state with the new response
    setResponse(''); // Clear the response input field
  };

  const handleParentReplySubmit = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].parentReply = parentReply; // Set parent reply
    setMessages(updatedMessages); // Update the state with the new reply
    setParentReply(''); // Clear the parent reply input field
  };

  // Toggle Sidebar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <ParentSidebar />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto lg:ml-64">
        {/* Header for Mobile */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Ask Queries To Teacher</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Form Section */}
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Parent-Teacher Communication</h2>
          <form onSubmit={handleSubmit}>
            {/* Teacher Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Teacher</label>
              <select
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Submitted Messages Table */}
        <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Submitted Messages</h2>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">No messages submitted yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-400">Teacher</th>
                    <th className="px-4 py-2 text-left text-gray-400">Subject</th>
                    <th className="px-4 py-2 text-left text-gray-400">Message</th>
                    <th className="px-4 py-2 text-left text-gray-400">Date</th>
                    <th className="px-4 py-2 text-left text-gray-400">Teacher Response</th>
                    <th className="px-4 py-2 text-left text-gray-400">Parent Reply</th>
                    <th className="px-4 py-2 text-left text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-400">{msg.teacher}</td>
                      <td className="px-4 py-2 text-gray-400">{msg.subject}</td>
                      <td className="px-4 py-2 text-gray-400">{msg.message}</td>
                      <td className="px-4 py-2 text-gray-400">{msg.date}</td>
                      <td className="px-4 py-2 text-gray-400">{msg.response ? msg.response : 'No response yet'}</td>
                      <td className="px-4 py-2 text-gray-400">{msg.parentReply ? msg.parentReply : 'No reply yet'}</td>
                      <td className="px-4 py-2 text-gray-400">
                        {/* Actions Column: Waiting for Teacher Response / Teacher Responded */}
                        {!msg.response ? (
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                          >
                            Waiting for Teacher Response
                          </button>
                        ) : (
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                          >
                            Teacher Responded
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationForm;
