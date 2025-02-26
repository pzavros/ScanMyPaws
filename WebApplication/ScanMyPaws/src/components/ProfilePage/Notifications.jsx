import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { fetchUserNotifications } from "./api";
import * as signalR from "@microsoft/signalr";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchUserNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notifications.");
      }
    };

    loadNotifications();

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/notificationHub")
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log(" SignalR Connected"))
      .catch(err => console.error(" SignalR Connection Error:", err));

    connection.on("ReceiveNotification", (title, message) => {
      setNotifications(prev => [...prev, { title, message, date: new Date().toISOString() }]);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <List>
      {notifications.map((notification, index) => (
        <ListItem key={index}>
          <ListItemText primary={notification.title} secondary={notification.date} />
        </ListItem>
      ))}
    </List>
  );
};

export default Notifications;
