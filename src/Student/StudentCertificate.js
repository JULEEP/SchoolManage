import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import StudentSidebar from "../Sidebar";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const StudentCertificate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const student = {
    name: "Aryan Sharma",
    class: "10th Grade",
    rollNumber: "23",
    certificateTitle: "Certificate of Excellence",
    awardDetail: "For outstanding performance and dedication to academic success.",
    schoolName: "Greenwood International School",
    issueDate: "February 13, 2025",
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const downloadPDF = () => {
    const input = document.getElementById("studentCertificate");
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const doc = new jsPDF("landscape");
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = doc.internal.pageSize.getWidth() - 20;
      const pageHeight = doc.internal.pageSize.getHeight() - 20;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      if (imgHeight > pageHeight) {
        const scaleFactor = pageHeight / imgHeight;
        doc.addImage(imgData, "PNG", 10, 10, imgWidth * scaleFactor, imgHeight * scaleFactor);
      } else {
        doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      }
      doc.save("Student_Certificate.pdf");
    }).catch(err => console.error("Error generating PDF", err));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`} onClick={toggleSidebar}></div>
      <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <StudentSidebar />
      </div>
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student Certificate</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div id="studentCertificate" className="w-full max-w-4xl bg-white shadow-2xl rounded-xl border border-gray-300 p-10 mx-auto mt-8 text-center border-b-8 border-purple-600 relative" style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.jV7Hh_53SZySlg8FR53I4QHaEK?rs=1&pid=ImgDetMain')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <h2 className="text-3xl font-extrabold text-purple-700 uppercase">{student.certificateTitle}</h2>
          <p className="text-lg text-gray-700 mt-2 italic">This certificate is proudly presented to</p>
          <h2 className="text-4xl font-extrabold text-blue-900 mt-3 underline">{student.name}</h2>
          <p className="text-lg text-gray-600 mt-2 font-medium">Class: {student.class} | Roll No: {student.rollNumber}</p>
          <p className="text-xl text-gray-800 mt-6 font-semibold">{student.awardDetail}</p>
          <div className="mt-6 text-blue-900 font-bold text-lg">
            <p>Issued by: {student.schoolName}</p>
            <p>Issue Date: {student.issueDate}</p>
          </div>
          <div className="mt-10 flex justify-between">
            <p className="border-t-4 border-gray-700 px-6 py-2 text-gray-700 text-lg font-semibold">Principal's Signature</p>
            <p className="border-t-4 border-gray-700 px-6 py-2 text-gray-700 text-lg font-semibold">Class Teacher's Signature</p>
          </div>
        </div>
        <div className="mt-6 w-full text-center sm:text-left mr-8 sm:ml-4">
          <button onClick={downloadPDF} className="px-8 py-3 bg-purple-700 text-white text-lg font-semibold rounded-lg hover:bg-purple-800 transition">
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCertificate;
