import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Box } from "@mui/material";
import { Brightness7, Brightness3 } from "@mui/icons-material"; 

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        width: 50,
        height: 24,
        backgroundColor: theme === "light" ? "#e0e0e0" : "#333",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onClick={toggleTheme}
    >
      {/* Moon Icon */}
      <Brightness3
        sx={{
          fontSize: 16,
          color: theme === "light" ? "#9e9e9e" : "#ffcc00",
          opacity: theme === "light" ? 0.5 : 1,
          transition: "opacity 0.3s ease, color 0.3s ease",
        }}
      />

      {/* Sun Icon */}
      <Brightness7
        sx={{
          fontSize: 16,
          color: theme === "light" ? "#ffcc00" : "#9e9e9e",
          opacity: theme === "light" ? 1 : 0.5,
          transition: "opacity 0.3s ease, color 0.3s ease",
        }}
      />

      {/* Thumb */}
      <Box
        sx={{
          position: "absolute",
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: theme === "light" ? "#fff" : "#ffcc00",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease, background-color 0.3s ease",
          transform: theme === "light" ? "translateX(0)" : "translateX(26px)",
        }}
      />
    </Box>
  );
};

export default ThemeToggle;
