import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import StudentSidebar from "../Sidebar"; // Assuming this is your sidebar component
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const StudentIDCard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const student = {
    name: "Aryan Sharma",
    class: "10th Grade",
    rollNumber: "23",
    schoolName: "Greenwood International School",
    schoolAddress: "123, MG Road, Delhi",
    schoolPhone: "+91 98765 43210",
    photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png", // Replace with actual image URL
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const downloadPDF = () => {
    const input = document.getElementById("studentIDCard");

    // Increasing the scale for better quality
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
        const doc = new jsPDF();

        // Calculate the image width and height to preserve aspect ratio
        const imgData = canvas.toDataURL("image/png");

        // Calculate width and height based on the canvas size and doc page size
        const pageWidth = doc.internal.pageSize.getWidth() - 20; // Page width with padding
        const pageHeight = doc.internal.pageSize.getHeight() - 20; // Page height with padding

        // Preserve the aspect ratio while scaling the image to fit within the page
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // If the image height exceeds the page height, scale down to fit
        if (imgHeight > pageHeight) {
            const scaleFactor = pageHeight / imgHeight;
            doc.addImage(imgData, "PNG", 10, 10, imgWidth * scaleFactor, imgHeight * scaleFactor);
        } else {
            doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        }

        // Save the generated PDF
        doc.save("Student_ID_Card.pdf");
    }).catch(err => {
        console.error("Error generating PDF", err);
    });
};

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <StudentSidebar />
      </div>

      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student ID CARD</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div
          id="studentIDCard"
          className="w-full max-w-[250px] bg-white shadow-lg rounded-2xl border border-gray-300 flex flex-col items-center p-4 border-b-4 border-purple-600 mx-auto mt-4"
          >
          <h2 className="text-lg font-semibold bg-purple-600 text-white w-full max-w-[400px] text-center p-2 rounded-t-2xl">Student ID CARD</h2>
          <div className="w-full flex justify-center my-3">
            <img
              src={student.photo}
              alt="Student Photo"
              className="w-24 h-24 rounded-full border-2 border-gray-400"
            />
          </div>
          <h2 className="text-lg font-semibold text-blue-900">{student.name}</h2>
          <p className="text-gray-600 text-sm">Class: {student.class}</p>
          <p className="text-gray-600 text-sm">Roll No: {student.rollNumber}</p>
          <div className="mt-4 w-full bg-blue-900 p-2 rounded-lg text-center text-white">
            <h3 className="text-sm font-semibold">{student.schoolName}</h3>
          </div>
          <div className="mt-4 text-center text-xs text-blue-900 font-semibold">
            <p>Address: {student.schoolAddress}</p>
            <p>Phone: {student.schoolPhone}</p>
          </div>
        </div>

        {/* Download Button Outside the ID Card Section */}
        <div className="mt-4 w-full text-center sm:text-left mr-8 sm:ml-4">
          <button
            onClick={downloadPDF}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;
