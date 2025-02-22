import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "../Images/video.jpg";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

function GenerateMeeting() {
  const [roomId, setRoomId] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().slice(-4);
    setRoomId(randomId + timestamp);
  };

  const handleOneAndOneCall = () => {
    if (!roomId) {
      alert("Please Generate Room Id First");
      return;
    }
    navigate(`room/${roomId}?type=one-on-one`);
  };

  const handleGroupCall = () => {
    if (!roomId) {
      alert("Please Generate Room Id First");
      return;
    }
    navigate(`room/${roomId}?type=group-call`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform lg:transform-none lg:relative w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-blue-700 text-white p-4 shadow-lg w-full lg:hidden">
          <h1 className="text-lg font-bold">Live Classes</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl focus:outline-none">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Main Container */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-4xl flex flex-col md:flex-row items-center">
          {/* Form Section */}
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h1 className="text-2xl font-bold text-purple-800">Welcome!</h1>
            <p className="text-gray-600 mt-2">Start a video meeting call with a randomly generated Room ID</p>

            <div className="mt-4 flex items-center">
              <input
                type="text"
                className="w-full border rounded-l px-3 py-2 text-gray-700 bg-gray-100"
                placeholder="Generated Room ID"
                value={roomId}
                readOnly
              />
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r mx-4"
                onClick={handleRoomIdGenerate}
              >
                Generate
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
                onClick={handleOneAndOneCall}
                disabled={!roomId}
              >
                One-on-One Call
              </button>
              <button
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded"
                onClick={handleGroupCall}
                disabled={!roomId}
              >
                Group Call
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 w-full flex justify-center md:justify-end mt-6 md:mt-0">
            <img src={video} alt="Video Call" className="w-full max-w-sm rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateMeeting;
