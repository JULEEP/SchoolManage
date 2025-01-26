import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Assuming you have a Sidebar component
import { FaBars, FaTimes } from "react-icons/fa"; // For sidebar toggle

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState('');

  // Fetching routines from the backend API
  const fetchRoutineData = async () => {
    try {
      const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-routine');
      setRoutines(response.data.routine || []);
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

        <div className="max-w-6xl mx-auto">
          {/* Routine List Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-lg text-gray-700 mb-4">Existing Routines</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-gray-600">Class</th>
                  <th className="px-4 py-2 text-gray-600">Section</th>
                  <th className="px-4 py-2 text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {routines.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-500">
                      No Routine Available
                    </td>
                  </tr>
                ) : (
                  routines.map((routine, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="px-4 py-2 text-gray-600 text-center">{routine.class}</td>
                      <td className="px-4 py-2 text-gray-600 text-center">{routine.section}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {/* Handle remove routine logic */}}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
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
  );
};

export default RoutineList;
