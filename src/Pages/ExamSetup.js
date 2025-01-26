import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons

const ExamSetup = () => {
  const [examTitle, setExamTitle] = useState("");
  const [examSystem, setExamSystem] = useState("");
  const [examMark, setExamMark] = useState(0);
  const [markDistributions, setMarkDistributions] = useState([]);
  const [examList, setExamList] = useState([]);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Handle Add Exam Mark Distribution
  const handleAddMarkDistribution = () => {
    if (examTitle && examSystem && examMark !== undefined) {
      const newMarkDistribution = {
        id: markDistributions.length + 1,
        examTitle: examTitle,
        examMark: examMark,
      };
      setMarkDistributions([...markDistributions, newMarkDistribution]);
      setExamTitle("");
      setExamMark(0);
    }
  };

  // Calculate total marks for all distributions
  const calculateTotalMarks = () => {
    return markDistributions.reduce((total, distribution) => total + distribution.examMark, 0);
  };

  // Handle Delete Mark Distribution
  const handleDeleteMarkDistribution = (id) => {
    setMarkDistributions(markDistributions.filter((item) => item.id !== id));
  };

  // Handle Save Exam
  const handleSaveExam = () => {
    const totalMarks = calculateTotalMarks();
    const newExam = {
      id: examList.length + 1,
      examTitle,
      totalMarks,
    };
    setExamList([...examList, newExam]);
    setMarkDistributions([]);  // Clear distributions after saving
  };

  // Filter exams based on search
  const filteredExamList = examList.filter((exam) =>
    exam.examTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-bold">Exam Setup</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Main Form Section */}
        <div className="space-y-4">
          <div className="flex gap-8 flex-wrap">
            {/* Left Side - Add Exam Form */}
            <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded shadow">
              <h2 className="text-lg mb-4 text-gray-600">Add Exam</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Exam System *</label>
                  <select
                    value={examSystem}
                    onChange={(e) => setExamSystem(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                  >
                    <option value="">Select System</option>
                    <option value="Single Exam">Single Exam</option>
                    <option value="Multi Exam">Multi Exam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Exam Title *</label>
                  <input
                    type="text"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter Exam Title"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Exam Mark *</label>
                  <input
                    type="number"
                    value={examMark}
                    onChange={(e) => setExamMark(Number(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter Exam Mark"
                  />
                </div>

                <h3 className="text-md font-medium text-gray-600 mt-6">Add Mark Distributions</h3>
                <div className="space-y-2">
                  {/* Mark Distribution Table */}
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Title"
                      className="border border-gray-300 p-2 rounded w-1/3"
                    />
                    <input
                      type="number"
                      value={examMark}
                      onChange={(e) => setExamMark(Number(e.target.value))}
                      placeholder="Mark"
                      className="border border-gray-300 p-2 rounded w-1/3"
                    />
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteMarkDistribution(examTitle)}
                      title="Delete Exam Distribution"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddMarkDistribution}
                  className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 mt-4"
                >
                  Add Mark Distribution
                </button>

                <div className="mt-4">
                  <strong>Total Marks: </strong> {calculateTotalMarks()}
                </div>

                <button
                  onClick={handleSaveExam}
                  className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-4"
                >
                  Save Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSetup;
