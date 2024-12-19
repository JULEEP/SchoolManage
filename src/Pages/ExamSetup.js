import React, { useState } from "react";
import Sidebar from "./Sidebar";

const ExamSetup = () => {
  const [examTitle, setExamTitle] = useState("");
  const [examSystem, setExamSystem] = useState("");
  const [examMark, setExamMark] = useState(0);
  const [markDistributions, setMarkDistributions] = useState([]);
  const [examList, setExamList] = useState([]);
  const [search, setSearch] = useState("");

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
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar /> {/* Sidebar added here */}

    {/* Main Content */}
    <div className="flex-1 p-6 ml-64"> {/* Add ml-64 to shift the content right */}      {/* Title */}      {/* Title */}
      <h1 className="text-xl text-gray-700 mb-4">Exam Setup</h1>

      <div className="flex gap-8">
        {/* Left Side - Add Exam Form */}
        <div className="w-1/3 bg-gray-50 p-4 rounded shadow">
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

        {/* Right Side - Exam List */}
        <div className="w-2/3">
          <h2 className="text-lg text-gray-600 mb-4">Exam List</h2>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Exam Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-full border border-gray-300 p-2 rounded"
          />

          <div className="overflow-x-auto bg-white shadow-md p-4 rounded-md">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">SL</th>
                  <th className="px-4 py-2 text-left text-gray-600">Exam Title</th>
                  <th className="px-4 py-2 text-left text-gray-600">Class</th>
                  <th className="px-4 py-2 text-left text-gray-600">Section</th>
                  <th className="px-4 py-2 text-left text-gray-600">Subject</th>
                  <th className="px-4 py-2 text-left text-gray-600">Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {filteredExamList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No Data Available In Table
                    </td>
                  </tr>
                ) : (
                  filteredExamList.map((exam, index) => (
                    <tr key={exam.id} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{exam.examTitle}</td>
                      <td className="px-4 py-2">One</td>
                      <td className="px-4 py-2">A</td>
                      <td className="px-4 py-2">Bangla</td>
                      <td className="px-4 py-2">{exam.totalMarks}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 text-gray-500 text-sm">
            Showing {filteredExamList.length} entries
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ExamSetup;
