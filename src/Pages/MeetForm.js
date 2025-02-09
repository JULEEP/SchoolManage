import React, { useState } from "react";
import form from "../Images/form.jpg";

const MeetForm = () => {
  const [formData, setFormData] = useState({
    teacherName: "",
    date: "",
    time: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://school-backend-1-2xki.onrender.com/api/admin/teacher-meeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Meeting details posted successfully!");
        setFormData({ teacherName: "", date: "", timing: "", link: "" }); // Reset form
      } else {
        setMessage(result.message || "Failed to post meeting details.");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg p-4 max-w-2xl">
        <div className="flex-1 flex flex-col items-center p-4">
          <h2 className="text-2xl font-bold mb-4">Meet Updates</h2>
          {message && (
            <p
              className={`${
                message.includes("success") ? "text-green-500" : "text-red-500"
              } text-sm mb-2`}
            >
              {message}
            </p>
          )}
          <form className="w-full space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="teacherName"
              placeholder="Teacher Name"
              value={formData.teacherName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="time"
              name="time"
              placeholder="Timing"
              value={formData.timing}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="url"
              name="link"
              placeholder="Meet Link"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
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