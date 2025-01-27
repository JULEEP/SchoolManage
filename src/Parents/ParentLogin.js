import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from 'react-icons/fa';


const ParentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    try {
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/parent/parent-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();

      // Save parentId to local storage
      localStorage.setItem("parentId", data.parentId);

      // Show success message
      setSuccess("Login successful!");

      // Navigate to the parent dashboard
      setTimeout(() => {
        navigate("/parent-dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen mt-8 justify-center items-center">
      <div className="flex flex-col lg:flex-row w-11/12 md:w-3/4 h-auto md:h-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Parent Login</h2>
          <form className="w-full sm:w-3/4" onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
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
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
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
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </form>

          {/* Additional Button */}
          <div className="mt-4 w-3/4 mx-auto">
          <a
            href="https://wa.me/qr/P6PN4QJUSW3AN1?text=Hi,%20I%20need%20help%20with%20Parent%20Login%20id/password."
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
            src="https://media.istockphoto.com/id/1388917753/vector/father-reading-a-book-to-his-children-flat-cartoon-vector-illustration-isolated.jpg?s=170667a&w=0&k=20&c=zirBVDy9cqpt3sfPC6NjQRx0MoQMWelpkM54ozyfB0g="
            alt="Parent Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;
