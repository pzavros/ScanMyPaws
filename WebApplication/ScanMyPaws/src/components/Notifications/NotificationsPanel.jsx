import React, { useEffect, useState } from "react";
import { 
  Box, IconButton, CircularProgress, Divider, Tabs, Tab 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchUserNotifications, markNotificationAsRead } from "./api";

const NotificationsPanel = ({ isOpen, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [upcomingNotifications, setUpcomingNotifications] = useState([]);
  const [pastNotifications, setPastNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifiedNotifications, setNotifiedNotifications] = useState(new Set());

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await fetchUserNotifications();
      
      if (!data || !data.upcoming || !data.past) {
        setUpcomingNotifications([]);
        setPastNotifications([]);
        return;
      }

      setUpcomingNotifications(data.upcoming);
      setPastNotifications(data.past);
      scheduleNotifications(data.upcoming);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setUpcomingNotifications([]);
      setPastNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Schedule notifications only at the right time
   */
  const scheduleNotifications = (notifications = []) => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;

    notifications.forEach((notif) => {
      if (!notif.isRead && notif.scheduledTime) {
        const scheduledTimestamp = new Date(notif.scheduledTime).getTime();
        const currentTimestamp = Date.now();

        if (scheduledTimestamp <= currentTimestamp && !notifiedNotifications.has(notif.notificationID)) {
          triggerNotification(notif);
        } else if (scheduledTimestamp > currentTimestamp) {
          setTimeout(() => {
            triggerNotification(notif);
          }, scheduledTimestamp - currentTimestamp);
        }
      }
    });
  };

  /**
   * Show browser notification
   */
  const triggerNotification = (notif) => {
    if (!notifiedNotifications.has(notif.notificationID)) {
      new Notification(notif.title, {
        body: notif.message,
        icon: "/favicon.ico",
      });

      setNotifiedNotifications((prev) => new Set([...prev, notif.notificationID]));
    }
  };

  /**
   * Mark a notification as read and move it to past notifications
   */
  const handleNotificationClick = async (notification) => {
    try {
      await markNotificationAsRead(notification.notificationID);

      setUpcomingNotifications((prev) => prev.filter((n) => n.notificationID !== notification.notificationID));

      setPastNotifications((prev) => [
        { ...notification, isRead: true },
        ...prev,
      ]);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = async () => {
    try {
      await Promise.all(
        upcomingNotifications
          .filter((notif) => !notif.isRead)
          .map((notif) => markNotificationAsRead(notif.notificationID))
      );

      setPastNotifications((prev) => [
        ...upcomingNotifications.map((n) => ({ ...n, isRead: true })),
        ...prev,
      ]);
      setUpcomingNotifications([]);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  /**
   * Handle tab change between Upcoming and Past
   */
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: 16,
        width: 380,
        maxHeight: "80vh",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        padding: 2,
        zIndex: 1300,
        overflowY: "auto",
        display: isOpen ? "block" : "none",
      }}
    >
      {/* Panel Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Text variant="h6" weight="bold">Notifications</Text>
        <Box>
          <IconButton onClick={markAllAsRead} sx={{ color: "var(--text-color)", mr: 1 }}>
            ✔️
          </IconButton>
          <IconButton onClick={onClose} sx={{ color: "var(--text-color)" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Tabs for Upcoming & Past Notifications */}
      <Tabs 
        value={tabIndex} 
        onChange={handleTabChange} 
        textColor="inherit" 
        indicatorColor="primary" 
        variant="fullWidth"
      >
        <Tab label="Upcoming" />
        <Tab label="Past" />
      </Tabs>

      {/* Notifications Content */}
      {loading ? (
        <Box sx={{ textAlign: "center", padding: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Section>
          {tabIndex === 0 ? (
            // Upcoming Notifications
            upcomingNotifications.length === 0 ? (
              <Text variant="body1" align="center">No upcoming notifications.</Text>
            ) : (
              upcomingNotifications.map((notification) => (
                <Box key={notification.notificationID}
                  onClick={() => handleNotificationClick(notification)}
                  sx={{ padding: "12px", backgroundColor: "var(--hover-color)", borderRadius: "8px", cursor: "pointer" }}
                >
                  <Text variant="body1" weight="bold">{notification.title}</Text>
                  <Text variant="body2">{notification.message}</Text>
                  <Text variant="caption" color="gray">
                    {new Date(notification.dateCreated).toLocaleString()}
                  </Text>
                </Box>
              ))
            )
          ) : (
            // Past Notifications
            pastNotifications.length === 0 ? (
              <Text variant="body1" align="center">No past notifications.</Text>
            ) : (
              pastNotifications.map((notification) => (
                <Box key={notification.notificationID} sx={{ padding: "12px", borderRadius: "8px" }}>
                  <Text variant="body1" weight="bold">{notification.title}</Text>
                  <Text variant="body2">{notification.message}</Text>
                  <Text variant="caption" color="gray">
                    {new Date(notification.dateCreated).toLocaleString()}
                  </Text>
                </Box>
              ))
            )
          )}
        </Section>
      )}
    </Box>
  );
};

export default NotificationsPanel;
