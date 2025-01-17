import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa'; // For sidebar toggle icons

const GenerateSeatPlan = () => {
  const [exam, setExam] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [seatRules, setSeatRules] = useState([
    { startRoll: 1, endRoll: 50, row: 'Left' },
    { startRoll: 51, endRoll: 100, row: 'Right' }
  ]);
  const [loading, setLoading] = useState(false);
  const [seatPlan, setSeatPlan] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Function to fetch seat plan data via GET request (no filters)
  const handleFetchSeatPlan = async () => {
    if (!exam || !className || !section || !roomNumber) {
      alert("Please select all fields and room number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-seat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSeatPlan(data.seatPlan); // Set the seat plan data from the API response
      } else {
        alert("Failed to fetch seat plan.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching the seat plan.");
    } finally {
      setLoading(false);
    }
  };

  // Function to create seat plan via POST request
  const handleCreateSeatPlan = async () => {
    if (!exam || !className || !section || !roomNumber) {
      alert("Please select all fields and room number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/create-seat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomNumber,
          seatRules,
          class: className,
          section,
          exam
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSeatPlan(data.seatPlan); // Set the seat plan data from the API response
      } else {
        alert("Failed to generate seat plan.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the seat plan.");
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
          <h1 className="text-lg font-bold">Generate Seat Plan</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Title */}

        {/* Select Criteria */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {/* Room Number */}
            <div className="w-full">
              <label htmlFor="roomNumber" className="block text-sm text-gray-600 mb-1">Room Number</label>
              <input
                type="text"
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter Room Number"
              />
            </div>

            {/* Select Exam */}
            <div className="w-full">
              <label htmlFor="exam" className="block text-sm text-gray-600 mb-1">Select Exam</label>
              <select
                id="exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Exam</option>
                <option value="mid-term">Mid Term</option>
                <option value="final-term">Final Term</option>
              </select>
            </div>

            {/* Select Class */}
            <div className="w-full">
              <label htmlFor="className" className="block text-sm text-gray-600 mb-1">Select Class</label>
              <select
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Class</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6 items-center mt-4">
            {/* Select Section */}
            <div className="w-full">
              <label htmlFor="section" className="block text-sm text-gray-600 mb-1">Select Section</label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={handleFetchSeatPlan}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Fetch Seat Plan'}
            </button>

            <button
              onClick={handleCreateSeatPlan}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Seat Plan'}
            </button>
          </div>
        </div>

        {/* Results or Seat Plan Section */}
        <div className="mt-6">
          {seatPlan.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Seat Number</th>
                    <th className="px-4 py-2 text-left">Student Name</th>
                    <th className="px-4 py-2 text-left">Room Number</th>
                    <th className="px-4 py-2 text-left">Row</th>
                    <th className="px-4 py-2 text-left">Class</th>
                    <th className="px-4 py-2 text-left">Section</th>
                    <th className="px-4 py-2 text-left">Exam</th>
                  </tr>
                </thead>
                <tbody>
                  {seatPlan.map((seat, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{seat.seatNumber}</td>
                      <td className="px-4 py-2">{seat.name || 'Not Assigned'}</td>
                      <td className="px-4 py-2">{seat.roomNumber}</td>
                      <td className="px-4 py-2">{seat.row}</td>
                      <td className="px-4 py-2">{seat.class}</td>
                      <td className="px-4 py-2">{seat.section}</td>
                      <td className="px-4 py-2">{seat.exam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-700">Seat Plan details will appear here after fetching</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateSeatPlan;
