import React, { useState } from 'react';
import ParentSidebar from './ParentSidebar';

const MyChildExamSchedule = () => {
  const [exam, setExam] = useState('');
  const [classType, setClassType] = useState('');
  const [section, setSection] = useState('');
  const [scheduleData, setScheduleData] = useState([
    {
      id: 1,
      examTitle: 'Final Exam',
      class: 'Class 1',
      section: 'A',
      subject: 'Math',
      examDate: '12/20/2024',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    },
    {
      id: 2,
      examTitle: 'Mid-Term Exam',
      class: 'Class 2',
      section: 'B',
      subject: 'Science',
      examDate: '12/22/2024',
      startTime: '11:00 AM',
      endTime: '1:00 PM',
    },
  ]);

  const handleSearch = () => {
    // Handle the search logic here (e.g., filter the table data)
    console.log({ exam, classType, section });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <ParentSidebar /> {/* Sidebar added here */}

      {/* Main Content */}
      <div className="flex-1 ml-4 mt-4"> {/* Add ml-64 to shift the content right */}
        {/* Title */}
        <h1 className="text-xl text-blue-500 font-medium mb-4">Exam Schedule</h1>

        {/* Select Criteria Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex gap-8 mb-4">
            {/* Exam Dropdown */}
            <div className="w-1/3">
              <label htmlFor="exam" className="block text-xs text-gray-600 mb-1">
                Exam *
              </label>
              <select
                id="exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-xs"
              >
                <option value="">Select Exam</option>
                <option value="mid-term">Mid-Term</option>
                <option value="final">Final</option>
                <option value="semester">Semester</option>
              </select>
            </div>

            {/* Class Dropdown */}
            <div className="w-1/3">
              <label htmlFor="class" className="block text-xs text-gray-600 mb-1">
                Class *
              </label>
              <select
                id="class"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-xs"
              >
                <option value="">Select Class</option>
                <option value="class-1">Class 1</option>
                <option value="class-2">Class 2</option>
                <option value="class-3">Class 3</option>
              </select>
            </div>

            {/* Section Dropdown */}
            <div className="w-1/3">
              <label htmlFor="section" className="block text-xs text-gray-600 mb-1">
                Section *
              </label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-xs"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-start">
            <button
              onClick={handleSearch}
              className="bg-purple-500 text-white p-2 rounded text-xs hover:bg-purple-600"
            >
              Search
            </button>
          </div>
        </div>

        {/* Exam Schedule Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xs text-gray-700 font-medium mb-4">Exam Schedule List</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs">SL</th>
                  <th className="px-4 py-2 text-left text-xs">Exam Title</th>
                  <th className="px-4 py-2 text-left text-xs">Class</th>
                  <th className="px-4 py-2 text-left text-xs">Section</th>
                  <th className="px-4 py-2 text-left text-xs">Subject</th>
                  <th className="px-4 py-2 text-left text-xs">Exam Date</th>
                  <th className="px-4 py-2 text-left text-xs">Start Time</th>
                  <th className="px-4 py-2 text-left text-xs">End Time</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((schedule, index) => (
                  <tr key={schedule.id}>
                    <td className="px-4 py-2 text-xs">{index + 1}</td>
                    <td className="px-4 py-2 text-xs">{schedule.examTitle}</td>
                    <td className="px-4 py-2 text-xs">{schedule.class}</td>
                    <td className="px-4 py-2 text-xs">{schedule.section}</td>
                    <td className="px-4 py-2 text-xs">{schedule.subject}</td>
                    <td className="px-4 py-2 text-xs">{schedule.examDate}</td>
                    <td className="px-4 py-2 text-xs">{schedule.startTime}</td>
                    <td className="px-4 py-2 text-xs">{schedule.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination or Entry Count */}
          <div className="mt-4 text-gray-500 text-xs">
            Showing {scheduleData.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChildExamSchedule;