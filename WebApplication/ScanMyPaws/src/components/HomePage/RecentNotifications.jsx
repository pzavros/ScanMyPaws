import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Paper } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchRecentNotifications } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const RecentNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchRecentNotifications();
      setNotifications(data);
    };

    loadNotifications();
  }, []);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>
          Recent Notifications
        </SectionTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px", // Spacing between notifications
          }}
        >
          {notifications.map((notification) => (
            <Paper
              key={notification.id}
              elevation={2}
              sx={{
                padding: "16px",
                borderRadius: "12px",
                backgroundColor: "var(--card-background)", // Match card background
                color: "var(--text-color)", // Text color
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Text variant="body1" fontWeight="bold" mb={0.5}>
                {notification.title}
              </Text>
              <Text variant="body2" sx={{ fontSize: "0.875rem", color: "var(--text-color)" }}>
                {notification.time}
              </Text>
            </Paper>
          ))}
        </Box>
      </Box>
    </Section>
  );
};

export default RecentNotifications;
