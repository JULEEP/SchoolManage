import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "../Images/video.jpg"; 

function GenerateId() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
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
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-4xl flex flex-col md:flex-row items-center">
        
        {/* Form Section */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Live Classes</h1>
          <p className="text-gray-600 mt-2">Start a video call with a randomly generated Room ID</p>
          
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
  );
}

export default GenerateId;
