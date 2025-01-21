import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For navigation after successful login

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://school-backend-1-2xki.onrender.com/api/teacher/login", {
        email,
        password,
      });

      // If login is successful, store tokens and teacherId
      if (response.status === 200) {
        const { token, refreshToken, _id } = response.data; // Destructure the teacher's _id from the response
        localStorage.setItem("accessToken", token); // Store access token
        localStorage.setItem("refreshToken", refreshToken); // Store refresh token
        localStorage.setItem("teacherId", _id); // Store teacherId (from _id)
        navigate("/teacher-dashboard"); // Redirect to teacher dashboard
      }
    } catch (error) {
      // Handle error: Show error message if login fails
      setErrorMessage("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center pt-10 pb-10 md:pt-20 md:pb-20 mt-8">
      <div className="flex flex-col lg:flex-row w-11/12 md:w-3/4 h-auto md:h-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Teacher Login</h2>
          <form className="w-full sm:w-3/4" onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
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
              href="https://wa.me/919111897177?text=Hi,%20I%20need%20help%20with%20Teacher%20Login%20credentials."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Ask for Login ID/Password
            </a>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.fbcd.co/products/resized/resized-750-500/2111-m11-i002-n012-s-c15-teach-mainpreview-f3758260af94a27e4f5248c588940dd1f3be1bf4277e800cf034e560f4f3821d.jpg"
            alt="Teacher Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
