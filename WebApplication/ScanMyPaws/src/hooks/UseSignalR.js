import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const useSignalR = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/notificationHub`, {
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true 
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
