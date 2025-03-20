// /components/SettingsPage/LanguageSettings.jsx
import React, { useState } from "react";
import { Box, Typography, Divider, MenuItem, Select } from "@mui/material";
import Section from "../ReusableComponents/Section";

const availableLanguages = [
  { code: "en", label: "English" },
  { code: "el", label: "Ελληνικά (Greek)" },
];

const LanguageSettings = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
  };

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
          Language
        </Typography>

        <Divider sx={{ mb: 3, backgroundColor: "var(--divider-color)" }} />

        <Select
          value={language}
          onChange={handleLanguageChange}
          fullWidth
          sx={{
            backgroundColor: "var(--input-background)",
            borderRadius: "8px",
            color: "var(--text-color)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-border-color)",
            },
          }}
        >
          {availableLanguages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Section>
  );
};

export default LanguageSettings;
