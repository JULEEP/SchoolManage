import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaChalkboardTeacher,
  FaList,
  FaBook,
  FaClipboardCheck,
  FaBullhorn,
  FaSchool,
  FaBus,
  FaChevronDown,
  FaChevronRight,
  FaExclamationCircle
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const StudentSidebar = () => {
  const [isLessonPlanOpen, setLessonPlanOpen] = useState(false);
  const [isDownloadCenterOpen, setDownloadCenterOpen] = useState(false);
  const [isLeaveOpen, setLeaveOpen] = useState(false);
  const [isExaminationsOpen, setExaminationsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isLeavesOpen, setIsLeavesOpen] = useState(false); // New state for Leaves
  const [isComplaintOpen, setIsComplaintOpen] = useState(false); // New state for Leaves



  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  const toggleLessonPlan = () => setLessonPlanOpen((prev) => !prev);
  const toggleDownloadCenter = () => setDownloadCenterOpen((prev) => !prev);
  const toggleLeave = () => setLeaveOpen((prev) => !prev);
  const toggleExaminations = () => setExaminationsOpen((prev) => !prev);
  const toggleLeaves = () => {
    setIsLeavesOpen(!isLeavesOpen);
  };
  const toggleComplaints = () => {
    setIsComplaintOpen(!isComplaintOpen);
  };


  return (
    <div className="w-64 bg-white overflow-y-auto max-h-screen ml-0 rounded-lg shadow-lg">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png"
          alt="Logo"
          className="w-32 h-32 rounded-full"
        />
        {firstName && <h2 className="text-black text-xl mt-4">{firstName}</h2>}
        <hr className="w-full border-t-2 border-gray-300 mt-4" />
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-2">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/student-dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaHome />
            </div>
            <span className="ml-3 text-black">Dashboard</span>
          </NavLink>
        </li>

        {/* Profile */}
        <li>
          <NavLink
            to="/student-profile"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaUser />
            </div>
            <span className="ml-3 text-black">My Profile</span>
          </NavLink>
        </li>

        {/* Class Routine */}
        <li>
          <NavLink
            to="/class-routine"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaChalkboardTeacher />
            </div>
            <span className="ml-3 text-black">Class Routine</span>
          </NavLink>
        </li>

        {/* Lesson Plan */}
        <li>
          <div
            className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={toggleLessonPlan}
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaList />
            </div>
            <span className="ml-3 text-black">Lesson Plan</span>
            {isLessonPlanOpen ? (
              <FaChevronDown className="ml-auto text-black" />
            ) : (
              <FaChevronRight className="ml-auto text-black" />
            )}
          </div>
          {isLessonPlanOpen && (
            <ul className="pl-12 mt-2">
              <li>
                <NavLink
                  to="/student-lessonplan"
                  className="block text-black text-sm py-1 hover:text-blue-500"
                >
                  Lesson Plan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/student-lessonplan-overview"
                  className="block text-black text-sm py-1 hover:text-blue-500"
                >
                  Lesson Plan Overview
                </NavLink>
              </li>
            </ul>
          )}
        </li>

                    {/* Leaves Section */}
      <li>
      <div
        className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100"
        onClick={toggleLeaves}
      >
        <div className="bg-blue-500 text-white p-2 rounded-full">
          <FaList />
        </div>
        <span className="ml-3 text-black">Leaves</span>
        {isLeavesOpen ? (
          <FaChevronDown className="ml-auto text-black" />
        ) : (
          <FaChevronRight className="ml-auto text-black" />
        )}
      </div>
      {isLeavesOpen && (
        <ul className="pl-12 mt-2">
          <li>
            <NavLink
              to="/apply-leave"
              className="block text-black text-sm py-1 hover:text-blue-500"
            >
              Apply Leave
            </NavLink>
          </li>
        </ul>
      )}
    </li>
    {/* complaints Section */}
    <li>
      <div
        className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100"
        onClick={toggleComplaints}
      >
        <div className="bg-red-500 text-white p-2 rounded-full">
          {/* Adding the complaint icon */}
          <FaExclamationCircle />
        </div>
        <span className="ml-3 text-black">My Complaints</span>
        {isComplaintOpen ? (
          <FaChevronDown className="ml-auto text-black" />
        ) : (
          <FaChevronRight className="ml-auto text-black" />
        )}
      </div>
      {isComplaintOpen && (
        <ul className="pl-12 mt-2">
          <li>
            <NavLink
              to="/student-complaint"
              className="block text-black text-sm py-1 hover:text-blue-500"
            >
              My Complaints
            </NavLink>
          </li>
        </ul>
      )}
    </li>
        {/* Homework List */}
        <li>
          <NavLink
            to="/student-homework"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaList />
            </div>
            <span className="ml-3 text-black">Homework List</span>
          </NavLink>
        </li>

        {/* Download Center */}
        <li>
          <div
            className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={toggleDownloadCenter}
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaBook />
            </div>
            <span className="ml-3 text-black">Download Center</span>
            {isDownloadCenterOpen ? (
              <FaChevronDown className="ml-auto text-black" />
            ) : (
              <FaChevronRight className="ml-auto text-black" />
            )}
          </div>
          {isDownloadCenterOpen && (
            <ul className="pl-12 mt-2">
              <li>
                <NavLink
                  to="/student-assignment"
                  className="block text-black text-sm py-1 hover:text-blue-500"
                >
                  Assignment
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/student-syllabus"
                  className="block text-black text-sm py-1 hover:text-blue-500"
                >
                  Syllabus
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Notice Board */}
        <li>
          <NavLink
            to="/student-notice-board"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaBullhorn />
            </div>
            <span className="ml-3 text-black">Notice Board</span>
          </NavLink>
        </li>

        {/* Subjects */}
        <li>
          <NavLink
            to="/student-subject-details"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaSchool />
            </div>
            <span className="ml-3 text-black">Subjects</span>
          </NavLink>
        </li>

        {/* Teachers */}
        <li>
          <NavLink
            to="/student-teacher-list"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaChalkboardTeacher />
            </div>
            <span className="ml-3 text-black">Teachers</span>
          </NavLink>
        </li>

        {/* Transport */}
        <li>
          <NavLink
            to="/student-transport"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaBus />
            </div>
            <span className="ml-3 text-black">Transport</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
