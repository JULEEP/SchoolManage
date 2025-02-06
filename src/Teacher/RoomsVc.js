import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SECRET } from "../config";

function RoomsVc() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [callType, setCallType] = useState(""); // State to store the call type

  // Initialize ZegoUIKit and join room on component mount
  const myMeeting = (type) => {
    const appID = APP_ID;
    const serverSecret = SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Your Name"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "Video Call Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?type=" + encodeURIComponent(type),
        },
      ],
      scenario: {
        mode:
          type === "one-on-one"
            ? ZegoUIKitPrebuilt.OneONoneCall
            : ZegoUIKitPrebuilt.GroupCall,
      },
      maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        navigate("/");
      },
    });
  };

  // Handle exit from the room
  const handleExit = () => {
    if (zpRef.current) {
      zpRef.current.destroy();
    }
    navigate("/teacher-dashboard");
  };

  // On component mount, extract call type from location and initialize meeting
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");

    setCallType(type); // Update state with call type
  }, [location.search]);

  // Initialize meeting after callType state is set
  useEffect(() => {
    // Request for camera and microphone access before joining the room
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(() => {
        if (callType) {
          myMeeting(callType); // Proceed to join room after permissions are granted
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices", error);
        // Handle permission denial or error
      });

    // Cleanup function for component unmount
    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [callType, roomId, navigate]);

  return (
    <div className="flex flex-col h-screen">
      {!joined && (
        <>
          <header className="bg-gray-800 text-white text-center py-4 text-xl font-semibold">
            {callType === "one-on-one" ? "One-on-One Video Call" : "Group Video Call"}
          </header>
          <button 
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md"
            onClick={handleExit}
          >
            Exit
          </button>
        </>
      )}
      <div ref={videoContainerRef} className="flex-1 flex justify-center items-center h-[calc(100vh-3rem)]" />
    </div>
  );
}

export default RoomsVc;
