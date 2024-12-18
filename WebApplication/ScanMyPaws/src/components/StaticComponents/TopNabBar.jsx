import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Map route paths to page titles
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/pets":
        return "Pets";
      case "/notifications":
        return "Notifications";
      case "/planner":
        return "Planner";
      default:
        return "Scan My Paws";
    }
  };

  return (
    <AppBar position="sticky" elevation={1} sx={{ backgroundColor: "#ffffff", color: "#000" }}>
      <Toolbar>
        {/* Back Button */}
        <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        {/* Page Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          {getPageTitle()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
