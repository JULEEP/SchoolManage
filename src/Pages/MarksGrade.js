import React, { useState } from "react";
import Sidebar from "./Sidebar";

const MarksGrade = () => {
  const [gradeName, setGradeName] = useState("");
  const [gpa, setGpa] = useState("");
  const [percentFrom, setPercentFrom] = useState("");
  const [percentTo, setPercentTo] = useState("");
  const [gpaFrom, setGpaFrom] = useState("");
  const [gpaTo, setGpaTo] = useState("");
  const [description, setDescription] = useState("");
  const [grades, setGrades] = useState([]);

  const handleSaveGrade = () => {
    // Logic to save grade
    const newGrade = {
      gradeName,
      gpa,
      percentFrom,
      percentTo,
      gpaFrom,
      gpaTo,
      description,
    };
    setGrades([...grades, newGrade]);
    resetForm();
  };

  const resetForm = () => {
    setGradeName("");
    setGpa("");
    setPercentFrom("");
    setPercentTo("");
    setGpaFrom("");
    setGpaTo("");
    setDescription("");
  };

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar /> {/* Sidebar added here */}

    {/* Main Content */}
    <div className="flex-1 p-6 ml-64"> {/* Add ml-64 to shift the content right */}      {/* Title */}      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-700 mb-6">Marks Grade</h1>

      <div className="flex gap-6">
        {/* Left Side Form */}
        <div className="bg-white p-6 rounded-lg shadow-md w-1/3 mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Add Grade</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="gradeName" className="block text-sm text-gray-600 mb-1">
                Grade Name *
              </label>
              <input
                type="text"
                id="gradeName"
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter Grade Name"
              />
            </div>

            <div>
              <label htmlFor="gpa" className="block text-sm text-gray-600 mb-1">
                GPA *
              </label>
              <input
                type="text"
                id="gpa"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter GPA"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="percentFrom" className="block text-sm text-gray-600 mb-1">
                  Percent From *
                </label>
                <input
                  type="number"
                  id="percentFrom"
                  value={percentFrom}
                  onChange={(e) => setPercentFrom(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Percent From"
                />
              </div>

              <div>
                <label htmlFor="percentTo" className="block text-sm text-gray-600 mb-1">
                  Percent To *
                </label>
                <input
                  type="number"
                  id="percentTo"
                  value={percentTo}
                  onChange={(e) => setPercentTo(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Percent To"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gpaFrom" className="block text-sm text-gray-600 mb-1">
                  GPA From *
                </label>
                <input
                  type="number"
                  id="gpaFrom"
                  value={gpaFrom}
                  onChange={(e) => setGpaFrom(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="GPA From"
                />
              </div>

              <div>
                <label htmlFor="gpaTo" className="block text-sm text-gray-600 mb-1">
                  GPA To *
                </label>
                <input
                  type="number"
                  id="gpaTo"
                  value={gpaTo}
                  onChange={(e) => setGpaTo(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="GPA To"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm text-gray-600 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter Description"
              />
            </div>

            <button
              onClick={handleSaveGrade}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 w-full mt-4"
            >
              Save Grade
            </button>
          </div>
        </div>

        {/* Right Side Grade List */}
        <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Grade List</h2>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Search"
            />
          </div>

          {/* Grade List Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">SL</th>
                  <th className="px-4 py-2 text-left">Grade</th>
                  <th className="px-4 py-2 text-left">GPA</th>
                  <th className="px-4 py-2 text-left">Percent (From-To)</th>
                  <th className="px-4 py-2 text-left">GPA (From-To)</th>
                </tr>
              </thead>
              <tbody>
                {grades.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Data Available In Table
                    </td>
                  </tr>
                ) : (
                  grades.map((grade, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{grade.gradeName}</td>
                      <td className="px-4 py-2">{grade.gpa}</td>
                      <td className="px-4 py-2">
                        {grade.percentFrom} - {grade.percentTo}
                      </td>
                      <td className="px-4 py-2">
                        {grade.gpaFrom} - {grade.gpaTo}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {grades.length} entries
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MarksGrade;
