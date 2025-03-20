// /components/SettingsPage/PrivacySettings.jsx
import React, { useState } from "react";
import { Box, Typography, Divider, Switch, Button } from "@mui/material";
import Section from "../ReusableComponents/Section";

const PrivacySettings = () => {
  const [privateProfile, setPrivateProfile] = useState(false);

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
          Privacy
        </Typography>

        <Divider sx={{ mb: 3, backgroundColor: "var(--divider-color)" }} />

        <Switch
          checked={privateProfile}
          onChange={() => setPrivateProfile(!privateProfile)}
          color="primary"
          sx={{ mb: 2 }}
        />
        <Typography sx={{ color: "var(--text-color)" }}>
          Make Profile Private
        </Typography>

        <Divider sx={{ my: 3, backgroundColor: "var(--divider-color)" }} />

        <Button variant="outlined" color="primary" fullWidth sx={{ mb: 2 }}>
          Export Data
        </Button>

        <Button variant="contained" color="error" fullWidth>
          Delete Account
        </Button>
      </Box>
    </Section>
  );
};

export default PrivacySettings;
