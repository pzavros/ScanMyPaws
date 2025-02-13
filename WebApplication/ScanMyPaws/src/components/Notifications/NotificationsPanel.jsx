import React, { useEffect, useState } from "react";
import { Box, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchUserNotifications, markNotificationAsRead } from "./api";

const NotificationsPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await fetchUserNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notificationID) => {
    await markNotificationAsRead(notificationID);
    setNotifications((prev) =>
      prev.map((n) =>
        n.notificationID === notificationID ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: 16,
        width: 350,
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        padding: 2,
        zIndex: 1300,
        display: isOpen ? "block" : "none",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Text variant="h6" weight="bold">Notifications</Text>
        <IconButton onClick={onClose} sx={{ color: "var(--text-color)" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", padding: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : notifications.length === 0 ? (
        <Text variant="body1" align="center">No notifications available.</Text>
      ) : (
        <Section>
          {notifications.map((notification) => (
            <Box
              key={notification.notificationID}
              sx={{
                padding: "12px",
                marginBottom: "8px",
                backgroundColor: notification.isRead ? "transparent" : "var(--hover-color)",
                borderRadius: "8px",
                transition: "background 0.3s",
                cursor: "pointer",
              }}
              onClick={() => handleNotificationClick(notification.notificationID)}
            >
              <Text variant="body1" weight="bold">{notification.title}</Text>
              <Text variant="body2">{notification.message}</Text>
              <Text variant="caption" color="gray">
                {new Date(notification.dateCreated).toLocaleString()}
              </Text>
            </Box>
          ))}
        </Section>
      )}
    </Box>
  );
};

export default NotificationsPanel;
