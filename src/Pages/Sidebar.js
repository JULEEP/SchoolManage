import React, { useState } from "react";
import { FaHome, FaUser, FaWallet, FaList, FaDownload, FaFileAlt, FaPlusCircle, FaChalkboardTeacher, FaBook, FaClipboardCheck, FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa"; // Added icons
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const Sidebar = () => {
  const [isAddItemsOpen, setAddItemsOpen] = useState(false);
  const [isViewRecordsOpen, setViewRecordsOpen] = useState(false);
  const [isModifyEntriesOpen, setModifyEntriesOpen] = useState(false);
  const [isExportDataOpen, setExportDataOpen] = useState(false);
  const [isAssigningSectionOpen, setIsAssigningSectionOpen] = useState(false);


  const toggleAddItems = () => {
    setAddItemsOpen((prev) => !prev);
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
          <div className="flex items-center w-full cursor-pointer" onClick={toggleAddItems}>
            <FaPlusCircle className="mr-3 text-white" />
            <span className="text-white">Add Items</span>
            {isAddItemsOpen ? (
              <FaChevronDown className="ml-2 text-white" />
            ) : (
              <FaChevronRight className="ml-2 text-white" />
            )}
          </div>
          {isAddItemsOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              <li>
                <NavLink
                  to="/add-teacher"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Teacher</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/studentcat"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Student Category</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/studentadmission"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Student</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/staff"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Staff</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-holiday"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Holiday</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/optional-subject"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Optional Subject</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/section"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Section</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/class"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Class</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/subject"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Subject</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/classroom"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Classroom</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/classroutine"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add ClassRoutine</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/updatecontent"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Content</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/lesson"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Lesson</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/topic"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Topic</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/fees"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Fees</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/transport"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Transport Route</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vehicle"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Vehicle</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addexam"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Exam Type</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/examsetup"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Exam Setup</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/examshedule"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Add Exam Schedule</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* View Records Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-700">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleViewRecords}>
            <FaFileAlt className="mr-3 text-white" />
            <span className="text-white">View Records</span>
            {isViewRecordsOpen ? (
              <FaChevronDown className="ml-2 text-white" />
            ) : (
              <FaChevronRight className="ml-2 text-white" />
            )}
          </div>
          {isViewRecordsOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              <li>
                <NavLink
                  to="/teacher"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View Teachers</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/managestudent"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View Students</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/staffs"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View Staff</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/holidays"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View Holidays</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/staffs"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View Staff</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sections"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View Sections</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/classlist"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View Classes</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/subjectlist"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View SubjectList</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contentlist"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View ContentList</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/classroutinelist"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View RoutineList</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/lessonlist"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>View LessonList</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/topiclist"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>TopicList</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/fees-details"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>FessList</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/transportlist"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>TrasportRouteList</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vehiclelist"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>VehicleList</span>
                </NavLink>
              </li>
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

        {/* Modify Entries Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-700">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleModifyEntries}>
            <FaClipboardCheck className="mr-3 text-white" />
            <span className="text-white">Modify Entries</span>
            {isModifyEntriesOpen ? (
              <FaChevronDown className="ml-2 text-white" />
            ) : (
              <FaChevronRight className="ml-2 text-white" />
            )}
          </div>
          {isModifyEntriesOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              <li>
                <NavLink
                  to="/admin-modify-teacher"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Modify Teacher</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-modify-student"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Modify Student</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-modify-staff"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Modify Staff</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Export Data Section */}
        <li className="flex flex-col items-start text-lg p-3 rounded-md hover:bg-gray-700">
          <div className="flex items-center w-full cursor-pointer" onClick={toggleExportData}>
            <FaDownload className="mr-3 text-white" />
            <span className="text-white">Export Data</span>
            {isExportDataOpen ? (
              <FaChevronDown className="ml-2 text-white" />
            ) : (
              <FaChevronRight className="ml-2 text-white" />
            )}
          </div>
          {isExportDataOpen && (
            <ul className="pl-8 space-y-4 mt-2">
              <li>
                <NavLink
                  to="/teacherList"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Export Teachers</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/stuList"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Export Students</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/staffList"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Export Staff</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/marks"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Export Marks</span>
                </NavLink>
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
              <li>
                <NavLink
                  to="/assign-teacher"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Assign Teacher</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/assign-subject"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Assign Subject</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/assignvehicle"
                  className="flex items-center text-sm text-white hover:text-gray-400"
                  activeClassName="bg-gray-700 rounded-full"
                >
                  <span>Assign Vehicle To Driver</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
