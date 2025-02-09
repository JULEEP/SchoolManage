import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar'; // Import Navbar component
import Sidebar from './Sidebar';
import axios from 'axios'; // We'll use axios to make API calls
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; // For navigation links
import { FaUserGraduate, FaChalkboardTeacher, FaDollarSign, FaMoneyBillWave, FaMoneyBillAlt, FaUserFriends, FaRegClock, FaUsers, FaBook, FaBuilding, FaTable, FaRegCalendarAlt, FaCarSide,FaLaptopCode } from 'react-icons/fa'; // For icons
import { Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";



import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController, LineElement, PointElement, PieController, ArcElement, Tooltip, Legend,
} from 'chart.js';
import IntroJs from "intro.js";
import "intro.js/introjs.css"; // Intro.js CSS import

// Registering necessary components for Bar chart
Chart.register(BarController, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement, PieController, ArcElement, Tooltip, Legend);


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

  const [feeDetails, setFeeDetails] = useState({
    totalPaid: 0,
    totalPending: 0
  });

  useEffect(() => {
    const intro = IntroJs();
  
    intro.setOptions({
      steps: [
        {
          element: ".intro-step-student",  // Student Section highlight
          intro: "This section allows you to manage the student details.",
          position: "top"
        },
        {
          element: ".intro-step-teacher",  // Teacher Section highlight
          intro: "This section allows you to manage teacher details.",
          position: "top"
        },
        {
          element: ".intro-step-parent",  // Parent Section highlight
          intro: "This section allows you to manage parent details.",
          position: "top"
        },
        {
          element: ".intro-step-staff",  // Staff Section highlight
          intro: "This section allows you to manage staff details.",
          position: "top"
        },
        {
          element: ".intro-step-subject",  // Subjects Section highlight
          intro: "This section allows you to manage subject details.",
          position: "top"
        },
        {
          element: ".intro-step-class",  // Classes Section highlight
          intro: "This section allows you to manage class details.",
          position: "top"
        },
        {
          element: ".intro-step-section",  // Sections Section highlight
          intro: "This section allows you to manage sections.",
          position: "top"
        },
        {
          element: ".intro-step-lesson",  // Lesson Section highlight
          intro: "This section allows you to manage lessons.",
          position: "top"
        },
        {
          element: ".intro-step-holidays",  // Holidays Section highlight
          intro: "This section allows you to manage holiday details.",
          position: "top"
        },
        {
          element: ".intro-step-fees",  // Fees Record Section highlight
          intro: "This section allows you to manage fees records.",
          position: "top"
        },
        {
          element: ".intro-step-routine",  // Routine Section highlight
          intro: "This section allows you to manage student routines.",
          position: "top"
        },
        {
          element: ".intro-step-vehicles",  // Vehicles Section highlight
          intro: "This section allows you to track the school vehicles.",
          position: "top"
        },
        {
          element: ".intro-step-dashboard-analytics",  // Dashboard Analytics Section highlight
          intro: "This section displays the analytics data in a visual format.",
          position: "top"
        },
        // Add Growth Over Time Section Step
        {
          element: ".intro-step-growth-over-time",  // Growth Over Time Section highlight
          intro: "This section visualizes the growth over time, helping you track progress.",
          position: "top"
        },
        {
          element: ".intro-step-notices",  // Highlight Notices Table
          intro: "This table shows the available notices. You can edit the notice by clicking the 'Edit' button.",
          position: "top"
        },
        // Add steps for Fee Summary Section
        {
          element: ".intro-step-fee-summary",  // Highlight Fee Summary Section
          intro: "This section provides a summary of the paid and pending fees.",
          position: "top"
        },   
  
      ],
      highlightClass: "rounded",
      nextLabel: "Next",
      prevLabel: "Previous",
      overlayOpacity: 0.8,
    });
  
    intro.onbeforechange((targetElement) => {
      // Smooth scroll to the target element
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  
    intro.start();
  }, []); // Empty dependency array ensures this effect runs only once
  
  

  useEffect(() => {
    // Fetching data from the API
    const fetchFeeDetails = async () => {
      try {
        const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/totalamount');
        const data = await response.json();
        if (data.message === 'Fee details fetched successfully') {
          setFeeDetails({
            totalPaid: data.totalPaid,
            totalPending: data.totalPending
          });
        }
      } catch (error) {
        console.error('Error fetching fee details:', error);
      }
    };

    fetchFeeDetails();
  }, []);


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
        labels: ['Students', 'Teachers', 'Parents', 'Staffs', 'Subjects', 'Classes', 'Sections', 'Vehicles','Meetings'],
        datasets: [
          {
            label: 'Count',
            data: [0, 50, 0, 0, 10, 5, 8, 4,""], // Example data
            backgroundColor: [
              '#ADD8E6', '#000000', '#FFB6C1', '#90EE90',
              '#FFFFE0', '#D8BFD8', '#FFA500', '#40E0D0','#ADD8E6'
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <div className="min-h-screen flex bg-gray-100">
    {/* Sidebar Overlay */}
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
      onClick={toggleSidebar}
    ></div>

    {/* Sidebar */}
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <Sidebar />
    </div>

    {/* Main Content */}
    <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
        <h1 className="text-lg font-bold">Admin DashBoard</h1>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-gray-100 flex-1 overflow-auto">
          <div className="font-sans">

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Student Section (Light Blue) */}
<div
className="bg-gradient-to-r from-blue-300 to-blue-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-student" // Add this class for highlighting
>
<NavLink to="/managestudent" className="flex flex-col items-center">
  <FaUserGraduate className="text-4xl text-white mb-3" /> {/* Icon for Students */}
  <h2 className="font-semibold text-xl text-white">Students</h2>
  <p className="text-gray-200">Total Students</p>
  <p className="text-2xl font-bold text-white">0</p>
</NavLink>
</div>


             {/* Teacher Section (Black) */}
<div
className="bg-gradient-to-r from-black to-gray-800 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-teacher" // Add this class for highlighting
>
<NavLink to="/teacher" className="flex flex-col items-center">
  <FaChalkboardTeacher className="text-4xl text-white mb-3" /> {/* Icon for Teachers */}
  <h2 className="font-semibold text-xl text-white">Teachers</h2>
  <p className="text-gray-300">Total Teachers</p>
  <p className="text-2xl font-bold text-white">50</p>
</NavLink>
</div>
{/* Parent Section (Light Red) */}
<div
  className="bg-gradient-to-r from-red-300 to-red-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-parent" // Add this class for highlighting
>
  <NavLink to="/parentlist" className="flex flex-col items-center">
    <FaUserFriends className="text-4xl text-white mb-3" /> {/* Icon for Parents */}
    <h2 className="font-semibold text-xl text-white">Parents</h2>
    <p className="text-gray-200">Total Parents</p>
    <p className="text-2xl font-bold text-white">0</p>
  </NavLink>
</div>

{/* Staff Section (Light Green) */}
<div
  className="bg-gradient-to-r from-green-300 to-green-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-staff" // Add this class for highlighting
>
  <NavLink to="/staffs" className="flex flex-col items-center">
    <FaUsers className="text-4xl text-white mb-3" /> {/* Icon for Staff */}
    <h2 className="font-semibold text-xl text-white">Staffs</h2>
    <p className="text-gray-200">Total Staffs</p>
    <p className="text-2xl font-bold text-white">0</p>
  </NavLink>
</div>
             {/* Subjects Section (Light Yellow) */}
<div
className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-subject" // Add this class for highlighting
>
<NavLink to="/subjectlist" className="flex flex-col items-center">
  <FaBook className="text-4xl text-white mb-3" /> {/* Icon for Subjects */}
  <h2 className="font-semibold text-xl text-white">Subjects</h2>
  <p className="text-gray-200">Total Subjects</p>
  <p className="text-2xl font-bold text-white">10</p>
</NavLink>
</div>
             {/* Classes Section (Light Purple) */}
<div
className="bg-gradient-to-r from-purple-300 to-purple-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-class" // Add this class for highlighting
>
<NavLink to="/classlist" className="flex flex-col items-center">
  <FaBuilding className="text-4xl text-white mb-3" /> {/* Icon for Classes */}
  <h2 className="font-semibold text-xl text-white">Classes</h2>
  <p className="text-gray-200">Total Classes</p>
  <p className="text-2xl font-bold text-white">5</p>
</NavLink>
</div>


           {/* Sections Section (Light Orange) */}
<div
className="bg-gradient-to-r from-orange-300 to-orange-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-section" // Add this class for highlighting
>
<NavLink to="/sections" className="flex flex-col items-center">
  <FaTable className="text-4xl text-white mb-3" /> {/* Icon for Sections */}
  <h2 className="font-semibold text-xl text-white">Sections</h2>
  <p className="text-gray-200">Total Sections</p>
  <p className="text-2xl font-bold text-white">8</p>
</NavLink>
</div>

{/* Lesson Section (Unique Gradient with Modern Touch) */}
<div
  className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-lesson" // Add this class for highlighting
>
  <NavLink to="/lessonlist" className="flex flex-col items-center">
    <FaBook className="text-4xl text-white mb-3" /> {/* Icon for Lesson */}
    <h2 className="font-semibold text-xl text-white">Lesson</h2>
    <p className="text-gray-200">View Lessons</p>
    <p className="text-2xl font-bold text-white">Explore Now</p>
  </NavLink>
</div>

          {/* Holidays Section (Light Green) */}
<div
className="bg-gradient-to-r from-green-300 to-green-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-holidays" // Add this class for highlighting
>
<NavLink to="/holidays" className="flex flex-col items-center">
  <FaRegCalendarAlt className="text-4xl text-white mb-3" /> {/* Icon for Holidays */}
  <h2 className="font-semibold text-xl text-white">Holidays</h2>
  <p className="text-gray-200">Total Holidays</p>
  <p className="text-2xl font-bold text-white">0</p>
</NavLink>
</div>

{/* Fees Record Section (Light Blue) */}
<div
  className="bg-gradient-to-r from-teal-400 to-pink-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-fees" // Add this class for highlighting
>
  <NavLink to="/fees-details" className="flex flex-col items-center">
    <FaDollarSign className="text-4xl text-white mb-3" /> {/* Icon for Fees Record */}
    <h2 className="font-semibold text-xl text-white">Fees Record</h2>
    <p className="text-gray-200">Total Fees Records</p>
    <p className="text-2xl font-bold text-white">0</p>
  </NavLink>
</div>
{/* Routine Section (Unique Gradient with Modern Touch) */}
<div
  className="bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-routine" // Add this class for highlighting
>
  <NavLink to="/classroutinelist" className="flex flex-col items-center">
    <FaRegClock className="text-4xl text-white mb-3" /> {/* Icon for Routine */}
    <h2 className="font-semibold text-xl text-white">Student Routine</h2>
    <p className="text-gray-200">Student Routine</p>
    <p className="text-2xl font-bold text-white">View Routine</p>
  </NavLink>
</div>



            {/* Vehicles Section (Light Teal) */}
<div
className="bg-gradient-to-r from-teal-300 to-teal-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-step-vehicles" // Add this class for highlighting
>
<NavLink to="/bus-tracking" className="flex flex-col items-center">
  <FaCarSide className="text-4xl text-white mb-3" /> {/* Icon for Vehicles */}
  <h2 className="font-semibold text-xl text-white">Vehicles</h2>
</NavLink>
</div>

<div
className="bg-gradient-to-r from-blue-300 to-blue-500 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 intro-meeting with teachers" 
>
<NavLink to="/generateid" className="flex flex-col items-center">
  <FaLaptopCode className="text-4xl text-white mb-3" /> 
  <h2 className="font-semibold text-xl text-white">Meet</h2>
</NavLink>
</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-md mt-6 overflow-hidden intro-step-dashboard-analytics">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Dashboard Analytics</h2>
          <div className="relative w-full h-[300px] sm:h-[400px] overflow-x-auto">
            <canvas ref={chartRef} className="w-full h-full max-w-full" />
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-md mt-6 overflow-hidden intro-step-growth-over-time">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Growth Over Time</h2>
          <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-x-auto">
            <canvas ref={lineChartRef} className="w-full h-full max-w-full" />
          </div>
        </div>
        {/* Notice Board Section */}
        <div className="bg-white p-6 shadow-md mt-28 rounded-md mb-6">
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
          <div className="overflow-x-auto intro-step-notices">
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
                    {/* Fee Summary Section */}
<Box mt={5} style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }} className="intro-step-fee-summary">
<h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Fee Summary</h3>
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Amount Type</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Amount</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {/* Total Paid Amount Row */}
      <TableRow>
        <TableCell>Paid Amount</TableCell>
        <TableCell>Total Amount Paid</TableCell>
        <TableCell>{feeDetails.totalPaid.toLocaleString()}</TableCell>
      </TableRow>
      
      {/* Total Pending Amount Row */}
      <TableRow>
        <TableCell>Pending Amount</TableCell>
        <TableCell>Amount Still Pending</TableCell>
        <TableCell>{feeDetails.totalPending.toLocaleString()}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
</Box>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
