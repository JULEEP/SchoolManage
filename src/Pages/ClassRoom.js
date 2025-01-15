import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from "react-icons/fa"; // For sidebar toggle

const ClassRoomPage = () => {
  const [formData, setFormData] = useState({
    roomNo: '',
    capacity: '',
  });

  const [classRooms, setClassRooms] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch classrooms from the API
  const fetchClassrooms = async () => {
    try {
      const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/get-classroom');
      const result = await response.json();

      if (response.ok) {
        setClassRooms(result.data);
      } else {
        setError(result.message || 'Failed to fetch classrooms.');
      }
    } catch (error) {
      setError('An error occurred while fetching classrooms.');
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClassRoom = async () => {
    if (formData.roomNo && formData.capacity) {
      try {
        const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/add-classroom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomNumber: formData.roomNo,
            capacity: formData.capacity,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setClassRooms([...classRooms, { id: result.data._id, roomNumber: formData.roomNo, capacity: formData.capacity }]);
          setFormData({ roomNo: '', capacity: '' });
          setError('');
          setSuccessMessage('Classroom added successfully!');
        } else {
          setError(result.message || 'Failed to add classroom.');
          setSuccessMessage('');
        }
      } catch (error) {
        setError('An error occurred while adding the classroom.');
        setSuccessMessage('');
      }
    } else {
      setError('Please fill in all fields.');
      setSuccessMessage('');
    }
  };

  const handleRemoveClassRoom = (id) => {
    setClassRooms(classRooms.filter((room) => room.id !== id));
  };

  // Pagination logic
  const indexOfLastClassRoom = currentPage * itemsPerPage;
  const indexOfFirstClassRoom = indexOfLastClassRoom - itemsPerPage;
  const currentClassRooms = classRooms.slice(indexOfFirstClassRoom, indexOfLastClassRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <h1 className="text-lg font-bold">Classroom Page</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg text-gray-700 mb-4">Add Class Room</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Room No Input */}
                <div>
                  <label htmlFor="roomNo" className="text-sm text-gray-600">Room No *</label>
                  <input
                    type="text"
                    id="roomNo"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* Capacity Input */}
                <div>
                  <label htmlFor="capacity" className="text-sm text-gray-600">Capacity *</label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Save Class Room Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSaveClassRoom}
                  className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Save Class Room
                </button>
              </div>
            </form>
          </div>

          {/* Classroom List Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-lg text-gray-700 mb-4">Classroom List</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-gray-600">Room No</th>
                  <th className="px-4 py-2 text-gray-600">Capacity</th>
                  <th className="px-4 py-2 text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentClassRooms.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-500">
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  currentClassRooms.map((room) => (
                    <tr key={room._id} className="border-t border-gray-300">
                      <td className="px-4 py-2 text-gray-600 text-center">{room.roomNumber}</td>
                      <td className="px-4 py-2 text-gray-600 text-center">{room.capacity}</td>
                      <td className="px-4 py-2 text-gray-600 text-center">
                        <button
                          onClick={() => handleRemoveClassRoom(room._id)}
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

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-purple-600 text-white rounded-md mr-2"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastClassRoom >= classRooms.length}
                className="px-4 py-2 bg-purple-600 text-white rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoomPage;
