import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import { FaBars, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

const DriverForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle the form submission
  const handleAddDriver = async (e) => {
    e.preventDefault();
    if (name && email && age && gender && mobileNumber && joiningDate) {
      const driverData = {
        name,
        email,
        age,
        gender,
        mobileNumber,
        joiningDate,
      };

      try {
        // Making the POST request to the API
        const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/add-driver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(driverData),
        });

        const data = await response.json();
        
        // Check if the response is successful (status 200 or 201)
        if (response.status === 201) {
          toast.success('Driver added successfully!'); // Success notification
          
          // Reset form fields
          setName('');
          setEmail('');
          setAge('');
          setGender('');
          setMobileNumber('');
          setJoiningDate('');
        } else {
          toast.error('Failed to add driver. Please try again.'); // Error notification
        }
      } catch (error) {
        console.error('Error adding driver:', error);
        toast.error('An error occurred while adding the driver.'); // Error notification
      }
    } else {
      toast.warning('Please fill in all fields'); // Warning notification
    }
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
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Add Driver</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-8">Add Driver</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <form onSubmit={handleAddDriver}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter driver name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter driver email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter driver age"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Mobile Number</label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter driver mobile number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Joining Date</label>
                  <input
                    type="date"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Add Driver
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Toastify Container */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} className="toast-container-mobile" />
      </div>
    </div>
  );
};

export default DriverForm;
