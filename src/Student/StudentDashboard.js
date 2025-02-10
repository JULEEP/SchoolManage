import { driver } from "driver.js";

import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "@mui/material"; // ✅ Add this line
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for sidebar toggle
import { Link } from "react-router-dom"; // For navigation
import StudentSidebar from "../Sidebar";
import IntroJs from "intro.js";
import "intro.js/introjs.css"; // Intro.js CSS import

// Importing images

const book = "https://media1.tenor.com/images/107e39e6cccecb07771733a383291bd9/tenor.gif?itemid=12632259";
const transport = "https://i.gifer.com/Wdf9.gif";
const routine = 'https://www.bing.com/th/id/OGC.59346b4b5c80cc5cf0c483a27dfdcb36?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f1129235%2fscreenshots%2f3344482%2fgif03.gif&ehk=681MYbrM%2fq597jBw5ssf54CgRSsfohettd%2fV%2fTKmT%2bs%3d';
const result = 'https://www.bing.com/th/id/OGC.f536b251e81ef82960690777ee76d243?pid=1.7&rurl=https%3a%2f%2fi.pinimg.com%2foriginals%2f80%2f04%2fe7%2f8004e78d9a4d63d94f3cff837e27790c.gif&ehk=CismETbhBNRq0HUnf6OoZs2GFprNe%2fl7vs6XwOpk%2bTY%3d';
const subject = 'https://media.baamboozle.com/uploads/images/398004/1652344734_36162_gif-url.gif';
const teacher = 'https://cdn.pixabay.com/animation/2022/11/13/07/16/07-16-26-181_512.gif';
const homework = 'https://cdn.dribbble.com/users/4241563/screenshots/11874468/lottie-santi-daksa-project03.gif';
const notice = 'https://i.pinimg.com/originals/fb/11/55/fb1155591460c455edf3ced130b127b9.gif';
const exam = 'https://cdn.dribbble.com/users/957210/screenshots/2475142/untitled-2.gif';
const attendance = 'https://cdn.dribbble.com/users/1244169/screenshots/4494753/attendance_final.gif';
const fee = 'https://cdn-icons-gif.flaticon.com/9908/9908553.gif';
const holidays = 'https://media.tenor.com/KnM_tzEvCrQAAAAC/holiday-season.gif';
const liveClass = 'https://cdn.dribbble.com/users/1681709/screenshots/4735856/gif.gif'

const bestCategories = [
  { img: subject, name: "Subjects", link: "/student-subject-details" },
  { img: homework, name: "Homeworks", link: "/student-homework" },
  { img: exam, name: "Exams", link: "/student-exam-routine" },
  { img: teacher, name: "Teachers", link: "/student-teacher-list" },
  { img: attendance, name: "Attendance", link: "/student-attendance" },
  { img: notice, name: "Notice", link: "/student-notice-board" },
  { img: book, name: "Books", link: "/student-booklist" },
  { img: transport, name: "Transport", link: "/studentbus-tracking" },
  { img: routine, name: "Routines", link: "/class-routine" },
  { img: result, name: "Results", link: "/student-result" },
  { img: fee, name: "My Fees", link: "/student-fees" },
  { img: holidays, name: "Holidays", link: "/student-holidays" },
  { img: liveClass, name: "Live Class", link: "/live-class" },
];



