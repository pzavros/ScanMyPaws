// Updated RecentNotifications.js
import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchRecentNotifications } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const RecentNotifications = ({ petId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      if (petId) {
        const data = await fetchRecentNotifications(petId);
        setNotifications(data);
      }
    };

    loadNotifications();
  }, [petId]);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Recent Notifications</SectionTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {notifications.length === 0 ? (
            <Text>No recent notifications.</Text>
          ) : (
            notifications.map((notification, index) => (
              <Paper
                key={notification.notificationID || notification.id || index} // ✅ Unique key fix
                elevation={2}
                sx={{
                  padding: "16px",
                  borderRadius: "12px",
                  backgroundColor: "var(--card-background)",
                  color: "var(--text-color)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text variant="body1" fontWeight="bold" mb={0.5}>
                  {notification.title}
                </Text>
                <Text
                  variant="body2"
                  sx={{ fontSize: "0.875rem", color: "var(--text-color)" }}
                >
                  {notification.time}
                </Text>
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Section>
  );
};

export default RecentNotifications;
