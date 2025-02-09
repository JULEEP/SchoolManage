// /src/components/Admin/BusForm.jsx

import React, { useState } from 'react';

function BusForm() {
  const [busNumber, setBusNumber] = useState('');
  const [stopName, setStopName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [route, setRoute] = useState([]);

  const handleAddStop = () => {
    setRoute([...route, { stopName, lat, lng }]);
    setStopName('');
    setLat('');
    setLng('');
  };

  const handleSubmit = async () => {
    const data = { busNumber, route };
    const response = await fetch('https://school-backend-1-2xki.onrender.com/api/bus/update-location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Bus Number"
        value={busNumber}
        onChange={(e) => setBusNumber(e.target.value)}
        className="border px-2 py-1"
      />
      <input
        type="text"
        placeholder="Stop Name"
        value={stopName}
        onChange={(e) => setStopName(e.target.value)}
        className="border px-2 py-1"
      />
      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        className="border px-2 py-1"
      />
      <input
        type="number"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        className="border px-2 py-1"
      />
      <button onClick={handleAddStop}>Add Stop</button>
      <ul>
        {route.map((stop, index) => (
          <li key={index}>
            {stop.stopName} - {stop.lat}, {stop.lng}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit Bus Location</button>
    </div>
  );
}

export default BusForm;
