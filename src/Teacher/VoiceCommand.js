import React, { useState, useRef } from 'react';
import { FaMicrophone, FaStop, FaPaperPlane } from 'react-icons/fa'; // Importing icons from react-icons

const VoiceCommand = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState('');  // New state to store the transcription

  const mediaRecorderRef = useRef(null); // Using useRef to store mediaRecorder
  const audioChunks = useRef([]); // Using useRef to store audio chunks

  // Start recording audio
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
      setAudioBlob(blob);
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl);
      audioChunks.current = [];  // Clear the chunks for the next recording
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Mock transcription function (this is where you can integrate your speech-to-text API)
  const mockTranscription = () => {
    // Simulate transcription based on recorded audio
    // Replace this logic with actual transcription from a speech-to-text service like Google Speech-to-Text API
    return 'What is my math homework for tomorrow?';  // Mock transcription
  };

  // Submit the recorded audio and transcription to the backend
const handleSubmit = async () => {
    if (!audioBlob) {
      alert('Please record your voice first!');
      return;
    }
  
    // Use the mock transcription for now
    const transcriptionText = mockTranscription();
    setTranscription(transcriptionText);  // Store the transcription
  
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice-command.wav');
    formData.append('transcription', transcriptionText);  // Send transcription as well
  
    try {
      console.log('Sending request to backend...'); // Debugging log
      const response = await fetch('http://localhost:4000/api/teacher/voice-command', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Response status:', response.status); // Debugging log
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Debugging log
        alert(data.response);  // Display the response (command result)
      } else {
        alert('Failed to send voice command!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Voice Command</h1>

      {/* Start/Stop recording button */}
      <div className="flex justify-center items-center mb-6">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-4 rounded-full bg-blue-500 text-white transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none ${isRecording ? 'bg-red-500' : ''}`}
        >
          {isRecording ? <FaStop size={30} /> : <FaMicrophone size={30} />}
        </button>
      </div>

      {/* Audio playback section */}
      {audioUrl && (
        <div className="text-center mb-6">
          <audio src={audioUrl} controls className="w-full rounded-lg shadow-md" />
        </div>
      )}

      {/* Submit button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-700 transition duration-300 ease-in-out focus:outline-none"
        >
          <FaPaperPlane className="inline mr-2" size={20} />
          Submit Command
        </button>
      </div>

      {/* Display the transcription */}
      {transcription && (
        <div className="text-center mt-4">
          <p><strong>Transcription:</strong> {transcription}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceCommand;
