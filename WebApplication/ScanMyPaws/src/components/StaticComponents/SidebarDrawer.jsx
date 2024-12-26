import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpIcon,
  Info as AboutIcon,
  Logout as LogoutIcon,
  Person as ProfileIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../contexts/ThemeToggle";

const SidebarDrawer = ({ isDrawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

  const accountItems = [
    { label: "Profile", icon: <ProfileIcon />, route: "/profile" },
    { label: "Notifications", icon: <NotificationsIcon />, route: "/notifications" },
  ];

  const appItems = [
    { label: "Settings", icon: <SettingsIcon />, route: "/settings" },
    { label: "Help", icon: <HelpIcon />, route: "/help" },
    { label: "About", icon: <AboutIcon />, route: "/about" },
  ];

  const handleNavigate = (route) => (event) => {
    navigate(route);
    toggleDrawer(false)(event);
  };

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          backgroundColor: currentTheme === "dark" ? "var(--background-color)" : "var(--background-color)",
          color: currentTheme === "dark" ? "var(--text-color)" : "var(--text-color)",
        },
      }}
    >
      <Box
        sx={{
          width: 250,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        role="presentation"
      >
        {/* Top Section */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              padding: "16px 0",
              borderBottom: "1px solid var(--divider-color)",
            }}
          >
            Menu
          </Typography>

          {/* Account Section */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                padding: "12px 16px",
                fontWeight: "bold",
                color: "var(--primary-color)",
              }}
            >
              Account
            </Typography>
            {accountItems.map((item, index) => (
              <Box
                key={index}
                onClick={handleNavigate(item.route)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "var(--hover-color)",
                  },
                }}
              >
                <Box sx={{ marginRight: 2 }}>{item.icon}</Box>
                <Typography>{item.label}</Typography>
              </Box>
            ))}
          </Box>
          <Divider sx={{ backgroundColor: "var(--divider-color)", margin: "8px 0" }} />

          {/* App Section */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                padding: "12px 16px",
                fontWeight: "bold",
                color: "var(--primary-color)",
              }}
            >
              Application
            </Typography>
            {appItems.map((item, index) => (
              <Box
                key={index}
                onClick={handleNavigate(item.route)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "var(--hover-color)",
                  },
                }}
              >
                <Box sx={{ marginRight: 2 }}>{item.icon}</Box>
                <Typography>{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <ThemeToggle />

        {/* Bottom Section */}
        {isLoggedIn && (
          <Box sx={{ padding: 2, borderTop: "1px solid var(--divider-color)" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogout}
              sx={{
                backgroundColor: "#FF6F61",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#E65C50",
                },
              }}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default SidebarDrawer;
