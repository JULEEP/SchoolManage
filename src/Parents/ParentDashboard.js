import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Bar } from "react-chartjs-2"; // Importing Bar chart
import { Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ParentSidebar from "./ParentSidebar";
import subject from "../Images/subject.jpeg";
import teacher from "../Images/teacher.jpeg";
import notice from "../Images/notice.jpeg";
import exam from "../Images/exam.jpeg";
import attendance from "../Images/attendance.jpeg";
import student from "../Images/student.jpeg";

const book = 'https://static.vecteezy.com/system/resources/previews/003/812/674/large_2x/pink-book-closed-free-vector.jpg';
const transport = 'https://static.vecteezy.com/system/resources/previews/002/373/903/large_2x/cartoon-school-bus-with-children-free-vector.jpg';
const fees = 'https://th.bing.com/th/id/R.9e223a9b2c0ef9a333764f8c4a87dbd2?rik=ftPQ%2fejiRTWnHw&riu=http%3a%2f%2f4b.lucknowpublicschool.com%2fimages%2ffees.jpg&ehk=18%2b%2b2uaQnzOeBJRpMqhHoLI18ASFTGhI8lWxGvTEfP4%3d&risl=&pid=ImgRaw&r=0';
const pendingHomework = 'https://th.bing.com/th/id/R.c1a735d2fa8cba39f15d088f3ea069f0?rik=fa6UqGzr2a49ww&riu=http%3a%2f%2fwikiclipart.com%2fwp-content%2fuploads%2f2017%2f09%2fStudent-thinking-students-images-clip-art-clipart-collection.jpg&ehk=bL3ekc6319OyCeNLIQldxn6RYl7IQRc6q2a73cPEnhg%3d&risl=&pid=ImgRaw&r=0';
const queries = 'https://cdn-icons-png.flaticon.com/512/5013/5013104.png';
const holidays = 'https://th.bing.com/th/id/R.afb1e164709a7fa37526f8c4720ec764?rik=RvY3GKnJUEQkWA&riu=http%3a%2f%2fclipartbarn.com%2fwp-content%2fuploads%2f2016%2f10%2fHappy-holidays-holiday-animated-clipart-kid.jpg&ehk=JmTBybzuHIjgczoFTumv%2bSCP5o3VCJJYB98KmZx37QY%3d&risl=&pid=ImgRaw&r=0';
const liveMeeting='https://media.tenor.com/33gJyOCSrIYAAAAj/live.gif'

const bestCategories = [
  { img: subject, name: "Subjects", link: "/parent-subjects" },
  { img: student, name: "Homeworks", link: "/mychild-homework" },
  { img: exam, name: "Exams", link: "/mychild-exam-schedules" },
  { img: teacher, name: "Teachers", link: "/parent-teachers" },
  { img: attendance, name: "Attendance", link: "/mychild-attendance" },
  { img: notice, name: "Notice", link: "/parent-noticeboard" },
  { img: book, name: "Books", link: "/parent-booklist" },
  { img: transport, name: "Transport", link: "/parent-transport" },
  { img: fees, name: "Fees", link: "/mychild-fees" },
  { img: pendingHomework, name: "Pending HW", link: "/mychild-pendingleave" },
  { img: queries, name: "Ask Queries", link: "/ask-queries" },
  { img: holidays, name: "Holidays", link: "/children-holidays" },
  { img: liveMeeting, name: "Live Meetings", link: "/parent-live-meeting" },

];

const ParentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comparisonText, setComparisonText] = useState("");  // State for comparison text
  const [suggestionText, setSuggestionText] = useState("");  // State for suggestion text
  const [transportData, setTransportData] = useState([]);
    const [feeSummary, setFeeSummary] = useState({ totalPaid: 0, totalPending: 0 });
  
  


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
      const fetchTransportData = async () => {
        try {
          const response = await fetch("https://school-backend-1-2xki.onrender.com/api/admin/get-transport-route");
          const data = await response.json();
          // Filter the transport data based on current date
          const currentDate = new Date().toISOString().split('T')[0];
          const filteredRoutes = data.routes.filter(route => route.date.split('T')[0] === currentDate);
          setTransportData(filteredRoutes);
        } catch (error) {
          console.error("Error fetching transport data:", error);
        }
      };
      
      fetchTransportData();
    }, []);

  useEffect(() => {
    // Fetch comparison data
    const fetchComparisonData = async () => {
      try {
        const response = await fetch(
          "https://school-backend-1-2xki.onrender.com/api/parent/my-child-marks/676cf56dfd1eb1caa8426205"
        );
        const data = await response.json();

        if (data.message === "Subject-wise comparison with topper retrieved successfully") {
          const comparisonResult = data.comparisonResult;

          // Prepare data for the chart
          const chartComparisonData = comparisonResult.subjectWiseComparison.map((subjectData) => ({
            subject: subjectData.subject,
            childMarks: subjectData.studentMarks,
            topperMarks: subjectData.topperMarks,
          }));

          // Add overall percentage comparison
          chartComparisonData.unshift({
            subject: "Overall Percentage",
            childMarks: parseFloat(comparisonResult.studentPercentage),
            topperMarks: parseFloat(comparisonResult.topperPercentage),
          });

          setComparisonData(chartComparisonData); // Set the chart data
          setComparisonText(comparisonResult.overallComparison); // Set overall comparison text
          setSuggestionText(comparisonResult.suggestion); // Set suggestion text
          setLoading(false);
        } else {
          setError(data.message || "Error fetching comparison data");
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching comparison data");
        setLoading(false);
      }
    };
    const fetchFeeSummary = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/students/fees-summary/676909bcd20deeaaeca9bc31");
        const data = await response.json();
        setFeeSummary({
          totalPaid: data.totalPaid,
          totalPending: data.totalPending,
        });
      } catch (error) {
        console.error("Error fetching fee summary:", error);
      }
    };

    fetchComparisonData();
    fetchFeeSummary()
  }, []);


  const chartData = comparisonData
    ? {
      labels: comparisonData.map((item) => item.subject),
      datasets: [
        {
          label: "Your Child's Marks",
          data: comparisonData.map((item) => item.childMarks),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Topper's Marks",
          data: comparisonData.map((item) => item.topperMarks),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    }
    : null;

  // Sample data for tables
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 w-64 z-50 md:translate-x-0`}
      >
        <ParentSidebar />
      </div>

      {/* Overlay for Sidebar on Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="p-4 bg-purple-700 text-white shadow-md flex items-center justify-between md:hidden">
          <h1 className="text-lg font-bold">Parent Dashboard</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Content Area */}
        <Container maxWidth="xl" style={{ padding: "20px", marginTop: "12px" }}>
          <h1 className="text-center text-2xl font-bold mb-6">Parent Dashboard</h1>

          {/* Categories Grid */}
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
            {bestCategories.map((category) => (
              <NavLink to={category.link} key={category.name} style={{ textDecoration: "none", padding: "5px" }}>
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
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
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
                    <p style={{ fontWeight: "bold", color: "purple", margin: 0 }}>
                      {category.name}
                    </p>
                  </Box>
                </Box>
              </NavLink>
            ))}
          </Box>

          <Box mt={5} style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
            <h3 className="text-xl font-bold mb-4">Comparison with Topper</h3>
            {loading && <p>Loading chart data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {chartData && (
              <>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Percentage Comparison",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Percentage",
                        },
                      },
                    },
                  }}
                />

                {/* Display percentage above bars */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  {comparisonData.map((item, index) => (
                    <div key={index} style={{ textAlign: "center", margin: "0 10px" }}>
                      <strong>{item.subject}</strong>
                      <div>
                        <span>{item.childMarks}%</span> vs. <span>{item.topperMarks}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Display comparison and suggestion below the graph */}
                <div style={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
                  <p>{comparisonText}</p>
                  <p>{suggestionText}</p>
                </div>
              </>
            )}
          </Box>

          {/* Tables for Parent Dashboard */}
          <Box mt={5}>
            {/* Subjects Table */}
            <Box mb={4} style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }}>
              <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Subjects</h3>
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

            {/* Teachers Table */}
            <Box mb={4} style={{ backgroundColor: "#e6ffe6", padding: "20px", borderRadius: "10px" }}>
              <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Teachers</h3>
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

            {/* Classes Table */}
            <Box style={{ backgroundColor: "#fff3e6", padding: "20px", borderRadius: "10px" }}>
              <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Classes</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Class</TableCell>
                      <TableCell>Teacher</TableCell>
                      <TableCell>Students</TableCell>
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

            {/* Transport Routes Table */}
            <Box style={{ backgroundColor: "#fef3c7", padding: "20px", borderRadius: "10px" }}>
              <h3 style={{ marginBottom: "10px",  fontWeight: "bold" }}>Transport Routes (Today)</h3>
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
                    {transportData.map((route, index) => (
                      route.stops.map((stop, stopIndex) => (
                        <TableRow key={`${index}-${stopIndex}`}>
                          <TableCell>{route.routeTitle}</TableCell>
                          <TableCell>{route.driver.name}</TableCell>
                          <TableCell>{route.driver.mobileNumber}</TableCell>
                          <TableCell>{stop.stopName}</TableCell>
                          <TableCell>{stop.arrivalTime}</TableCell>
                        </TableRow>
                      ))
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
                         {/* Fee Summary Section */}
                      <Box mt={5} style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }}>
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

export default ParentDashboard;
