import React from "react";

const guideData = [
  { icon: "https://media.baamboozle.com/uploads/images/398004/1652344734_36162_gif-url.gif", title: "Subjects", description: "View and manage all subjects available in your course." },
  { icon: "https://cdn.dribbble.com/users/4241563/screenshots/11874468/lottie-santi-daksa-project03.gif", title: "Homeworks", description: "Check assigned homework, due dates, and submissions." },
  { icon: "https://cdn.dribbble.com/users/957210/screenshots/2475142/untitled-2.gif", title: "Exams", description: "View upcoming exams, schedules, and results." },
  { icon: "https://cdn.pixabay.com/animation/2022/11/13/07/16/07-16-26-181_512.gif", title: "Teachers", description: "Find details about your teachers and their contact information." },
  { icon: "https://cdn.dribbble.com/users/1244169/screenshots/4494753/attendance_final.gif", title: "Attendance", description: "Monitor your attendance records and daily presence." },
  { icon: "https://i.pinimg.com/originals/fb/11/55/fb1155591460c455edf3ced130b127b9.gif", title: "Notice", description: "Stay updated with important school notices and announcements." },
  { icon: "https://media1.tenor.com/images/107e39e6cccecb07771733a383291bd9/tenor.gif?itemid=12632259", title: "Books", description: "Access recommended books and reading materials." },
  { icon: "https://i.gifer.com/Wdf9.gif", title: "Transport", description: "Check your school bus routes and transport details." },
  { icon: "https://www.bing.com/th/id/OGC.59346b4b5c80cc5cf0c483a27dfdcb36?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f1129235%2fscreenshots%2f3344482%2fgif03.gif&ehk=681MYbrM%2fq597jBw5ssf54CgRSsfohettd%2fV%2fTKmT%2bs%3d", title: "Routines", description: "View daily class routines and schedules." },
  { icon: "https://www.bing.com/th/id/OGC.f536b251e81ef82960690777ee76d243?pid=1.7&rurl=https%3a%2f%2fi.pinimg.com%2foriginals%2f80%2f04%2fe7%2f8004e78d9a4d63d94f3cff837e27790c.gif&ehk=CismETbhBNRq0HUnf6OoZs2GFprNe%2fl7vs6XwOpk%2bTY%3d", title: "Results", description: "Check your academic performance and report cards." },
  { icon: "https://cdn-icons-gif.flaticon.com/9908/9908553.gif", title: "My Fees", description: "View pending and completed fee payments." },
  { icon: "https://media.tenor.com/KnM_tzEvCrQAAAAC/holiday-season.gif", title: "Holidays", description: "See upcoming holidays and vacation schedules." }
];

export default function UserGuide() {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>Dashboard User Guide</h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "20px" }}>
        Welcome to your dashboard! Below is a brief guide on how to navigate and use different features effectively.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px", maxWidth: "900px", margin: "0 auto" }}>
        {guideData.map((item, index) => (
          <div key={index} style={{ padding: "15px", backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px", textAlign: "center" }}>
            <img src={item.icon} alt={item.title} style={{ width: "140px", height: "100px", display: "block", margin: "0 auto" }} />
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0" }}>{item.title}</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}