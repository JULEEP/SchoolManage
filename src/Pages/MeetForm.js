import React, { useState } from "react";
import form from "../Images/form.jpg"

const MeetForm = () => {

  const [formData, setFormData] = useState({
    post: "",
    timing: "",
    link: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg p-4 max-w-2xl">
        <div className="flex-1 flex flex-col items-center p-4">
          <h2 className="text-2xl font-bold mb-4">Meet Updates</h2>
          <form className="w-full space-y-3" onSubmit={handleSubmit}>
            <input type="text" name="post" placeholder="Post" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="timing" placeholder="Timing" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="url" name="link" placeholder="Meet Link" onChange={handleChange} className="w-full p-2 border rounded" required />
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

export default MeetForm;