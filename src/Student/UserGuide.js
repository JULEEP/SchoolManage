import React from "react";

const instructions = [
  {
    step: 1,
    title: "Navigate the Dashboard",
    description:
      "Use the dashboard menu to access various features such as Subjects, Exams, Attendance, and more. Each section provides necessary details related to your academics.",
  },
  {
    step: 2,
    title: "Check Important Notices",
    description:
      "Stay updated with school announcements and notifications in the Notice section. Ensure you check regularly for important updates.",
  },
  {
    step: 3,
    title: "View Your Attendance",
    description:
      "Monitor your daily attendance records and overall presence in classes. Reach out to the admin in case of discrepancies.",
  },
  {
    step: 4,
    title: "Manage Homework & Exams",
    description:
      "Check assigned homework, due dates, and upcoming exams. Ensure you submit assignments on time and prepare for tests accordingly.",
  },
  {
    step: 5,
    title: "Access Transport & Fees Details",
    description:
      "Check school transport routes and payment status of your fees in the respective sections of the dashboard.",
  },
];

export default function DashboardGuide() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        How to Use the Dashboard
      </h1>
      <p style={{ color: "#555", marginBottom: "30px" }}>
        Follow these simple steps to navigate and utilize the dashboard efficiently.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        {instructions.map((item) => (
          <div
            key={item.step}
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              textAlign: "left",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
              {item.step}. {item.title}
            </h2>
            <p style={{ color: "#666", fontSize: "16px" }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}