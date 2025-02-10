import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (userId) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/notificationHub")
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("✅ SignalR Connected"))
      .catch(err => console.error("❌ SignalR Connection Error:", err));

    connection.on("ReceiveNotification", (title, message) => {
      setNotifications(prev => [...prev, { title, message }]);
    });

    return () => {
      connection.stop();
    };
  }, [userId]);

  return notifications;
};

export default useSignalR;
