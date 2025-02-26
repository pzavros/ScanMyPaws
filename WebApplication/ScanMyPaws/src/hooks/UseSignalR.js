import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_APP_API_BASE_URL}/notificationHub`, {
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("SignalR Connected"))
      .catch(err => console.error("SignalR Connection Error:", err));

    connection.on("ReceiveNotification", (data) => {
      setNotifications(prev => [...prev, data]);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return notifications;
};

export default useSignalR;
