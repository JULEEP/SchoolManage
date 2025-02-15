import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ParentSidebar from "./ParentSidebar";

const MyChildExamSchedule = () => {
  const [admitCardData, setAdmitCardData] = useState(null);
  const [examScheduleData, setExamScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const admitCardRef = useRef();

  const studentId = "677904859d0da6e3bee4ba2e";

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // Fetch Admit Card Data
        const admitCardResponse = await fetch(
          `https://school-backend-1-2xki.onrender.com/api/students/get-admit-card/${studentId}`
        );
        const admitCardResult = await admitCardResponse.json();
        if (admitCardResponse.ok) {
          setAdmitCardData(admitCardResult.admitCard);
        } else {
          throw new Error(admitCardResult.message || "Error fetching admit card data");
        }

        // Fetch Exam Schedule Data
        const examScheduleResponse = await fetch(
          `https://school-backend-1-2xki.onrender.com/api/students/get-exam-schedule/${studentId}`
        );
        const examScheduleResult = await examScheduleResponse.json();
        if (examScheduleResponse.ok) {
          setExamScheduleData(examScheduleResult.examSchedule);
        } else {
          throw new Error(examScheduleResult.message || "Error fetching exam schedule data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [studentId]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const downloadPDF = async () => {
    const element = admitCardRef.current;
    const originalOverflow = element.style.overflow;
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;
    element.style.overflow = "visible";
    element.style.width = "1000px";
    element.style.height = "auto";
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      element.style.overflow = originalOverflow;
      element.style.width = originalWidth;
      element.style.height = originalHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Admit_Card.pdf");
    } catch (error) {
      console.error("Error generating the PDF:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`} onClick={toggleSidebar}></div>
      <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <ParentSidebar />
      </div>
      <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Exam Routine</h1>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {admitCardData && (
          <div ref={admitCardRef} className="bg-white shadow-md rounded-xl p-8 my-6">
            <div className="text-center border-b pb-4">
              <h1 className="text-4xl font-bold text-purple-700 mb-2">I Start EduCare</h1>
            </div>
            <div className="text-center my-4">
              <h5 className="text-xl font-bold text-blue-700 mb-1">Admit Card</h5>
              <p className="text-gray-500 text-lg">
                <span className="font-semibold">Student:</span> {admitCardData.studentDetails.name} |
                <span className="font-semibold"> Class:</span> {admitCardData.studentDetails.class}
                <span className="font-semibold"> Section:</span> {admitCardData.studentDetails.section}
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Exam Schedule</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-lg bg-gray-50 text-sm">
                  <thead>
                    <tr className="text-left bg-purple-700 text-white">
                      <th className="py-3 px-4">S.No</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Time</th>
                      <th className="py-3 px-4">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admitCardData.examSchedules.map((exam, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                        <td className="py-3 px-4">{exam.serialNo}</td>
                        <td className="py-3 px-4">{exam.subject}</td>
                        <td className="py-3 px-4">{exam.date}</td>
                        <td className="py-3 px-4">{exam.time}</td>
                        <td className="py-3 px-4">{exam.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <button onClick={downloadPDF} className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-purple-700 transition">
          Download Admit Card
        </button>
      </div>
    </div>
  );
};


export default MyChildExamSchedule;
