import React, { useState } from "react";
import {
  FaHome,
  FaBook,
  FaUserGraduate,
  FaClipboardList,
  FaTasks,
  FaChalkboardTeacher,
  FaBell,
  FaCalendarAlt,
  FaEnvelope,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
  FaUsers, // For Students icon
  FaRegCalendarCheck, // For Leaves icon
} from "react-icons/fa"; // Icons from react-icons
import { NavLink } from "react-router-dom";

const TeacherSidebar = () => {
  const [isExamsOpen, setExamsOpen] = useState(false);
  const [isHomeworkOpen, setHomeworkOpen] = useState(false);

  const toggleExams = () => setExamsOpen((prev) => !prev);
  const toggleHomework = () => setHomeworkOpen((prev) => !prev);

  return (
    <div className="w-64 bg-black text-white overflow-y-auto h-screen rounded-lg fixed">
      {/* Logo Section */}
      <div className="flex items-center justify-center p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Teacher Panel</h1>
      </div>

      {/* Sidebar Navigation */}
      <ul className="space-y-0 p-4">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/teacher-dashboard"
            className="flex items-center text-lg text-gray-400 p-3 rounded-md hover:bg-gray-800"
            activeClassName="bg-gray-700"
          >
            <FaHome className="mr-3" />
            Dashboard
          </NavLink>
        </li>

        {/* Attendance */}
        <li>
          <NavLink
            to="/teacher-attendance"
            className="flex items-center text-lg text-gray-400 p-3 rounded-md hover:bg-gray-800"
            activeClassName="bg-gray-700"
          >
            <FaClipboardList className="mr-3" />
            Attendance
          </NavLink>
        </li>

        {/* Homework */}
        <li className="flex flex-col items-start">
          <div
            className="flex items-center cursor-pointer p-3 rounded-md text-lg text-gray-400 hover:bg-gray-800"
            onClick={toggleHomework}
          >
            <FaTasks className="mr-3" />
            Homework
            {isHomeworkOpen ? (
              <FaChevronDown className="ml-auto" />
            ) : (
              <FaChevronRight className="ml-auto" />
            )}
          </div>
          {isHomeworkOpen && (
            <ul className="pl-8">
              <li>
                <NavLink
                  to="/teacher-homework"
                  className="block text-gray-400 p-2 text-sm hover:bg-gray-700 rounded-md"
                  activeClassName="bg-gray-700"
                >
                  Assigned Homework
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teacher-homeworklist"
                  className="block text-gray-400 p-2 text-sm hover:bg-gray-700 rounded-md"
                  activeClassName="bg-gray-700"
                >
                  Review Homework
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Exams */}
        <li className="flex flex-col items-start">
          <div
            className="flex items-center cursor-pointer p-3 rounded-md text-lg text-gray-400 hover:bg-gray-800"
            onClick={toggleExams}
          >
            <FaChalkboardTeacher className="mr-3" />
            Exams
            {isExamsOpen ? (
              <FaChevronDown className="ml-auto" />
            ) : (
              <FaChevronRight className="ml-auto" />
            )}
          </div>
          {isExamsOpen && (
            <ul className="pl-8">
              <li>
                <NavLink
                  to="/teacher-exam-schedule"
                  className="block text-gray-400 p-2 text-sm hover:bg-gray-700 rounded-md"
                  activeClassName="bg-gray-700"
                >
                  Exam Schedule
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Class Routine */}
        <li>
          <NavLink
            to="/teacher-classroutine"
            className="flex items-center text-lg text-gray-400 p-3 rounded-md hover:bg-gray-800"
            activeClassName="bg-gray-700"
          >
            <FaCalendarAlt className="mr-3" />
            Routine
          </NavLink>
        </li>

        {/* Notice Board */}
        <li>
          <NavLink
            to="/teacher-noticeboard"
            className="flex items-center text-lg text-gray-400 p-3 rounded-md hover:bg-gray-800"
            activeClassName="bg-gray-700"
          >
            <FaBell className="mr-3" />
            Notice Board
          </NavLink>
        </li>

        {/* My Leaves */}
        <li>
          <NavLink
            to="/teacher-leave"
            className="flex items-center text-lg text-gray-400 p-3 rounded-md hover:bg-gray-800"
            activeClassName="bg-gray-700"
          >
            <FaRegCalendarCheck className="mr-3" />
            My Leaves
          </NavLink>
        </li>

          {/* My Meetings */}
          <li>
          <NavLink
            to="/teacher-meetings"
            className="flex items-center text-lg text-gray-400 p-3 rounded-md hover:bg-gray-800"
            activeClassName="bg-gray-700"
          >
            <FaRegCalendarCheck className="mr-3" />
            My Meeting
          </NavLink>
        </li>


        {/* All Students */}
        <li>
          <NavLink
            to="/teacher-students"
            className="flex items-center text-lg text-gray-400 p-3 rounded-md hover:bg-gray-800"
            activeClassName="bg-gray-700"
          >
            <FaUsers className="mr-3" />
            All Students
          </NavLink>
        </li>

        {/* Logout */}
        <li>
          <NavLink
            to="/logout"
            className="flex items-center text-lg text-gray-400 p-3 rounded-md hover:bg-gray-800"
            activeClassName="bg-gray-700"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;
