import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { fetchUserNotifications } from "./api";

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
  }, []);

  return (
    <List>
      {notifications.map((notification) => (
        <ListItem key={notification.id}>
          <ListItemText primary={notification.title} secondary={notification.date} />
        </ListItem>
      ))}
    </List>
  );
};

export default Notifications;
