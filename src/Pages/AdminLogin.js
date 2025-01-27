import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://school-backend-1-2xki.onrender.com/api/admin/admin-login', { email, password });

      // If login is successful, store tokens and adminId
      if (response.status === 200) {
        const { token, refreshToken, _id } = response.data; // Destructure the admin's _id from the response
        localStorage.setItem('accessToken', token); // Store access token
        localStorage.setItem('refreshToken', refreshToken); // Store refresh token
        localStorage.setItem('adminId', _id); // Store adminId (from _id)
        localStorage.setItem('firstName', response.data.firstName); // Store admin's first name
        navigate('/Admin-dashboard'); // Redirect to admin dashboard
      }
    } catch (err) {
      // Handle error: Show error message if login fails
      setError('Invalid credentials or something went wrong.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex h-screen mt-8 justify-center items-center">
      <div className="flex flex-col lg:flex-row w-11/12 md:w-3/4 h-auto md:h-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <form className="w-full sm:w-3/4" onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Additional Button */}
          <div className="mt-4 mx-auto w-full sm:w-3/4">
            <a
              href="https://wa.me/919424977848?text=Hi,%20I%20need%20help%20with%20Admin%20Login%20id/password."
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
            >
              <FaWhatsapp size={20} className="mr-2 inline" />
              Ask for Login ID/Password
            </a>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://www.datamanagements.in/wp-content/uploads/2022/01/gif.gif"
            alt="Admin Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
