import React, { useEffect, useState } from 'react';

function Notifications({ notifications }) {
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    // Whenever a new notification comes in, update the state to show only the most recent one
    if (notifications.length > 0) {
      setCurrentNotification(notifications[notifications.length - 1]);
    }
  }, [notifications]); // This will run every time notifications change

  return (
    <div>
      <h2>Notifications</h2>
      {currentNotification ? (
        <div className="bg-yellow-200 p-2 mb-2 rounded">
          {currentNotification}
        </div>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
}

export default Notifications;
