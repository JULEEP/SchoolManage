import React, { useState } from "react";
import form from "../Images/form.jpg";

const LiveClassForm = () => {
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    timing: "",
    subject: "",
    link: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      meetingLink: formData.link,
      class: formData.class,
      section: formData.section,
      meetingTime: new Date(formData.timing).toISOString(),
      subject: formData.subject
    };

    try {
      const response = await fetch("https://school-backend-1-2xki.onrender.com/api/teacher/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("Response:", result);
      alert("Meeting posted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post meeting.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg p-4 max-w-2xl">
        <div className="flex-1 flex flex-col items-center p-4">
          <h2 className="text-2xl font-bold mb-4">Live Class Updates</h2>
          <form className="w-full space-y-3" onSubmit={handleSubmit}>
            <input type="text" name="class" placeholder="Class" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="section" placeholder="Section" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="datetime-local" name="timing" placeholder="Timing" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="subject" placeholder="Subject" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="link" placeholder="Class Link" onChange={handleChange} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded">Post</button>
          </form>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src={form} alt="Class Update" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default LiveClassForm;
