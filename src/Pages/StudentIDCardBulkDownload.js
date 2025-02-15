import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const StudentIDCardBulkDownload = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleCard, setVisibleCard] = useState(null);
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  const studentsData = [
    {
      id: 1,
      name: "Aryan Sharma",
      class: "10th Grade",
      section: "A",
      rollNumber: "23",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 2,
      name: "Priya Gupta",
      class: "10th Grade",
      section: "A",
      rollNumber: "24",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 3,
      name: "Ravi Kumar",
      class: "11th Grade",
      section: "B",
      rollNumber: "12",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 4,
      name: "Aisha Khan",
      class: "12th Grade",
      section: "C",
      rollNumber: "15",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 5,
      name: "Zara Patel",
      class: "10th Grade",
      section: "B",
      rollNumber: "19",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 6,
      name: "Aditya Verma",
      class: "11th Grade",
      section: "A",
      rollNumber: "7",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 7,
      name: "Neha Gupta",
      class: "12th Grade",
      section: "A",
      rollNumber: "21",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 8,
      name: "Siddharth Singh",
      class: "10th Grade",
      section: "C",
      rollNumber: "25",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 9,
      name: "Kiran Reddy",
      class: "11th Grade",
      section: "C",
      rollNumber: "4",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
    {
      id: 10,
      name: "Manisha Singh",
      class: "12th Grade",
      section: "B",
      rollNumber: "9",
      schoolName: "Greenwood International School",
      schoolAddress: "123, MG Road, Delhi",
      schoolPhone: "+91 98765 43210",
      photo: "https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png",
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const downloadSinglePDF = (studentId) => {
    const doc = new jsPDF();
    const input = document.getElementById(`studentIDCard-${studentId}`);
    if (!input) return;

    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = doc.internal.pageSize.getWidth() - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      doc.save(`Student_ID_Card_${studentId}.pdf`);
    }).catch((err) => console.error("Error generating single PDF", err));
  };

  const downloadBulkPDF = () => {
    const doc = new jsPDF();
    setVisibleCard("all");
  
    setTimeout(() => {
      const studentCards = studentsData.map((student) => {
        return new Promise((resolve) => {
          const input = document.getElementById(`studentIDCard-${student.id}`);
          if (!input) return resolve();
  
          html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pageWidth = doc.internal.pageSize.getWidth() - 20;
            const pageHeight = doc.internal.pageSize.getHeight() - 20;
  
            // Calculate aspect ratio
            let imgWidth = pageWidth;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;
  
            // Ensure image height fits within the page height
            if (imgHeight > pageHeight) {
              const scaleFactor = pageHeight / imgHeight;
              imgWidth = imgWidth * scaleFactor;
              imgHeight = pageHeight;
            }
  
            // Add image to PDF
            doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  
            // Add a new page for the next card
            doc.addPage();
            resolve();
          }).catch((err) => console.error("Error generating single PDF", err));
        });
      });
  
      // Wait for all promises to resolve before saving the PDF
      Promise.all(studentCards).then(() => {
        // Remove the last blank page added after the last card
        doc.deletePage(doc.internal.pages.length);
        doc.save("Student_ID_Cards_Bulk.pdf");
        setVisibleCard(null);
      }).catch((err) => console.error("Error generating bulk PDF", err));
    }, 500);
  };
  

  const filteredStudents = studentsData.filter((student) => {
    return (
      (classFilter ? student.class === classFilter : true) &&
      (sectionFilter ? student.section === sectionFilter : true)
    );
  });

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
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
      <div className="flex-grow">
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Student ID Card Bulk Download</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Filters */}
        <div className="mb-4 mt-4">
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="mr-4 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Class</option>
            <option value="10th Grade">10th Grade</option>
            <option value="11th Grade">11th Grade</option>
            {/* Add more class options if needed */}
          </select>
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            {/* Add more section options if needed */}
          </select>
        </div>

        {/* Download Button */}
        <button onClick={downloadBulkPDF} className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
          Download All ID Cards
        </button>

        {/* Display filtered student cards horizontally */}
        <div className="flex flex-wrap justify-start mt-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              id={`studentIDCard-${student.id}`}
              className="w-[250px] h-[400px] bg-white shadow-lg rounded-2xl border border-gray-300 flex flex-col items-center p-4 border-b-4 border-purple-600 mx-2 mb-4"
            >
              <h2 className="text-lg font-semibold bg-purple-600 text-white w-full max-w-[400px] text-center p-2 rounded-t-2xl">Student ID CARD</h2>
              <div className="w-full flex justify-center my-3">
                <img src={student.photo} alt="Student Photo" className="w-24 h-24 rounded-full border-2 border-gray-400" />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentIDCardBulkDownload;
