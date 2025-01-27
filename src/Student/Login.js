import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation after login
import { FaWhatsapp } from 'react-icons/fa';
import axios from "axios";

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // To navigate to another page after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://school-backend-1-2xki.onrender.com/api/students/login",
        {
          firstName: username,
          randomPassword: password,
        }
      );

      if (response.status === 200) {
        const { token, refreshToken, _id, firstName } = response.data; // Destructure the student data

        // Store tokens, student ID, and firstName in localStorage
        localStorage.setItem("accessToken", token); // Store access token
        localStorage.setItem("refreshToken", refreshToken); // Store refresh token
        localStorage.setItem("studentId", _id); // Store studentId
        localStorage.setItem("firstName", firstName); // Store student's first name

        // Redirect to the student dashboard or another page after login
        navigate("/student-dashboard"); // Change this to the correct route for your student dashboard
      }
    } catch (error) {
      // Handle error: show error message
      setErrorMessage("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex h-screen mt-8 justify-center items-center">
      <div className="flex flex-col lg:flex-row w-11/12 md:w-3/4 h-auto md:h-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Student Login</h2>
          <form onSubmit={handleSubmit} className="w-full sm:w-3/4">
            {errorMessage && (
              <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
            )}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Additional Button */}
          <div className="mt-4 w-3/4 mx-auto">
            <a
              href="https://wa.me/qr/P6PN4QJUSW3AN1?text=Hi,%20I%20need%20help%20with%20Student%20Login%20id/password."
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
            src="https://abcschool.institute.org.in/435abcschool/websites/ofcsch/school-theme-4/assets/images/login-bg.jpg"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
