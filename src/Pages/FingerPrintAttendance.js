import React, { useState } from 'react';
import { FaFingerprint } from 'react-icons/fa';

const FingerprintAttendance = () => {
  const [scanStatus, setScanStatus] = useState('idle'); // 'idle', 'success', 'failed'
  const [message, setMessage] = useState('Place your finger on the scanner');
  const [userId, setUserId] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');

  const handleFingerTouch = () => {
    setMessage('Scanning...');
    setScanStatus('scanning');

    // Simulating fingerprint scan delay
    setTimeout(() => {
      const isMatch = Math.random() > 0.5; // Random success/fail simulation
      if (isMatch) {
        setScanStatus('success');
        setMessage('Fingerprint captured successfully!');
        markAttendance();
      } else {
        setScanStatus('failed');
        setMessage('Fingerprint not recognized. Try again.');
      }
    }, 3000);
  };

  const markAttendance = () => {
    // Logic to mark attendance (you could send the data to a server here)
    console.log('Attendance Marked for:', {
      userId,
      subject,
      date,
    });

    // Show success message after marking attendance
    setMessage('Attendance successfully marked!');
  };

  const getColor = () => {
    switch (scanStatus) {
      case 'success': return 'text-blue-500 border-blue-500';
      case 'failed': return 'text-red-500 border-red-500';
      case 'scanning': return 'text-yellow-500 border-yellow-500 animate-spin';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Fingerprint Attendance</h2>

        {/* User Information Form */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Fingerprint Scanner */}
        <div
          className={`w-24 h-24 flex justify-center items-center border-4 rounded-full cursor-pointer ${getColor()}`}
          onMouseDown={handleFingerTouch} // Simulating touch event
          onTouchStart={handleFingerTouch}
        >
          <FaFingerprint size={50} />
        </div>

        <p className="text-gray-700 font-medium mt-4">{message}</p>
      </div>
    </div>
  );
};

export default FingerprintAttendance;
