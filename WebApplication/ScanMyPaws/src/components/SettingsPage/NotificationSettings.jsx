// /components/SettingsPage/NotificationSettings.jsx
import React, { useState } from "react";
import { Box, Typography, Divider, Switch, FormControlLabel } from "@mui/material";
import Section from "../ReusableComponents/Section";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);

  return (
    <Section>
      <Box
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "16px",
          backgroundColor: "var(--card-background)",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: "bold",
            color: "var(--primary-color)",
          }}
        >
          Notifications
        </Typography>

        <Divider sx={{ mb: 3, backgroundColor: "var(--divider-color)" }} />

        <FormControlLabel
          control={
            <Switch
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              color="primary"
            />
          }
          label={
            <Typography sx={{ color: "var(--text-color)" }}>
              Enable Email Notifications
            </Typography>
          }
          sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={appNotifications}
              onChange={() => setAppNotifications(!appNotifications)}
              color="primary"
            />
          }
          label={
            <Typography sx={{ color: "var(--text-color)" }}>
              Enable App Notifications
            </Typography>
          }
          sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
        />
      </Box>
    </Section>
  );
};

export default NotificationSettings;
