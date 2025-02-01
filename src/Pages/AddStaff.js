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
        <div className="flex min-h-screen bg-gray-100">
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
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Mobile Header */}
                <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
                    <h1 className="text-lg font-bold">Add Staff</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Main Form Area */}
                <div className={`ml-0 md:ml-64 bg-white rounded-lg p-6 shadow-lg w-full`}>
                    <h2 className="text-2xl text-blue-600 text-center mb-8">Add Staff Member</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information (4 fields per row) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="form-group">
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={staffData.firstName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={staffData.lastName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={staffData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={staffData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Position, Department, Gender, and DOB (4 fields per row) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="form-group">
                                <label className="block text-gray-700">Position</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={staffData.position}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={staffData.department}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={staffData.gender}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={staffData.dateOfBirth}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Joining Date, Salary, Employee ID, Profile Picture (4 fields per row) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="form-group">
                                <label className="block text-gray-700">Joining Date</label>
                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={staffData.joiningDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={staffData.salary}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Employee ID</label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={staffData.employeeId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700">Profile Picture URL</label>
                                <input
                                    type="text"
                                    name="profilePicture"
                                    value={staffData.profilePicture}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Address (4 fields per row) */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibld">Address</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="form-group">
                                    <label className="block text-gray-700">Street</label>
                                    <input
                                        type="text"
                                        name="address.street"
                                        value={staffData.address.street}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={staffData.address.city}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block text-gray-700">State</label>
                                    <input
                                        type="text"
                                        name="address.state"
                                        value={staffData.address.state}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block text-gray-700">Zip Code</label>
                                    <input
                                        type="text"
                                        name="address.zipCode"
                                        value={staffData.address.zipCode}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact (3 fields) */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Emergency Contact</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="form-group">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="emergencyContact.name"
                                        value={staffData.emergencyContact.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block text-gray-700">Relation</label>
                                    <input
                                        type="text"
                                        name="emergencyContact.relation"
                                        value={staffData.emergencyContact.relation}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        name="emergencyContact.phone"
                                        value={staffData.emergencyContact.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-8">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-purple-600 text-white rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Add Staff
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toastify Container */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default AddStaffForm;
