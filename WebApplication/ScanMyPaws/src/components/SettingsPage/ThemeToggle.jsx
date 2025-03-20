// /components/SettingsPage/SettingsComponent.jsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Section from "../ReusableComponents/Section";
import ThemeToggle from "../../contexts/ThemeToggle";

const SettingsComponent = () => {
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
          Settings
        </Typography>

        <Divider sx={{ mb: 3, backgroundColor: "var(--divider-color)" }} />

        {/* Dark Mode Toggle */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography sx={{ color: "var(--text-color)" }}>Enable Dark Mode</Typography>
          <ThemeToggle />
        </Box>
      </Box>
    </Section>
  );
};

export default SettingsComponent;
