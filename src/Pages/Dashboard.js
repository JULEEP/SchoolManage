import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from 'axios'; // We'll use axios to make API calls
import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaBook, FaBuilding, FaBus, FaChalkboardTeacher, FaClipboardList, FaFileInvoiceDollar, FaLaptopCode, FaMoneyBillAlt, FaRegCalendarAlt, FaRegClock, FaTable, FaTimes, FaUserFriends, FaUserGraduate, FaUserPlus, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; // For navigation links
import Sidebar from './Sidebar';



import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController, LineElement,
  PieController,
  PointElement,
  Tooltip,
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
          element: ".intro-step-bus-location",
          intro: "This section helps you track bus locations in real-time.",
          position: "top"
        },
        {
          element: ".intro-step-meeting",  
          intro: "This section allows you to manage and schedule meetings.",
          position: "top"
        },
        {
          element: ".intro-step-attendance",
          intro: "This section lets you manage student attendance records.",
          position: "top"
        },
        {
          element: ".intro-step-fee-received",
          intro: "This section shows the total fees received so far.",
          position: "top"
        },
        {
          element: ".intro-step-fee-pending",
          intro: "This section shows the total pending fees.",
          position: "top"
        },
        {
          element: ".intro-step-total-fee",
          intro: "This section shows the total fee amount collected.",
          position: "top"
        },
        {
          element: ".intro-step-add-student",  // Student Section highlight
          intro: "This section allows you to add the student.",
          position: "top"
        },
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
          element: ".intro-step-section",  // Classes Section highlight
          intro: "This section allows you to manage section details.",
          position: "top"
        },
        {
          element: ".intro-step-holidays",  // Holidays Section highlight
          intro: "This section allows you to manage holiday details.",
          position: "top"
        },
        {
          element: ".intro-step-routine",  // Routine Section highlight
          intro: "This section allows you to manage student routines.",
          position: "top"
        },
        {
          element: ".intro-step-start-meeting",  // Vehicles Section highlight
          intro: "This section allows you to start a meeting.",
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

  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalParents: 0,
    totalTeachers: 0,
    totalStaffs: 0,
    totalSubjects: 0,
    totalClasses: 0,
    totalHolidays: 0,
    totalMeetings: 0,
    totalRoutines: 0,
    totalPaid: 0,
    totalPending: 0,
    totalAmount: 0
  });

  // Fetch the dashboard data from the API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-alldashboard');
        setDashboardData(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
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



  // Create and update the chart with real data
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
        labels: ['Students', 'Teachers', 'Parents', 'Staffs', 'Subjects', 'Classes', 'Holidays', 'Meetings'], // Updated labels
        datasets: [
          {
            label: 'Count',
            data: [
              dashboardData.totalStudents,
              dashboardData.totalTeachers,
              dashboardData.totalParents,
              dashboardData.totalStaffs,
              dashboardData.totalSubjects,
              dashboardData.totalClasses,
              dashboardData.totalHolidays,
              dashboardData.totalMeetings
            ], // Use real data here
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
  }, [dashboardData]); // Re-run the chart update when dashboardData changes


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
    <div className="flex min-h-screen bg-gray-100">
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
    <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} h-screen`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 text-white bg-purple-700 shadow-lg lg:hidden">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
  
  

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto bg-gray-100 sm:p-6">
        <div className="font-sans">

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 custom-grid">
        {/* Bus Locations */}
        <div className="w-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg intro-step-bus-location hover:bg-gray-200">
          <NavLink to="/bus-tracking" className="flex flex-col items-center mt-4">
            <FaBus className="mb-2 text-2xl text-green-500" />
            <h4 className="mb-2 text-xs font-semibold text-center text-black sm:text-xl">Bus Locations</h4>
          </NavLink>
        </div>

        {/* Meeting */}
        <div className="w-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg intro-step-meeting hover:bg-gray-200">
          <NavLink to="/managemeeting" className="flex flex-col items-center">
            <FaUsers className="mb-2 text-2xl text-purple-500" />
            <h2 className="mb-2 text-xs text-xl font-semibold text-black sm:text-xl">Meetings</h2>
            <p className="text-xl font-bold text-black">{dashboardData.totalMeetings}</p>
          </NavLink>
        </div>

        {/* Attendance */}
        <div className="w-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg intro-step-attendance hover:bg-gray-200">
          <NavLink to="/studentattendance" className="flex flex-col items-center">
            <FaChalkboardTeacher className="mb-2 text-2xl text-yellow-500" />
            <h2 className="mb-2 text-xs text-xl font-semibold text-black sm:text-xl">Attendance</h2>
            <p className="text-xl font-bold text-black">0</p>
          </NavLink>
        </div>

        {/* Fee Total Received */}
        <div className="w-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg intro-step-fee-received hover:bg-gray-200">
          <NavLink to="/fees-details" className="flex flex-col items-center">
            <FaMoneyBillAlt className="mb-2 text-2xl text-blue-500" />
            <h2 className="mb-2 text-xs text-xl font-semibold text-black sm:text-xl">Fee Received</h2>
            <p className="text-xl font-bold text-black">
              <span className="text-sm text-blue-500">₹</span>{dashboardData.totalPaid}
            </p>
          </NavLink>
        </div>

        {/* Fee Pending */}
        <div className="w-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg intro-step-fee-pending hover:bg-gray-200">
          <NavLink to="/fees-details" className="flex flex-col items-center">
            <FaClipboardList className="mb-2 text-2xl text-red-500" />
            <h2 className="mb-2 text-xs text-xl font-semibold text-black sm:text-xl">Fee Pending</h2>
            <p className="text-xl font-bold text-black">
              <span className="text-sm text-blue-500">₹</span>{dashboardData.totalPending}
            </p>
          </NavLink>
        </div>

        {/* Total Fee */}
        <div className="w-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg intro-step-total-fee hover:bg-gray-200">
          <NavLink to="/fees-details" className="flex flex-col items-center">
            <FaFileInvoiceDollar className="mb-2 text-2xl text-indigo-500" />
            <h2 className="mb-2 text-xs text-xl font-semibold text-black sm:text-xl">Total Fee</h2>
            <p className="text-xl font-bold text-black">
              <span className="text-sm text-blue-500">₹</span>{dashboardData.totalAmount}
            </p>
          </NavLink>
        </div>
      </div>

      <style>
      {`
        @media (min-width: 400px) and (max-width: 700px) {
          .custom-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 6px;
          }
        }
      `}
    </style>
    



            {/* Dashboard Cards */}
            <div className="grid gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 custom-grid">

            <div
            className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-purple-300 to-purple-500 hover:scale-105 intro-step-add-student" // Add this class for highlighting
          >
            <NavLink to="/studentadmission" className="flex flex-col items-center">
            <FaUserPlus className="mb-3 text-4xl text-white" /> {/* Icon for Admission */}
            <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Add A Studnet</h2>
              <p className="text-xs text-gray-200 sm:text-xl">Studnet Form</p>
              </NavLink>
          </div>

              {/* Student Section (Light Blue) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-300 to-blue-500 hover:scale-105 intro-step-student" // Add this class for highlighting
              >
                <NavLink to="/managestudent" className="flex flex-col items-center">
                  <FaUserGraduate className="mb-3 text-4xl text-white" /> {/* Icon for Students */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Students</h2>
                  <p className="text-xs text-gray-200 sm:text-xl">Total Students</p>
                  <p className="text-2xl font-bold text-white">{dashboardData.totalStudents}</p>
                  </NavLink>
              </div>


              {/* Teacher Section (Black) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-black to-gray-800 hover:scale-105 intro-step-teacher" // Add this class for highlighting
              >
                <NavLink to="/teacher" className="flex flex-col items-center">
                  <FaChalkboardTeacher className="mb-3 text-4xl text-white" /> {/* Icon for Teachers */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Teachers</h2>
                  <p className="text-xs text-gray-300 sm:text-xl">Total Teachers</p>
                  <p className="text-xl font-bold text-white">{dashboardData.totalTeachers}</p>
                </NavLink>
              </div>
              {/* Parent Section (Light Red) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-red-300 to-red-500 hover:scale-105 intro-step-parent" // Add this class for highlighting
              >
                <NavLink to="/parentlist" className="flex flex-col items-center">
                  <FaUserFriends className="mb-3 text-4xl text-white" /> {/* Icon for Parents */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Parents</h2>
                  <p className="text-xs text-gray-200 sm:text-xl">Total Parents</p>
                  <p className="text-xl font-bold text-white">{dashboardData.totalParents}</p>
                </NavLink>
              </div>

              {/* Staff Section (Light Green) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-green-300 to-green-500 hover:scale-105 intro-step-staff" // Add this class for highlighting
              >
                <NavLink to="/staffs" className="flex flex-col items-center">
                  <FaUsers className="mb-3 text-4xl text-white" /> {/* Icon for Staff */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Staffs</h2>
                  <p className="text-xs text-gray-200 sm:text-xl">Total Staffs</p>
                  <p className="text-xl font-bold text-white">{dashboardData.totalStaffs}</p>
                </NavLink>
              </div>
              {/* Subjects Section (Light Yellow) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-yellow-300 to-yellow-500 hover:scale-105 intro-step-subject" // Add this class for highlighting
              >
                <NavLink to="/subjectlist" className="flex flex-col items-center">
                  <FaBook className="mb-3 text-4xl text-white" /> {/* Icon for Subjects */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Subjects</h2>
                  <p className="text-xs text-gray-200 sm:text-xl">Total Subjects</p>
                  <p className="text-xl font-bold text-white">{dashboardData.totalSubjects}</p>
                </NavLink>
              </div>
              {/* Classes Section (Light Purple) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-purple-300 to-purple-500 hover:scale-105 intro-step-class" // Add this class for highlighting
              >
                <NavLink to="/classlist" className="flex flex-col items-center">
                  <FaBuilding className="mb-3 text-4xl text-white" /> {/* Icon for Classes */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Classes</h2>
                  <p className="text-xs text-gray-200 sm:text-xl">Total Classes</p>
                  <p className="text-xl font-bold text-white">{dashboardData.totalClasses}</p>
                </NavLink>
              </div>


              {/* Sections Section (Light Orange) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-orange-300 to-orange-500 hover:scale-105 intro-step-section" // Add this class for highlighting
              >
                <NavLink to="/sections" className="flex flex-col items-center">
                  <FaTable className="mb-3 text-4xl text-white" /> {/* Icon for Sections */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Sections</h2>
                  <p className="text-xs text-gray-200 sm:text-xl">Total Sections</p>
                  <p className="text-xl font-bold text-white">8</p>
                </NavLink>
              </div>
              {/* Holidays Section (Light Green) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-green-300 to-green-500 hover:scale-105 intro-step-holidays" // Add this class for highlighting
              >
                <NavLink to="/holidays" className="flex flex-col items-center">
                  <FaRegCalendarAlt className="mb-3 text-4xl text-white" /> {/* Icon for Holidays */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Holidays</h2>
                  <p className="text-xs text-gray-200 sm:text-xl">Total Holidays</p>
                  <p className="text-2xl font-bold text-white">{dashboardData.totalHolidays}</p>
                </NavLink>
              </div>
              {/* Routine Section (Unique Gradient with Modern Touch) */}
              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 hover:scale-105 intro-step-routine" // Add this class for highlighting
              >
                <NavLink to="/classroutinelist" className="flex flex-col items-center">
                  <FaRegClock className="mb-3 text-4xl text-white" /> {/* Icon for Routine */}
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Total Routine</h2>
                  <p className="text-xs text-gray-200 sm:text-xl">Student Routine</p>
                  <p className="text-2xl font-bold text-white">{dashboardData.totalRoutines}</p>

                </NavLink>
              </div>

              <div
                className="p-6 transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-300 to-blue-500 hover:scale-105 intro-step-start-meeting"
              >
                <NavLink to="/generateid" className="flex flex-col items-center">
                  <FaLaptopCode className="mb-3 text-4xl text-white" />
                  <h2 className="text-xs text-xl font-semibold text-white sm:text-xl">Meet</h2>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 mt-6 overflow-hidden bg-white rounded-md shadow-md intro-step-dashboard-analytics">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Dashboard Analytics</h2>
          <div className="relative w-full h-[300px] sm:h-[400px] overflow-x-auto">
            <canvas ref={chartRef} className="w-full h-full max-w-full" />
          </div>
        </div>

        <div className="p-6 mt-6 overflow-hidden bg-white rounded-md shadow-md intro-step-growth-over-time">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Growth Over Time</h2>
          <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-x-auto">
            <canvas ref={lineChartRef} className="w-full h-full max-w-full" />
          </div>
        </div>
        {/* Notice Board Section */}
        <div className="p-6 mb-6 bg-white rounded-md shadow-md mt-28">
          <h2 className="text-xl text-gray-500">Notice Board</h2>

          {/* Button for adding new item */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setFormVisible(true)}
              className="px-4 py-2 text-white transition-colors bg-purple-600 rounded-md hover:bg-purple-700"
            >
              + ADD
            </button>
          </div>

          {/* Modal for form */}
          {formVisible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="w-full p-6 bg-white rounded-lg sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <h3 className="mb-4 text-xl font-semibold">Create Notice</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      placeholder="Class"
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      placeholder="Section"
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                      placeholder="Target Audience"
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      name="postedBy"
                      value={formData.postedBy}
                      onChange={handleInputChange}
                      placeholder="Posted By"
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md"
                      required
                    />
                    <div className="flex justify-end col-span-2 mt-4">
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setFormVisible(false)}
                    className="px-4 py-2 text-sm text-white bg-gray-400 rounded-md hover:bg-gray-500"
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
                  <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">Date</th>
                  <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">Title</th>
                  <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-center text-gray-500">No notices available</td>
                  </tr>
                ) : (
                  notices.map((notice) => (
                    <tr key={notice._id}>
                      <td className="px-4 py-2 border border-gray-300">{notice.date}</td>
                      <td className="px-4 py-2 border border-gray-300">{notice.title}</td>
                      <td className="px-4 py-2 text-center border border-gray-300">
                        <button
                          className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
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
