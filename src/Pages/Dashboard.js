import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar'; // Import Navbar component
import Sidebar from './Sidebar';
import axios from 'axios'; // We'll use axios to make API calls
import { FaBars, FaTimes } from 'react-icons/fa';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
 LineController, LineElement,  PointElement, PieController, ArcElement, Tooltip, Legend,
} from 'chart.js';

// Registering necessary components for Bar chart
Chart.register(BarController, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement, PieController, ArcElement, Tooltip, Legend );


const Dashboard = () => {
  const [notices, setNotices] = useState([]); // State to store notices from API
  const [formVisible, setFormVisible] = useState(false); // State to manage form visibility
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    class: '',
    section: '',
    targetAudience: [],
    postedBy: ''
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store chart instance
  const pieChartRef = useRef(null); // Ref for pie chart
  const pieChartInstanceRef = useRef(null); // Store pie chart instance
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Static labels for months
    data: [10, 20, 30, 40, 20, 90, 10, 200], // Static data points
  });
  const lineChartRef = useRef(null); // Ref for line chart
  const lineChartInstanceRef = useRef(null); // Store line chart instance

  useEffect(() => {
    const lineCtx = lineChartRef.current.getContext('2d');

    // Destroy any previous chart instance to avoid conflicts
    if (lineChartInstanceRef.current) {
      lineChartInstanceRef.current.destroy();
    }

    // Create Line Chart with static data
    lineChartInstanceRef.current = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: chartData.labels, // X-axis labels (months)
        datasets: [
          {
            label: 'Growth Over Time',
            data: chartData.data, // Y-axis data points
            fill: false, // No fill under the line
            borderColor: '#4A90E2', // Line color
            tension: 0.1, // Smoothness of the line curve
          },
        ],
      },
      options: {
        responsive: true, // Makes the chart responsive
        maintainAspectRatio: false, // Allows chart to scale with its container
        plugins: {
          legend: {
            display: true, // Display chart legend
            position: 'top', // Position of legend
          },
        },
      },
    });

    // Cleanup: Destroy chart when component unmounts
    return () => {
      if (lineChartInstanceRef.current) {
        lineChartInstanceRef.current.destroy();
      }
    };
  }, [chartData]); // Re-run the effect whenever chartData changes



  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy existing chart instance to avoid canvas reuse conflicts
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar', // Bar chart type
      data: {
        labels: ['Students', 'Teachers', 'Parents', 'Staffs', 'Subjects', 'Classes', 'Sections', 'Vehicles'],
        datasets: [
          {
            label: 'Count',
            data: [0, 50, 0, 0, 10, 5, 8, 4], // Example data
            backgroundColor: [
              '#ADD8E6', '#000000', '#FFB6C1', '#90EE90',
              '#FFFFE0', '#D8BFD8', '#FFA500', '#40E0D0'
            ],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow resizing
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        }
      }
    });

    // Cleanup: Destroy the chart instance when the component is unmounted
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once


  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/notices', formData);
      fetchNotices(); // After submitting, fetch updated notices
      setFormVisible(false); // Hide the form after submission
    } catch (error) {
      console.error('Error creating notice:', error);
    }
  };

  // Function to fetch notices from the API
  const fetchNotices = async () => {
    try {
      const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-notices');
      if (response.data.notices) {
        setNotices(response.data.notices);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  // Fetch notices when the component mounts
  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Always visible on large screens */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg lg:translate-x-0 lg:static lg:shadow-none w-64 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:transform-none`}
      >
        <Sidebar />
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header (only visible on small screens) */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-gray-100 flex-1">
          <div className="font-sans">

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Student Section (Light Blue) */}
              <div className="bg-blue-100 p-4 shadow-md rounded-md">
                <h2 className="font-semibold text-lg">Students</h2>
                <p className="text-gray-500">Total Students</p>
                <p className="text-2xl font-bold">0</p>
              </div>

              {/* Teacher Section (Black) */}
              <div className="bg-black text-white p-4 shadow-md rounded-md">
                <h2 className="font-semibold text-lg">Teachers</h2>
                <p className="text-gray-300">Total Teachers</p>
                <p className="text-2xl font-bold">50</p>
              </div>

              {/* Parent Section (Light Red) */}
              <div className="bg-red-100 p-4 shadow-md rounded-md">
                <h2 className="font-semibold text-lg">Parents</h2>
                <p className="text-gray-500">Total Parents</p>
                <p className="text-2xl font-bold">0</p>
              </div>

              {/* Staff Section (Light Green) */}
              <div className="bg-green-100 p-4 shadow-md rounded-md">
                <h2 className="font-semibold text-lg">Staffs</h2>
                <p className="text-gray-500">Total Staffs</p>
                <p className="text-2xl font-bold">0</p>
              </div>

              {/* Subjects Section (Light Yellow) */}
              <div className="bg-yellow-100 p-4 shadow-md rounded-md">
                <h2 className="font-semibold text-lg">Subjects</h2>
                <p className="text-gray-500">Total Subjects</p>
                <p className="text-2xl font-bold">10</p>
              </div>

              {/* Classes Section (Light Purple) */}
              <div className="bg-purple-100 p-4 shadow-md rounded-md">
                <h2 className="font-semibold text-lg">Classes</h2>
                <p className="text-gray-500">Total Classes</p>
                <p className="text-2xl font-bold">5</p>
              </div>

              {/* Sections Section (Light Orange) */}
              <div className="bg-orange-100 p-4 shadow-md rounded-md">
                <h2 className="font-semibold text-lg">Sections</h2>
                <p className="text-gray-500">Total Sections</p>
                <p className="text-2xl font-bold">8</p>
              </div>

              {/* Vehicles Section (Light Teal) */}
              <div className="bg-teal-100 p-4 shadow-md rounded-md">
                <h2 className="font-semibold text-lg">Vehicles</h2>
                <p className="text-gray-500">Total Vehicles</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </div>
        </div>
        {/* Notice Board Section */}
        <div className="bg-white p-6 shadow-md mt-8 rounded-md mb-6">
          <h2 className="text-xl text-gray-500">Notice Board</h2>

          {/* Button for adding new item */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setFormVisible(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              + ADD
            </button>
          </div>

       {/* Modal for form */}
{formVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
      <h3 className="text-xl font-semibold mb-4">Create Notice</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            placeholder="Class"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            placeholder="Section"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleInputChange}
            placeholder="Target Audience"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            name="postedBy"
            value={formData.postedBy}
            onChange={handleInputChange}
            placeholder="Posted By"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
          <div className="flex justify-end col-span-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setFormVisible(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

          {/* Table with gray borders */}
          <div className="overflow-x-auto">
            <table className="min-w-full mt-4 border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 text-left bg-gray-100">Date</th>
                  <th className="py-2 px-4 border border-gray-300 text-left bg-gray-100">Title</th>
                  <th className="py-2 px-4 border border-gray-300 text-left bg-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-2 px-4 text-center text-gray-500">No notices available</td>
                  </tr>
                ) : (
                  notices.map((notice) => (
                    <tr key={notice._id}>
                      <td className="py-2 px-4 border border-gray-300">{notice.date}</td>
                      <td className="py-2 px-4 border border-gray-300">{notice.title}</td>
                      <td className="py-2 px-4 border border-gray-300 text-center">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => alert(`Editing notice: ${notice.title}`)}
                        >
                          Edit
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

export default Dashboard;
