import React, { useEffect, useRef, useState } from 'react';
import { FaBus } from 'react-icons/fa'; // Bus icon for stops

const BusRouteMap = ({ routeData }) => {
  const mapRef = useRef(null); // Reference to the map container
  const busRef = useRef(null); // Bus icon reference for animation
  const [busPosition, setBusPosition] = useState(0); // Bus position along the route

  // Function to create polyline (route line) between stops
  const createRouteLine = (map, stops) => {
    const path = stops.map(stop => ({ lat: stop.lat, lng: stop.lng }));
    return new window.google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    }).setMap(map);
  };

  useEffect(() => {
    // Initialize Google Map
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 12.9716, lng: 77.5946 }, // Default center coordinates (Bangalore, India)
      zoom: 10, // Default zoom level
    });

    // Create route line between stops
    createRouteLine(map, routeData);

    // Place the bus icon at the starting position
    const busIcon = new window.google.maps.Marker({
      position: routeData[0], // Start position
      map,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#00FF00',
        fillOpacity: 1,
        strokeWeight: 2,
        scale: 5,
      },
    });

    // Animate the bus along the route
    const busPath = routeData.map(stop => new window.google.maps.LatLng(stop.lat, stop.lng));
    let busIndex = 0;

    const animateBus = () => {
      if (busIndex < busPath.length - 1) {
        busIndex += 1;
        busIcon.setPosition(busPath[busIndex]); // Move bus to the next stop
      }
    };

    const interval = setInterval(animateBus, 1000); // Adjust animation speed here

    // Clean up the interval on unmount
    return () => clearInterval(interval);

  }, [routeData]);

  return (
    <div style={{ height: '400px', width: '100%' }} ref={mapRef}>
      {/* Bus icon animation will be handled by the map */}
    </div>
  );
};

export default BusRouteMap;
