import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerServiceWorker } from "./serviceWorkerRegistration";

// Service Worker Register Karein
registerServiceWorker();




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker Se Message Receive Karna
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data && event.data.type === "ADD_BUTTON") {
      addButtonToPage();
    }
  });
}

// Button Dynamically Add Karne Ka Function
function addButtonToPage() {
  if (!document.getElementById("dynamicButton")) {
    const btn = document.createElement("button");
    btn.id = "dynamicButton";
    btn.innerText = "Click Me!";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.padding = "10px 20px";
    btn.style.background = "#6200ea";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      alert("Button Clicked!");
    });

    document.body.appendChild(btn);
  }
}

// React App Render Karein
