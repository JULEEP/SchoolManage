import React, { useState } from "react";
import { FaHome, FaUser, FaWallet, FaCog, FaSignOutAlt, FaList, FaDownload, FaFileAlt, FaPlusCircle, FaChalkboardTeacher, FaBook, FaClipboardCheck, FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa"; // Added icons
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify"; // Importing toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importing the toast styles

const Sidebar = () => {
  const [isAddItemsOpen, setIsAddItemsOpen] = useState(false);
  const [isViewRecordsOpen, setViewRecordsOpen] = useState(false);
  const [isModifyEntriesOpen, setModifyEntriesOpen] = useState(false);
  const [isExportDataOpen, setExportDataOpen] = useState(false);
  const [isAssigningSectionOpen, setIsAssigningSectionOpen] = useState(false);
  const [isParentSectionOpen, setIsParentSectionOpen] = useState(false);
  const [isStudentAttendanceOpen, setIsStudentAttendanceOpen] = useState(false);
  const [isStudentPromoteOpen, setIsStudentPromoteOpen] = useState(false);
  const [isStudentHomeworkOpen, setIsStudentHomeworkOpen] = useState(false);
  const [isAssignmentsOpen, setIsAssignmentsOpen] = useState(false); // New state for Assignments




  // State Hooks for Subsections
  const [isTeacherSectionOpen, setIsTeacherSectionOpen] = useState(false);
  const [isStudentSectionOpen, setIsStudentSectionOpen] = useState(false);
  const [isStaffSectionOpen, setIsStaffSectionOpen] = useState(false);
  const [isHolidaySectionOpen, setIsHolidaySectionOpen] = useState(false);
  const [isClassSectionOpen, setIsClassSectionOpen] = useState(false);
  const [isContentSectionOpen, setIsContentSectionOpen] = useState(false);
  const [isFeesSectionOpen, setIsFeesSectionOpen] = useState(false);
  const [isTransportSectionOpen, setIsTransportSectionOpen] = useState(false);
  const [isExamSectionOpen, setIsExamSectionOpen] = useState(false);

  // Define state for each section
  const [isSectionSectionOpen, setIsSectionSectionOpen] = useState(false);
  const [isSubjectSectionOpen, setIsSubjectSectionOpen] = useState(false);
  const [isRoutineSectionOpen, setIsRoutineSectionOpen] = useState(false);
  const [isLessonSectionOpen, setIsLessonSectionOpen] = useState(false);
  const [isTopicSectionOpen, setIsTopicSectionOpen] = useState(false);
  const [isLeaveSectionOpen, setIsLeaveSectionOpen] = useState(false);


  const [isTeacherExportOpen, setIsTeacherExportOpen] = useState(false);
  const [isStudentExportOpen, setIsStudentExportOpen] = useState(false);
  const [isStaffExportOpen, setIsStaffExportOpen] = useState(false);
  const [isMarksExportOpen, setIsMarksExportOpen] = useState(false);

  const [isTeacherAssigningOpen, setIsTeacherAssigningOpen] = useState(false);
  const [isSubjectAssigningOpen, setIsSubjectAssigningOpen] = useState(false);
  const [isVehicleAssigningOpen, setIsVehicleAssigningOpen] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogout = async () => {
    try {
      const response = await axios.post(
        "https://school-backend-1-2xki.onrender.com/api/admin/admin-logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(response.data.message); // Success toast
        navigate("/admin-login"); // Redirect to admin login page
      } else {
        toast.error("Logout failed. Please try again."); // Error toast
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out."); // Error toast
    }
  };




  // Function to toggle the Add Items section
  const toggleAddItems = () => {
    setIsAddItemsOpen(!isAddItemsOpen); // Ensure this matches the useState variable
  };


  const toggleViewRecords = () => {
    setViewRecordsOpen((prev) => !prev);
  };

  const toggleModifyEntries = () => {
    setModifyEntriesOpen((prev) => !prev);
  };

  const toggleExportData = () => {
    setExportDataOpen((prev) => !prev);
  };
  const toggleAssigningSection = () => {
    setIsAssigningSectionOpen(!isAssigningSectionOpen);
  };

  return (
    <div className="w-64 bg-gray-800 overflow-y-auto h-screen">
      {/* Sidebar Links */}
      <ul className="space-y-2">
        {/* Dashboard Link */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-700 mt-8">
          <NavLink
            to="/Admin-dashboard"
            className="flex items-center text-white hover:text-gray-400"
            activeClassName="bg-gray-700 rounded-full"
          >
            <FaHome className="mr-3 text-white" />
            <span>Admin Home</span>
          </NavLink>
        </li>

        {/* Add Items Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-700">
          <div className="flex items-center w-full cursor-pointer" onClick={() => setIsAddItemsOpen(!isAddItemsOpen)}>
            <FaPlusCircle className="mr-3 text-white" />
            <span className="text-white">Add Items</span>
            {isAddItemsOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
          </div>

          {isAddItemsOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              {/* Teachers Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsTeacherSectionOpen(!isTeacherSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Teachers</span>
                  {isTeacherSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isTeacherSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/add-teacher" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Teacher</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Students Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStudentSectionOpen(!isStudentSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Students</span>
                  {isStudentSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStudentSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/studentadmission" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Student Admission</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Staff Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStaffSectionOpen(!isStaffSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Staff</span>
                  {isStaffSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStaffSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/staff" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Staff</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Holidays Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsHolidaySectionOpen(!isHolidaySectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Holidays</span>
                  {isHolidaySectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isHolidaySectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/add-holiday" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Holiday</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Classes Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsClassSectionOpen(!isClassSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Classes</span>
                  {isClassSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isClassSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/class" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Class</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/section" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Section</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/classroom" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Classroom</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/subject" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Subject</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/optional-subject" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Optional Subject</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/classroutine" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Routine</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Content Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsContentSectionOpen(!isContentSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Lession/Topic</span>
                  {isContentSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isContentSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/lesson" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Lesson</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/topic" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Topic</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Fees Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsFeesSectionOpen(!isFeesSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Fees</span>
                  {isFeesSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isFeesSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/fees" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Fees</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Transport Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsTransportSectionOpen(!isTransportSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Transport</span>
                  {isTransportSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isTransportSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/add-driver" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Driver</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/transport" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Transport Route</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/vehicle" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Vehicle</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Exams Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsExamSectionOpen(!isExamSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Exams</span>
                  {isExamSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isExamSectionOpen && (
                  <ul className="pl-4 space-y-2">

                    <li>
                      <NavLink to="/addexam" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Exam</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/examshedule" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Add Exam Schedule</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>


        {/* View Records Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-700">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleViewRecords}>
            <FaFileAlt className="mr-3 text-white" />
            <span className="text-white">View Records</span>
            {isViewRecordsOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
          </div>
          {isViewRecordsOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              {/* Teachers Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsTeacherSectionOpen(!isTeacherSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Teachers</span>
                  {isTeacherSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isTeacherSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/teacher" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Teachers</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Students Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStudentSectionOpen(!isStudentSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Students</span>
                  {isStudentSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStudentSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/managestudent" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Students</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Parents Section */}
              <li>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setIsParentSectionOpen(!isParentSectionOpen)}
                >
                  <span className="text-sm font-semibold text-gray-300">Parents</span>
                  {isParentSectionOpen ? (
                    <FaChevronDown className="ml-2 text-white" />
                  ) : (
                    <FaChevronRight className="ml-2 text-white" />
                  )}
                </div>
                {isParentSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink
                        to="/parentlist"
                        className="flex items-center text-sm text-white hover:text-gray-400"
                      >
                        <span>View Parents</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>


              {/* Staff Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStaffSectionOpen(!isStaffSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Staff</span>
                  {isStaffSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStaffSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/staffs" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Staff</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Holidays Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsHolidaySectionOpen(!isHolidaySectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Holidays</span>
                  {isHolidaySectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isHolidaySectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/holidays" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Holidays</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Sections Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsSectionSectionOpen(!isSectionSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Sections</span>
                  {isSectionSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isSectionSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/sections" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Sections</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Classes Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsClassSectionOpen(!isClassSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Classes</span>
                  {isClassSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isClassSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/classlist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Classes</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Subjects Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsSubjectSectionOpen(!isSubjectSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Subjects</span>
                  {isSubjectSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isSubjectSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/subjectlist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Subject List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Assignments */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsAssignmentsOpen(!isAssignmentsOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Assignments</span>
                  {isAssignmentsOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isAssignmentsOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/assignment" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Assignment List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Student Attendance */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStudentAttendanceOpen(!isStudentAttendanceOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Student Attendance</span>
                  {isStudentAttendanceOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStudentAttendanceOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/studentattendance" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Student Attendance List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Student Promote */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStudentPromoteOpen(!isStudentPromoteOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Student Promote</span>
                  {isStudentPromoteOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStudentPromoteOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/studentpromote" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Promote Student</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Student Homework */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStudentHomeworkOpen(!isStudentHomeworkOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Student Homework</span>
                  {isStudentHomeworkOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStudentHomeworkOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/homeworklist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Student Homework List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Routine Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsRoutineSectionOpen(!isRoutineSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Routine</span>
                  {isRoutineSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isRoutineSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/classroutinelist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Routine List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Lesson Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsLessonSectionOpen(!isLessonSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Lessons</span>
                  {isLessonSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isLessonSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/lessonlist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Lesson List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Topic Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsTopicSectionOpen(!isTopicSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Topics</span>
                  {isTopicSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isTopicSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/topiclist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Topic List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Topic Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsLeaveSectionOpen(!isLeaveSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Leaves</span>
                  {isLeaveSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isLeaveSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/leaves" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Leave List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>


              {/* Fees Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsFeesSectionOpen(!isFeesSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Fees</span>
                  {isFeesSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isFeesSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/fees-details" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Fee List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Transport Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsTransportSectionOpen(!isTransportSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Transport</span>
                  {isTransportSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isTransportSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/driverlist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Drivers</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/transportlist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Transport Routes</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/vehiclelist" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>View Vehicle List</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Transport Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsExamSectionOpen(!isExamSectionOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Exam</span>
                  {isExamSectionOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isExamSectionOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink
                        to="/examtypelist"
                        className="flex items-center text-sm text-white hover:text-gray-400"
                        activeClassName="bg-gray-700 rounded-full"
                      >
                        <span>ExamTypeList</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/examshedulelist"
                        className="flex items-center text-sm text-white hover:text-gray-400"
                        activeClassName="bg-gray-700 rounded-full"
                      >
                        <span>ExamScheduleList</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        {/* Export Data Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-700">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleExportData}>
            <FaDownload className="mr-3 text-white" />
            <span className="text-white">Export Data</span>
            {isExportDataOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
          </div>
          {isExportDataOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              {/* Teachers Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsTeacherExportOpen(!isTeacherExportOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Teachers</span>
                  {isTeacherExportOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isTeacherExportOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/teacherList" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Export Teachers</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Students Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStudentExportOpen(!isStudentExportOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Students</span>
                  {isStudentExportOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStudentExportOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/stuList" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Export Students</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Staff Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsStaffExportOpen(!isStaffExportOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Staff</span>
                  {isStaffExportOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isStaffExportOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/staffList" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Export Staff</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Marks Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsMarksExportOpen(!isMarksExportOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Marks</span>
                  {isMarksExportOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isMarksExportOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/marks" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Export Marks</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>


        {/* Assigning Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-700">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleAssigningSection}>
            <FaPlus className="mr-3 text-white" /> {/* New Icon for Assigning Section */}
            <span className="text-white">Assigning Section</span>
            {isAssigningSectionOpen ? (
              <FaChevronDown className="ml-2 text-white" />
            ) : (
              <FaChevronRight className="ml-2 text-white" />
            )}
          </div>
          {isAssigningSectionOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              {/* Teacher Assignment Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsTeacherAssigningOpen(!isTeacherAssigningOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Teachers</span>
                  {isTeacherAssigningOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isTeacherAssigningOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/assign-teacher" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Assign Teacher</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Subject Assignment Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsSubjectAssigningOpen(!isSubjectAssigningOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Subjects</span>
                  {isSubjectAssigningOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isSubjectAssigningOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/assign-subject" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Assign Subject</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Vehicle Assignment Section */}
              <li>
                <div className="flex items-center cursor-pointer" onClick={() => setIsVehicleAssigningOpen(!isVehicleAssigningOpen)}>
                  <span className="text-sm font-semibold text-gray-300">Vehicles</span>
                  {isVehicleAssigningOpen ? <FaChevronDown className="ml-2 text-white" /> : <FaChevronRight className="ml-2 text-white" />}
                </div>
                {isVehicleAssigningOpen && (
                  <ul className="pl-4 space-y-2">
                    <li>
                      <NavLink to="/assignvehicle" className="flex items-center text-sm text-white hover:text-gray-400">
                        <span>Assign Vehicle To Driver</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* Admin Setting */}
        <li className="flex items-center text-lg p-3 rounded-md hover:bg-gray-700 mt-8">
          <NavLink
            to="/settings"
            className="flex items-center text-white hover:text-gray-400"
            activeClassName="bg-gray-700 rounded-full"
          >
            <FaCog className="mr-3 text-white" />
            <span>Admin Setting</span>
          </NavLink>
        </li>

        <li
          className="flex items-center text-lg p-3 rounded-md hover:bg-gray-700 mt-8 cursor-pointer"
          onClick={handleAdminLogout}
        >
          <FaSignOutAlt className="mr-3 text-white" />
          <span className="text-white hover:text-gray-400">Admin Logout</span>
        </li>
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