const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transportData, setTransportData] = useState([]);
  const [feeSummary, setFeeSummary] = useState({ totalPaid: 0, totalPending: 0 });







  useEffect(() => {
    // Initialize Intro.js to highlight all grid sections and tables
    const intro = IntroJs();

    intro.setOptions({
      steps: [
        ...bestCategories.map((category, index) => ({
          element: `.category-box-${index}`, // Dynamic class for each category box
          intro: `This is the ${category.name} section.`,
        })),
        {
          element: '.intro-step-1',
          intro: 'Here are the subjects table.',
        },
        {
          element: '.intro-step-2',
          intro: 'This is the teachers table.',
        },
        {
          element: '.intro-step-3',
          intro: 'This is the classes table.',
        },
        {
          element: '.intro-step-4',
          intro: 'This is the transport routes table.',
        },
        {
          element: '.intro-step-5',
          intro: 'This is the fee summary table.',
        },
      ],
      highlightClass: 'rounded', // Add rounded corners for highlights
      nextLabel: 'Next', // Set Next button label
      prevLabel: 'Previous', // Set Previous button label
      overlayOpacity: 0.8, // Set overlay opacity to make it less harsh
    });

    // Customizing highlight styles directly for purple background and white text
    intro.onbeforechange(() => {
      const highlightElements = document.querySelectorAll('.introjs-overlay');
      highlightElements.forEach(el => {
        el.style.backgroundColor = 'purple';
        el.style.color = 'white';
      });
    });

    // Start the intro guide after component mounts
    intro.start();
  }, []);





  useEffect(() => {
    const fetchTransportData = async () => {
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-transport-route");
        const data = await response.json();

        // Log the full data to check its structure
        console.log(data);

        // Ensure 'data.routes' exists and is an array
        if (data.routes && Array.isArray(data.routes)) {
          // Get today's date in 'YYYY-MM-DD' format
          const currentDate = new Date().toISOString().split('T')[0];
          console.log("Current Date:", currentDate);

          // Filter the transport data based on current date
          const filteredRoutes = data.routes.filter(route => {
            // Extract the date part from the route's date field
            const routeDate = route.date.split('T')[0];
            return routeDate === currentDate;
          });

          // Log the filtered routes to check if filtering is working
          console.log("Filtered Routes:", filteredRoutes);

          // Set the transport data state with filtered routes
          setTransportData(filteredRoutes);
        } else {
          console.error("No routes data found or data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching transport data:", error);
      }
    };

    const fetchFeeSummary = async () => {
      try {
        const response = await fetch("https://school-backend-1-2xki.onrender.com/api/students/fees-summary/676909bcd20deeaaeca9bc31");
        const data = await response.json();
        setFeeSummary({
          totalPaid: data.totalPaid,
          totalPending: data.totalPending,
        });
      } catch (error) {
        console.error("Error fetching fee summary:", error);
      }
    };

    fetchFeeSummary()
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const subjectsData = [
    { name: "Math", teacher: "Mr. Smith", time: "9:00 AM" },
    { name: "Science", teacher: "Ms. Johnson", time: "10:00 AM" },
    { name: "History", teacher: "Mr. Brown", time: "11:00 AM" },
  ];

  const teachersData = [
    { name: "Mr. Smith", subject: "Math", contact: "9876543210" },
    { name: "Ms. Johnson", subject: "Science", contact: "1234567890" },
    { name: "Mr. Brown", subject: "History", contact: "4567891230" },
  ];

  const classesData = [
    { className: "Math 101", teacher: "Mr. Smith", students: "30" },
    { className: "Science 102", teacher: "Ms. Johnson", students: "25" },
    { className: "History 103", teacher: "Mr. Brown", students: "28" },
  ];

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
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} h-screen`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Dashboard</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Content Area */}
        <Container
          maxWidth="xl"
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#add8e6", // Light blue color
            marginTop: "12px",
          }}
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(7, 1fr)"
            gap="5px"
            justifyItems="center"
            sx={{
              "@media (max-width: 1200px)": { gridTemplateColumns: "repeat(4, 1fr)" },
              "@media (max-width: 900px)": { gridTemplateColumns: "repeat(3, 1fr)" },
              "@media (max-width: 600px)": { gridTemplateColumns: "repeat(2, 1fr)" },
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {bestCategories.map((category, index) => (
              <Box key={category.name} style={{ padding: "5px" }}>
                <Link to={category.link} style={{ textDecoration: "none" }}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                      backgroundColor: "#add8e6",
                      marginTop: "12px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    className={`category-box-${index}`} // Added dynamic class based on the index
                  >
                    <img
                      src={category.img}
                      alt={category.name}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                    <Box
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "4px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ fontWeight: "bold", color: "black", margin: 0 }}>
                        {category.name}
                      </p>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>

          {/* Tables Section */}
          <Box mt={5}>
            <Box mb={4} style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }} className="intro-step-1">
              <h3 style={{ fontWeight: "bold" }}>Subjects</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell>Teacher</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subjectsData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.teacher}</TableCell>
                        <TableCell>{row.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box mb={4} style={{ backgroundColor: "#e6ffe6", padding: "20px", borderRadius: "10px" }} className="intro-step-2">
              <h3 style={{ fontWeight: "bold" }}>Teachers</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Contact</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachersData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{row.contact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box mb={4} style={{ backgroundColor: "#fff3e6", padding: "20px", borderRadius: "10px" }} className="intro-step-3">
              <h3 style={{ fontWeight: "bold" }}>Classes</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Class Name</TableCell>
                      <TableCell>Teacher</TableCell>
                      <TableCell>Number of Students</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {classesData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.className}</TableCell>
                        <TableCell>{row.teacher}</TableCell>
                        <TableCell>{row.students}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box mb={4} style={{ backgroundColor: "#fff3e6", padding: "20px", borderRadius: "10px" }} className="intro-step-4">
              <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Transport Routes (Today)</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Route</TableCell>
                      <TableCell>Driver</TableCell>
                      <TableCell>Driver's Number</TableCell>
                      <TableCell>Stop Name</TableCell>
                      <TableCell>Arrival Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transportData.length > 0 ? (
                      transportData.map((route, index) =>
                        route.stops.map((stop, stopIndex) => (
                          <TableRow key={`${route._id}-${stopIndex}`}>
                            <TableCell>{route.routeTitle}</TableCell>
                            <TableCell>{route.driver.name}</TableCell>
                            <TableCell>{route.driver.mobileNumber}</TableCell>
                            <TableCell>{stop.stopName}</TableCell>
                            <TableCell>{stop.arrivalTime}</TableCell>
                          </TableRow>
                        ))
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} style={{ textAlign: "center" }}>
                          No transport routes available for today.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Fee Summary Section */}
            <Box className="intro-step-fee-summary" mt={5} style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }}>
              <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Fee Summary</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Total Paid</TableCell>
                      <TableCell>Total Pending</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{feeSummary.totalPaid}</TableCell>
                      <TableCell>{feeSummary.totalPending}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;








