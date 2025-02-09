import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from "react-icons/fa";

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState('');

  // Fetching routines from the backend API
  const fetchRoutineData = async () => {
    try {
      const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-routine');
      setRoutines(response.data.routines || []);
    } catch (error) {
      setError('Error fetching routine data');
    }
  };

  useEffect(() => {
    fetchRoutineData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Routine List</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          {/* Routine List Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg text-gray-700 mb-4 font-semibold">Class Routines</h2>
            {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

            {routines.length === 0 ? (
              <p className="text-center text-gray-500">No Routine Available</p>
            ) : (
              <div className="space-y-6">
                {routines.map((routineData) => (
                  <div key={routineData._id} className="border rounded-lg p-4 shadow-md bg-gray-50">
                    <h3 className="text-md font-semibold text-gray-800">
                      Class: {routineData.class || routineData.className || 'N/A'} | Section: {routineData.section || 'N/A'}
                    </h3>
                    
                    {routineData.routine.length > 0 ? (
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full table-auto border-collapse shadow-lg">
                          <thead>
                            <tr className="bg-purple-600 text-white">
                              <th className="px-4 py-2 border text-sm">Day</th>
                              <th className="px-4 py-2 border text-sm">Time</th>
                              <th className="px-4 py-2 border text-sm">Subject</th>
                              <th className="px-4 py-2 border text-sm">Teacher</th>
                            </tr>
                          </thead>
                          <tbody>
                            {routineData.routine.map((session) => (
                              <tr key={session._id} className="border-t hover:bg-gray-100">
                                <td className="px-4 py-2 border text-center text-sm">{session.day}</td>
                                <td className="px-4 py-2 border text-center text-sm">{session.time}</td>
                                <td className="px-4 py-2 border text-center text-sm">{session.subject}</td>
                                <td className="px-4 py-2 border text-center text-sm">{session.teacher || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-2">No routine available for this class.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ToastContainer */}
    </div>
  );
};

export default RoutineList;
