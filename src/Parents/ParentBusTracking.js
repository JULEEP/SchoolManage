import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ParentSidebar from "./ParentSidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const socket = io("https://school-backend-1-2xki.onrender.com");

const busIcon = new L.Icon({
  iconUrl:
    "https://cdn2.iconfinder.com/data/icons/map-and-location-filloutline-1/64/bus_station-Map-location-store-pin-1024.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -45],
});

function ParentBusTracking() {
  const [notifications, setNotifications] = useState([]);
  const [busLocation, setBusLocation] = useState({ lat: 17.385, lng: 78.4867, stop: "Starting Point" });
  const [busRoute, setBusRoute] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    fetch("https://school-backend-1-2xki.onrender.com/api/bus/check-bus-notifications/B-107")
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) {
          setNotifications(data.notifications);
          updateBusLocation(data.notifications);
        }
      })
      .catch((err) => console.error("Error fetching bus notifications:", err));
  }, []);

  useEffect(() => {
    fetch("https://school-backend-1-2xki.onrender.com/api/bus/location/B-107")
      .then((res) => res.json())
      .then((data) => {
        if (data.route) setBusRoute(data.route);
      })
      .catch((err) => console.error("Error fetching bus route:", err));
  }, []);

  const updateBusLocation = (notifications) => {
    if (!busRoute.length || notifications.length === 0) return;
    const latestMessage = notifications[notifications.length - 1];
    const match = latestMessage.match(/at (.+?) at/);
    if (!match) return;
    const stopName = match[1];
    const stop = busRoute.find((s) => s.stopName === stopName);
    if (stop) {
      setBusLocation({ lat: stop.lat, lng: stop.lng, stop: stop.stopName });
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([busLocation.lat, busLocation.lng], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
      markerRef.current = L.marker([busLocation.lat, busLocation.lng], { icon: busIcon })
        .addTo(mapRef.current)
        .bindPopup(`<b>🚍 Bus is near ${busLocation.stop}</b>`)
        .openPopup();
    } else {
      markerRef.current.setLatLng([busLocation.lat, busLocation.lng])
        .setPopupContent(`<b>🚍 Bus is near ${busLocation.stop}</b>`)
        .openPopup();
      mapRef.current.setView([busLocation.lat, busLocation.lng]);
    }
  }, [busLocation]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      <ParentSidebar />
    </div>
  
    {/* Main Content */}
    <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} h-screen`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
        <h1 className="text-lg font-bold">Bus Tracking</h1>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
        <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-1/3 p-4 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h3>
            {notifications.length > 0 ? (
              notifications.map((msg, index) => (
                <div key={index} className="bg-yellow-200 p-2 mb-2 rounded">{msg}</div>
              ))
            ) : (
              <p>No notifications yet.</p>
            )}
          </div>
          <div className="w-full lg:w-2/3 p-4 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Bus Map</h3>
            <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentBusTracking;
