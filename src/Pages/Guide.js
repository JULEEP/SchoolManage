import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaBookOpen,
  FaBus,
  FaCalendarAlt,
  FaChalkboard,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaSchool,
  FaSignInAlt, FaTachometerAlt,
  FaThList,
  FaUserFriends,
  FaUserGraduate,
  FaUserTie
} from "react-icons/fa";

const sections = [
  { 
    title: "Step 1: Logging into the Admin Panel", 
    description: "Go to /admin/login, enter your credentials, and click Login to access the dashboard.", 
    api: "POST /api/admin/login",
    icon: <FaSignInAlt className="text-3xl text-blue-500" />
  },
  { 
    title: "Step 2: Navigating the Dashboard", 
    description: "The dashboard provides an overview of students, teachers, leave requests, and upcoming events.", 
    api: "GET /api/admin/dashboard",
    icon: <FaTachometerAlt className="text-3xl text-blue-500" />
  },
  { 
    title: "Students", 
    description: "Manage student records, add new students, and update their information.",
    icon: <FaUserGraduate className="text-3xl text-blue-500" />
  },
  { 
    title: "Teachers", 
    description: "Add new teachers, edit details, and manage teacher assignments.",
    icon: <FaChalkboardTeacher className="text-3xl text-blue-500" />
  },
  { 
    title: "Parents", 
    description: "View parent details and manage parent-student associations.",
    icon: <FaUserFriends className="text-3xl text-blue-500" />
  },
  { 
    title: "Staffs", 
    description: "Manage school staff records and their roles.",
    icon: <FaUserTie className="text-3xl text-blue-500" />
  },
  { 
    title: "Subjects", 
    description: "Add and manage subjects for different classes.",
    icon: <FaBookOpen className="text-3xl text-blue-500" />
  },
  { 
    title: "Classes", 
    description: "View and organize classes along with assigned subjects and teachers.",
    icon: <FaSchool className="text-3xl text-blue-500" />
  },
  { 
    title: "Sections", 
    description: "Manage sections under different classes.",
    icon: <FaThList className="text-3xl text-blue-500" />
  },
  { 
    title: "Lesson", 
    description: "Explore and update lesson plans for different subjects.",
    icon: <FaChalkboard className="text-3xl text-blue-500" />
  },
  { 
    title: "Holidays", 
    description: "Manage holiday lists and update school calendars.",
    icon: <FaRegCalendarAlt className="text-3xl text-blue-500" />
  },
  { 
    title: "Fees Record", 
    description: "Monitor student fee payments and pending dues.",
    icon: <FaMoneyBillWave className="text-3xl text-blue-500" />
  },
  { 
    title: "Student Routine", 
    description: "View and update student timetables.",
    icon: <FaCalendarAlt className="text-3xl text-blue-500" />
  },
  { 
    title: "Vehicles", 
    description: "Manage transport facilities and assign vehicles.",
    icon: <FaBus className="text-3xl text-blue-500" />
  },
];

export default function AdminGuide() {
  const [currentSection, setCurrentSection] = useState(0);
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: "linear-gradient(135deg, #f0f4ff, #e0d7ff)",
      }}
    >
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative w-full max-w-3xl p-8 bg-white shadow-2xl bg-opacity-95 rounded-2xl">
        {/* Progress Bar */}
        <div className="relative w-full h-3 mb-6 overflow-hidden bg-gray-200 rounded-full">
          <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
        </div>
        {/* Section Header with Icon */}
        <div className="flex items-center space-x-3">
          <div>{sections[currentSection].icon}</div>
          <motion.h2
            className="text-2xl font-bold text-gray-900"
            key={sections[currentSection].title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sections[currentSection].title}
          </motion.h2>
        </div>
        {/* Section Description */}
        <p className="mt-4 text-gray-700">{sections[currentSection].description}</p>
        {/* API Endpoint (if available) */}
        {sections[currentSection].api && (
          <p className="mt-2 text-sm text-gray-500">
            <span className="p-1 font-mono bg-gray-100 rounded">{sections[currentSection].api}</span>
          </p>
        )}
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 0))}
            disabled={currentSection === 0}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Section {currentSection + 1} of {sections.length}
          </span>
          <button
            onClick={() => setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1))}
            disabled={currentSection === sections.length - 1}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
