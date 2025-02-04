import React, { useState } from "react";
import { FaHome, FaUser, FaWallet, FaList, FaChalkboardTeacher, FaExclamationCircle, FaBook, FaClipboardCheck, FaChevronDown, FaChevronRight, FaVideo } from "react-icons/fa"; // Added icons
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const ParentSidebar = () => {
  const [isParentLessonPlanOpen, setParentLessonPlanOpen] = useState(false);
  const [isParentDownloadCenterOpen, setParentDownloadCenterOpen] = useState(false);
  const [isParentLeaveOpen, setParentLeaveOpen] = useState(false);
  const [isParentChatOpen, setParentChatOpen] = useState(false);
  const [isParentExaminationsOpen, setParentExaminationsOpen] = useState(false);
  const [isParentLibraryOpen, setParentLibraryOpen] = useState(false);

  const toggleParentLibrary = () => {
    setParentLibraryOpen((prev) => !prev);
  };

  const toggleParentExaminations = () => {
    setParentExaminationsOpen((prev) => !prev);
  };

  const toggleParentChat = () => {
    setParentChatOpen((prev) => !prev);
  };

  const toggleParentLeave = () => {
    setParentLeaveOpen((prev) => !prev);
  };

  const toggleParentLessonPlan = () => {
    setParentLessonPlanOpen((prev) => !prev);
  };

  const toggleParentDownloadCenter = () => {
    setParentDownloadCenterOpen((prev) => !prev);
  };

  return (
    <div className="w-64 bg-white overflow-y-auto max-h-screen ml-0 rounded-lg">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png" // Replace with your logo
          alt="Logo"
          className="w-32 h-32 rounded-full"
        />
        <span className="mt-2 text-sky-500 text-lg font-semibold">Parent Dashboard</span>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-4" />

      {/* Sidebar Links */}
      <ul className="space-y-2">
        {/* Dashboard Link */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/parent-dashboard" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaHome className="mr-3 text-purple-600" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* My Children Link */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/mychild-profile" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaUser className="mr-3 text-purple-600" />
            <span>My Children</span>
          </NavLink>
        </li>

        {/* Fees */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/mychild-fees" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaWallet className="mr-3 text-purple-600" />
            <span>Fees</span>
          </NavLink>
        </li>

        {/* Lesson Plan Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-100">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleParentLessonPlan}>
            <FaList className="mr-3 text-purple-600" />
            <span className="text-sky-500">Lesson</span>
            {isParentLessonPlanOpen ? (
              <FaChevronDown className="ml-2 text-purple-600" />
            ) : (
              <FaChevronRight className="ml-2 text-purple-600" />
            )}
          </div>
          {isParentLessonPlanOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              <li>
                <NavLink
                  to="/mychild-lesson-plan"
                  className="flex items-center text-lg text-sky-500 hover:text-sky-400"
                  activeClassName="bg-light-gray rounded-full"
                >
                  <span className="text-xs whitespace-nowrap">Lesson Plan</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Class Routine */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/mychild-routine" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaChalkboardTeacher className="mr-3 text-purple-600" />
            <span>Class Routine</span>
          </NavLink>
        </li>

          {/* My Child Complaints */}
          <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/mychild-complaint" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaExclamationCircle className="mr-3 text-purple-600" />
            <span>Complaints</span>
          </NavLink>
        </li>

        {/* Homework List */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/mychild-homework" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaList className="mr-3 text-purple-600" />
            <span>Homework</span>
          </NavLink>
        </li>

        {/* Student Attendance */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/mychild-attendance" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaClipboardCheck className="mr-3 text-purple-600" />
            <span>Student Attendance</span>
          </NavLink>
        </li>

        {/* Examinations Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-100">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleParentExaminations}>
            <FaList className="mr-3 text-purple-600" />
            <span className="text-sky-500">Examination</span>
            {isParentExaminationsOpen ? (
              <FaChevronDown className="ml-2 text-purple-600" />
            ) : (
              <FaChevronRight className="ml-2 text-purple-600" />
            )}
          </div>
          {isParentExaminationsOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              <li>
                <NavLink
                  to="/mychild-exam-schedules"
                  className="flex items-center text-lg text-sky-500 hover:text-sky-400"
                  activeClassName="bg-light-gray rounded-full"
                >
                  <span className="text-xs whitespace-nowrap">Result</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mychild-exam-schedule"
                  className="flex items-center text-lg text-sky-500 hover:text-sky-400"
                  activeClassName="bg-light-gray rounded-full"
                >
                  <span className="text-xs whitespace-nowrap">Exam Schedule</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Leave Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-100">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleParentLeave}>
            <FaList className="mr-3 text-purple-600" />
            <span className="text-sky-500">Leave</span>
            {isParentLeaveOpen ? (
              <FaChevronDown className="ml-2 text-purple-600" />
            ) : (
              <FaChevronRight className="ml-2 text-purple-600" />
            )}
          </div>
          {isParentLeaveOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              <li>
                <NavLink
                  to="/mychild-leave-apply"
                  className="flex items-center text-lg text-sky-500 hover:text-sky-400"
                  activeClassName="bg-light-gray rounded-full"
                >
                  <span className="text-xs whitespace-nowrap">Apply Leave</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Notice Board */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/parent-noticeboard" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaList className="mr-3 text-purple-600" />
            <span>Notice Board</span>
          </NavLink>
        </li>

        {/* Subjects */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/parent-subjects" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaList className="mr-3 text-purple-600" />
            <span>Subjects</span>
          </NavLink>
        </li>

        {/* Teacher */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/parent-teachers" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaList className="mr-3 text-purple-600" />
            <span>Teacher</span>
          </NavLink>
        </li>

        {/* Library */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-100">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleParentLibrary}>
            <FaList className="mr-3 text-purple-600" />
            <span className="text-sky-500">Library</span>
            {isParentLibraryOpen ? (
              <FaChevronDown className="ml-2 text-purple-600" />
            ) : (
              <FaChevronRight className="ml-2 text-purple-600" />
            )}
          </div>
          {isParentLibraryOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              <li>
                <NavLink
                  to="/parent-booklist"
                  className="flex items-center text-lg text-sky-500 hover:text-sky-400"
                  activeClassName="bg-light-gray rounded-full"
                >
                  <span className="text-xs whitespace-nowrap">Book List</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Transport */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-100">
          <NavLink 
            to="/parent-transport" 
            className="flex items-center text-sky-500 hover:text-sky-400"
            activeClassName="bg-light-gray rounded-full"
          >
            <FaList className="mr-3 text-purple-600" />
            <span>Transport</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ParentSidebar;
