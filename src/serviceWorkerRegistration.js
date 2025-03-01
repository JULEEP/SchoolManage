export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then((registration) => {
          console.log("✅ Service Worker Registered Successfully:", registration);
  
          // Service Worker ko Message Send Karein
          if (registration.active) {
            registration.active.postMessage({ type: "SHOW_BUTTON" });
          }
        })
        .catch((error) => {
          console.error("❌ Service Worker Registration Failed:", error);
        });
    }
  }
  