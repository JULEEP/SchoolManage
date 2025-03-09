import React, { useState, useEffect } from 'react';
import StudentSidebar from "../Sidebar"; // Import the Sidebar component
import { FaBars, FaTimes } from 'react-icons/fa';

const StudentDoubtsPage = () => {
  const [myDoubts, setMyDoubts] = useState([]);
  const [receivedDoubts, setReceivedDoubts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isReplyPopupOpen, setIsReplyPopupOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedDoubtId, setSelectedDoubtId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Show 5 items per page

  // Fetch doubts data from API
  useEffect(() => {
    const studentId = "67a482137d7494c75f3c59d0";  // Replace with dynamic student ID or use context for current student

    const fetchDoubts = async () => {
      setLoading(true);
      setError(""); // Reset any previous error
      try {
        const response = await fetch(`https://school-backend-1-2xki.onrender.com/api/students/doubts/${studentId}`);
        const data = await response.json();

        console.log(data); // Log the API response to see the structure

        if (response.ok) {
          setMyDoubts(data.myDoubts || []);
          setReceivedDoubts(data.receivedDoubts || []);
        } else {
          setError("Failed to load doubts.");
        }
      } catch (err) {
        setError("An error occurred while fetching doubts.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, []);

  // Pagination logic: slice the doubts based on current page and items per page
  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(myDoubts.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  // Handle reply popup open
  const handleReplyPopupOpen = (doubtId) => {
    setSelectedDoubtId(doubtId);
    setIsReplyPopupOpen(true);
  };

  // Handle reply submission
  const handleReplySubmit = () => {
    console.log("Replying to doubt:", selectedDoubtId);
    console.log("Reply text:", replyText);
    // Add the logic for submitting the reply here (e.g., API call to submit reply)
    setIsReplyPopupOpen(false);
    setReplyText(""); // Clear the reply text
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">My Doubts</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* My Doubts Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">My Doubts</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-6 py-3 text-left">Doubt Text</th>
                    <th className="px-6 py-3 text-left">Asked To</th>
                    <th className="px-6 py-3 text-left">Subject</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Action</th> {/* New Action column */}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">Loading doubts...</td>
                    </tr>
                  ) : myDoubts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">No doubts asked</td>
                    </tr>
                  ) : (
                    paginate(myDoubts).map((doubt) => (
                      <tr key={doubt._id} className="border-t">
                        <td className="px-6 py-4">{doubt.doubtText}</td>
                        <td className="px-6 py-4">
                          {doubt.askedTo.firstName} {doubt.askedTo.lastName} (Class: {doubt.askedTo.class} {doubt.askedTo.section})
                        </td>
                        <td className="px-6 py-4">{doubt.subject}</td>
                        <td className="px-6 py-4">{new Date(doubt.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleReplyPopupOpen(doubt._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Reply
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-purple-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(myDoubts.length / itemsPerPage)}
                className="bg-purple-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>

          {/* Received Doubts Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Received Doubts</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-6 py-3 text-left">Doubt Text</th>
                    <th className="px-6 py-3 text-left">Asked By</th>
                    <th className="px-6 py-3 text-left">Subject</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Action</th> {/* New Action column */}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">Loading received doubts...</td>
                    </tr>
                  ) : receivedDoubts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">No doubts received</td>
                    </tr>
                  ) : (
                    receivedDoubts.map((doubt) => (
                      <tr key={doubt._id} className="border-t">
                        <td className="px-6 py-4">{doubt.doubtText}</td>
                        <td className="px-6 py-4">
                          {doubt.askedBy.firstName} {doubt.askedBy.lastName} (Class: {doubt.askedBy.class} {doubt.askedBy.section})
                        </td>
                        <td className="px-6 py-4">{doubt.subject}</td>
                        <td className="px-6 py-4">{new Date(doubt.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleReplyPopupOpen(doubt._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Reply
                          </button>
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

      {/* Reply Popup */}
      {isReplyPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Reply to Doubt</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="4"
              placeholder="Type your reply here..."
            />
            <div className="flex justify-end">
              <button
                onClick={handleReplySubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Send Reply
              </button>
              <button
                onClick={() => setIsReplyPopupOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDoubtsPage;
