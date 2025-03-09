import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import Sidebar component
import { FaBars, FaTimes } from 'react-icons/fa'; // Mobile sidebar toggle icons
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

const AddStaffForm = () => {
    const [staffData, setStaffData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        gender: 'Male',
        dateOfBirth: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
        },
        joiningDate: '',
        salary: '',
        employeeId: '',
        emergencyContact: {
            name: '',
            relation: '',
            phone: ''
        },
        profilePicture: '',
        qualifications: [''],
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // To handle sidebar toggle

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address')) {
            const fieldName = name.split('.')[1];
            setStaffData((prevData) => ({
                ...prevData,
                address: { ...prevData.address, [fieldName]: value }
            }));
        } else if (name.includes('emergencyContact')) {
            const fieldName = name.split('.')[1];
            setStaffData((prevData) => ({
                ...prevData,
                emergencyContact: { ...prevData.emergencyContact, [fieldName]: value }
            }));
        } else {
            setStaffData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/add-staff', staffData);
            toast.success('Staff added successfully!'); // Success Toast
            console.log(response.data);

            // Reset the form fields after successful submission
            setStaffData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                position: '',
                department: '',
                gender: 'Male',
                dateOfBirth: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: ''
                },
                joiningDate: '',
                salary: '',
                employeeId: '',
                emergencyContact: {
                    name: '',
                    relation: '',
                    phone: ''
                },
                profilePicture: '',
                qualifications: [''],
            });
        } catch (error) {
            toast.error('Error adding staff'); // Error Toast
            console.error(error);
        }
    };

    const handleQualificationChange = (index, value) => {
        const updatedQualifications = [...staffData.qualifications];
        updatedQualifications[index] = value;
        setStaffData({ ...staffData, qualifications: updatedQualifications });
    };

    const addQualification = () => {
        setStaffData({ ...staffData, qualifications: [...staffData.qualifications, ''] });
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Mobile Header */}
                <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
                    <h1 className="text-lg font-bold">Add Staff</h1>
                    <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Main Form Area */}
                <div className="bg-white p-6 rounded-md shadow-md mb-8 w-full max-w-5xl mt-8">
                    <h2 className="text-xl text-purple-600 text-center mb-8">Add Staff Member</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {/* Basic Information (4 fields per row) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="text-sm text-gray-600">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={staffData.firstName}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="text-sm text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={staffData.lastName}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={staffData.email}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-sm text-gray-600">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={staffData.phone}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                        </div>

                        {/* Position, Department, Gender, and DOB (4 fields per row) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="position" className="text-sm text-gray-600">Position</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={staffData.position}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="department" className="text-sm text-gray-600">Department</label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={staffData.department}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="text-sm text-gray-600">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={staffData.gender}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth" className="text-sm text-gray-600">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={staffData.dateOfBirth}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                        </div>

                        {/* Joining Date, Salary, Employee ID, Profile Picture (4 fields per row) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="joiningDate" className="text-sm text-gray-600">Joining Date</label>
                                <input
                                    type="date"
                                    id="joiningDate"
                                    name="joiningDate"
                                    value={staffData.joiningDate}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="salary" className="text-sm text-gray-600">Salary</label>
                                <input
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    value={staffData.salary}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="employeeId" className="text-sm text-gray-600">Employee ID</label>
                                <input
                                    type="text"
                                    id="employeeId"
                                    name="employeeId"
                                    value={staffData.employeeId}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="profilePicture" className="text-sm text-gray-600">Profile Picture URL</label>
                                <input
                                    type="text"
                                    id="profilePicture"
                                    name="profilePicture"
                                    value={staffData.profilePicture}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                        </div>

                        {/* Address (4 fields per row) */}
                        <div>
                            <h3 className="text-lg font-semibold">Address</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="address.street" className="text-sm text-gray-600">Street</label>
                                    <input
                                        type="text"
                                        id="address.street"
                                        name="address.street"
                                        value={staffData.address.street}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address.city" className="text-sm text-gray-600">City</label>
                                    <input
                                        type="text"
                                        id="address.city"
                                        name="address.city"
                                        value={staffData.address.city}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address.state" className="text-sm text-gray-600">State</label>
                                    <input
                                        type="text"
                                        id="address.state"
                                        name="address.state"
                                        value={staffData.address.state}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address.zipCode" className="text-sm text-gray-600">Zip Code</label>
                                    <input
                                        type="text"
                                        id="address.zipCode"
                                        name="address.zipCode"
                                        value={staffData.address.zipCode}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div>
                            <h3 className="text-lg font-semibold">Emergency Contact</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="emergencyContact.name" className="text-sm text-gray-600">Name</label>
                                    <input
                                        type="text"
                                        id="emergencyContact.name"
                                        name="emergencyContact.name"
                                        value={staffData.emergencyContact.name}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="emergencyContact.relation" className="text-sm text-gray-600">Relation</label>
                                    <input
                                        type="text"
                                        id="emergencyContact.relation"
                                        name="emergencyContact.relation"
                                        value={staffData.emergencyContact.relation}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="emergencyContact.phone" className="text-sm text-gray-600">Phone</label>
                                    <input
                                        type="text"
                                        id="emergencyContact.phone"
                                        name="emergencyContact.phone"
                                        value={staffData.emergencyContact.phone}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Qualifications */}
                        <div>
                            <h3 className="text-lg font-semibold">Qualifications</h3>
                            {staffData.qualifications.map((qualification, index) => (
                                <div key={index} className="flex items-center gap-4 mb-4">
                                    <input
                                        type="text"
                                        value={qualification}
                                        onChange={(e) => handleQualificationChange(index, e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={addQualification}
                                        className="text-purple-600"
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-full">
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700"
                            >
                                Add Staff
                            </button>
                        </div>
                    </form>
                </div>

                {/* Toast Container for success/error messages */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddStaffForm;
