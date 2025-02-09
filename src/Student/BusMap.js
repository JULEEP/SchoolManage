import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🚌 Custom Bus Icon
const busIcon = new L.Icon({
  iconUrl: "https://cdn2.iconfinder.com/data/icons/map-and-location-filloutline-1/64/bus_station-Map-location-store-pin-1024.png", // Bus icon URL
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Center bottom anchor
  popupAnchor: [0, -45], // Popup will appear above the icon
});

function BusMap({ busLocation }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Remove old instance if exists
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Initialize the map
    mapRef.current = L.map(mapContainerRef.current).setView([busLocation.lat, busLocation.lng], 15);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Add bus marker with custom icon
    L.marker([busLocation.lat, busLocation.lng], { icon: busIcon })
      .addTo(mapRef.current)
      .bindPopup("<b>🚍 Bus is here!</b>") // Bold text in popup
      .openPopup();

  }, [busLocation]);

  return <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />;
}

export default BusMap;
