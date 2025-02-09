import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Assuming you have a Sidebar component
import { FaBars, FaTimes } from "react-icons/fa"; // For sidebar toggle

const ClassRoutineCreate = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [routine, setRoutine] = useState([{ day: '', time: '', subject: '', teacher: '' }]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // State for dropdown options
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Routine data to show below the form
  const [routines, setRoutines] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetching class data
        const classResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-classes');
        setClasses(classResponse.data.classes || []);

        // Fetching section data
        const sectionResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-section');
        setSections(sectionResponse.data.sections || []);

        // Fetching subject data
        const subjectResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-subjects-names');
        setSubjects(subjectResponse.data.subjectNames || []);

        // Fetching teacher data
        const teacherResponse = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/teachers');
        const teacherData = teacherResponse.data.map((teacher) => teacher.name);
        setTeachers(teacherData || []);


        setIsDataLoaded(true);
      } catch (error) {
        setError('Error fetching data');
        setIsDataLoaded(true);
      }
    };

    fetchDropdownData();
  }, []);

  const handleClassChange = (e) => {
    const selected = classes.find(cls => cls._id === e.target.value);
    setSelectedClass(selected ? selected.className : '');
  };
  
  const handleSectionChange = (e) => {
    const selected = sections.find(sec => sec._id === e.target.value);
    setSelectedSection(selected ? selected.name : '');
  };
  

  const handleRoutineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRoutine = [...routine];
    updatedRoutine[index][name] = value;
    setRoutine(updatedRoutine);
  };

  const addNewRoutine = () => {
    setRoutine([...routine, { day: '', time: '', subject: '', teacher: '' }]);
  };

  const removeRoutine = (index) => {
    const updatedRoutine = routine.filter((_, i) => i !== index);
    setRoutine(updatedRoutine);
  };

  const fetchRoutineData = async () => {
    try {
      const response = await axios.get('https://school-backend-1-2xki.onrender.com/api/admin/get-routine');
      setRoutines(response.data.routine || []); // Update the routine state
    } catch (error) {
      setError('Error fetching routine data');
    }
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedSection || routine.some(r => !r.day || !r.time || !r.subject || !r.teacher)) {
      setError('Please fill in all fields.');
      setSuccessMessage('');
      return;
    }

    const routineData = {
      class: selectedClass,
      section: selectedSection,
      routine: routine,
    };

    try {
      const response = await fetch('https://school-backend-1-2xki.onrender.com/api/admin/create-routine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routineData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Routine created successfully!');
        setError('');
        fetchRoutineData(); // Fetch the updated routine data
      } else {
        setError(result.message || 'Failed to create routine.');
        setSuccessMessage('');
      }
    } catch (error) {
      setError('An error occurred while creating the routine.');
      setSuccessMessage('');
    }
  };

  useEffect(() => {
    // Fetch routine data when class and section are selected
    if (selectedClass && selectedSection) {
      fetchRoutineData();
    }
  }, [selectedClass, selectedSection]); // Trigger when class or section changes

  // Function to remove routine
  const handleRemoveRoutine = async (routineId) => {
    try {
      const response = await axios.delete(`https://school-backend-1-2xki.onrender.com/api/admin/delete-routine/${routineId}`);
      if (response.status === 200) {
        setSuccessMessage('Routine removed successfully!');
        setError('');
        fetchRoutineData(); // Refresh the routine data after removal
      } else {
        setError('Failed to remove routine.');
      }
    } catch (error) {
      setError('An error occurred while removing the routine.');
      setSuccessMessage('');
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <div className="min-h-screen flex bg-gray-100">
    {/* Sidebar Overlay */}
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
      onClick={toggleSidebar}
    ></div>
  
    {/* Sidebar */}
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <Sidebar />
    </div>
  
    {/* Main Content */}
    <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} h-screen`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
        <h1 className="text-lg font-bold">Studnet Class Routine</h1>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

        <div className="max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg text-gray-700 mb-4">Select Criteria</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Class Dropdown */}
                <div className="w-full sm:w-1/2">
                  <label htmlFor="class" className="block text-sm text-gray-600">Class *</label>
                  <select
                    id="class"
                    name="class"
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls, idx) => (
                      <option key={idx} value={cls._id}>{cls.className}</option>
                    ))}
                  </select>
                </div>

                {/* Section Dropdown */}
                <div className="w-full sm:w-1/2">
                  <label htmlFor="section" className="block text-sm text-gray-600">Section *</label>
                  <select
                    id="section"
                    name="section"
                    value={selectedSection}
                    onChange={handleSectionChange}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Section</option>
                    {sections.map((section, idx) => (
                      <option key={idx} value={section._id}>{section.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Routine Entries */}
              <div>
                {routine.map((r, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-6 mb-4">
                    <div className="w-full sm:w-1/4">
                      <label htmlFor={`day-${index}`} className="block text-sm text-gray-600">Day *</label>
                      <select
                        id={`day-${index}`}
                        name="day"
                        value={r.day}
                        onChange={(e) => handleRoutineChange(index, e)}
                        className="border border-gray-300 rounded-md p-3 w-full"
                        required
                      >
                        <option value="">Select Day</option>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, idx) => (
                          <option key={idx} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full sm:w-1/4">
                      <label htmlFor={`time-${index}`} className="block text-sm text-gray-600">Time *</label>
                      <select
                        id={`time-${index}`}
                        name="time"
                        value={r.time}
                        onChange={(e) => handleRoutineChange(index, e)}
                        className="border border-gray-300 rounded-md p-3 w-full"
                        required
                      >
                        <option value="">Select Time</option>
                        {[
                          "09:00 AM - 09:45 AM", "10:00 AM - 10:45 AM", "11:00 AM - 11:45 AM",
                          "12:00 PM - 12:45 PM", "01:00 PM - 01:45 PM", "02:00 PM - 02:45 PM"
                        ].map((time, idx) => (
                          <option key={idx} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full sm:w-1/4">
                      <label htmlFor={`subject-${index}`} className="block text-sm text-gray-600">Subject *</label>
                      <select
                        id={`subject-${index}`}
                        name="subject"
                        value={r.subject}
                        onChange={(e) => handleRoutineChange(index, e)}
                        className="border border-gray-300 rounded-md p-3 w-full"
                        required
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((subject, idx) => (
                          <option key={idx} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full sm:w-1/4">
                      <label htmlFor={`teacher-${index}`} className="block text-sm text-gray-600">Teacher *</label>
                      <select
                        id={`teacher-${index}`}
                        name="teacher"
                        value={r.teacher}
                        onChange={(e) => handleRoutineChange(index, e)}
                        className="border border-gray-300 rounded-md p-3 w-full"
                        required
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher, idx) => (
                          <option key={idx} value={teacher}>{teacher}</option>
                        ))}
                      </select>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeRoutine(index)}
                      className="mt-4 text-red-500"
                    >
                      Remove Routine
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Routine Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={addNewRoutine}
                  className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Add Another Routine
                </button>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Save Routine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoutineCreate;
