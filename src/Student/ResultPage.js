import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import StudentSidebar from "../Sidebar";

const ResultPage = () => {
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [examType, setExamType] = useState(""); // New state for exam type
  const marksheetRef = useRef();

  const studentId = "676cf56dfd1eb1caa8426205";

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const url = examType
          ? `https://school-backend-1-2xki.onrender.com/api/students/marks/${studentId}?examType=${examType}`
          : `https://school-backend-1-2xki.onrender.com/api/students/marks/${studentId}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setMarks(data.marks);
        } else {
          setError(data.message || "Error fetching marks");
        }
      } catch (err) {
        setError("An error occurred while fetching marks");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [studentId, examType]); // Re-run when examType changes

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const downloadPDF = async () => {
    const element = marksheetRef.current;

    // Save original styles
    const originalOverflow = element.style.overflow;
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;

    // Temporarily adjust styles for rendering
    element.style.overflow = "visible";
    element.style.width = "1000px"; // A4 size width
    element.style.height = "auto";

    try {
      // Capture the content using html2canvas
      const canvas = await html2canvas(element, { scale: 2 });

      // Restore original styles
      element.style.overflow = originalOverflow;
      element.style.width = originalWidth;
      element.style.height = originalHeight;

      // Convert content to image
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add content image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Add the logo in the top-right corner
      const logoUrl = "https://res.cloudinary.com/dokfnv3vy/image/upload/v1736084543/custom/yhbii0wbedftmpvlpnon.jpg";

      try {
        const response = await fetch(logoUrl, { mode: "cors" }); // Ensure CORS is enabled
        if (!response.ok) {
          throw new Error(`Failed to fetch the logo. Status: ${response.status}`);
        }
        const blob = await response.blob();
        const logoBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        // Logo dimensions
        const logoWidth = 20; // mm
        const logoHeight = 20; // mm

        // Add the logo to the PDF
        pdf.addImage(
          logoBase64,
          "PNG",
          pdfWidth - logoWidth - 10, // Top-right position
          4, // Margin from top
          logoWidth,
          logoHeight
        );
      } catch (logoError) {
        console.error("Error adding the logo to the PDF:", logoError);
      }

      // Save the PDF
      pdf.save("Marksheet.pdf");
    } catch (error) {
      console.error("Error generating the PDF:", error);
    }
  };

  const printMarksheet = async () => {
    const element = marksheetRef.current;
  
    if (!element) {
      console.error("Marksheet element not found!");
      return;
    }
  
    // Adjust styles for better rendering
    const originalOverflow = element.style.overflow;
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;
  
    element.style.overflow = "visible";
    element.style.width = "1000px"; // A4 width
    element.style.height = "auto";
  
    try {
      const canvas = await html2canvas(element, { scale: 2 });
  
      // Restore original styles
      element.style.overflow = originalOverflow;
      element.style.width = originalWidth;
      element.style.height = originalHeight;
  
      const imgData = canvas.toDataURL("image/png");
  
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
        <head>
            <title>Print Marksheet</title>
            <style>
                @media print {
                    body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
                    img { width: 210mm; height: auto; } /* A4 width */
                }
                body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                img { width: 210mm; height: auto; }
            </style>
        </head>
        <body>
            <img src="${imgData}" />
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                };
            </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error("Error generating print view:", error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StudentSidebar />
      </div>

      <div
        className={`flex-grow overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Result</h1>
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4">
          {/* Exam Type Filter */}
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="p-2 rounded border"
          >
            <option value="">All Exams</option>
            <option value="midTerm">MidTerm</option>
            <option value="Final">Final</option>
            {/* Add other exam types here */}
          </select>
        </div>

        {marks && (
          <div
            ref={marksheetRef}
            className="bg-white shadow-md rounded-xl p-8 my-6"
          >
            <div className="text-center border-b pb-4">
              <h1 className="text-3xl font-bold text-purple-700">I Start School</h1>
              <p className="text-gray-500">Academic Year: 2023-24</p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-700 mb-4">
                Student Details
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <strong>Name:</strong> {marks.student.firstName}{" "}
                  {marks.student.lastName}
                </p>
                <p>
                  <strong>Class:</strong> {marks.student.class}{" "}
                  {marks.student.section}
                </p>
                <p>
                  <strong>Roll:</strong> {marks.student.roll}
                </p>
                <p>
                  <strong>Father's Name:</strong> {marks.student.fatherName}
                </p>
                <p>
                  <strong>Mother's Name:</strong> {marks.student.motherName}
                </p>
                <p>
                  <strong>Overall Percentage:</strong>{" "}
                  {marks.overallPercentage}%
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      marks.overallStatus === "Pass"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {marks.overallStatus}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">
                Subject Results
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-lg bg-gray-50 text-sm">
                  <thead>
                    <tr className="text-left bg-purple-700 text-white">
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Marks Obtained</th>
                      <th className="py-3 px-4">Total Marks</th>
                      <th className="py-3 px-4">Percentage</th>
                      <th className="py-3 px-4">Grade</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.subjects.map((subject, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <td className="py-3 px-4">{subject.subject}</td>
                        <td className="py-3 px-4">{subject.marksObtained}</td>
                        <td className="py-3 px-4">{subject.totalMarks}</td>
                        <td className="py-3 px-4">{subject.percentage}%</td>
                        <td className="py-3 px-4">{subject.grade}</td>
                        <td className="py-3 px-4">
                          <span
                            className={
                              subject.status === "Pass"
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {subject.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={downloadPDF}
          className="bg-purple-600 text-white px-3 py-1 text-sm rounded-md shadow-lg hover:bg-purple-700 transition"
        >
          Download
        </button>
        <button
          onClick={printMarksheet}
          className="bg-green-600 text-white px-3 py-1 text-sm rounded-md shadow-lg hover:bg-green-700 transition"
        >
          Print
        </button>
      </div>
      
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ResultPage;
