import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Typography, Modal, Paper } from "@mui/material";
import { Menu as MenuIcon, Home as HomeIcon, Pets as PetsIcon, Notifications as NotificationsIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarDrawer from "./SidebarDrawer";
import NotificationsPanel from "../Notifications/NotificationsPanel";

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route to determine the active page
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const closeNotifications = () => {
    setNotificationsOpen(false); // Ensure it actually closes
  };

  const navItems = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Pets", icon: <PetsIcon />, path: "/pets" },
  ];

  return (
    <>
      {/* Top AppBar */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Hamburger Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {navItems.map((item, index) => (
              <Box
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                  color: location.pathname === item.path ? "var(--primary-color)" : "var(--text-color)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    backgroundColor: location.pathname === item.path ? "var(--hover-color)" : "transparent",
                    borderRadius: "24px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.3s ease",
                      transform:
                        location.pathname === item.path ? "translateX(-8px)" : "translateX(0)",
                    }}
                  >
                    {item.icon}
                  </Box>
                  {location.pathname === item.path && (
                    <Typography
                      sx={{
                        marginLeft: "8px",
                        opacity: 1,
                        transition: "opacity 0.3s ease",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.label}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}

            {/* Notifications Icon */}
            <Box
              onClick={toggleNotifications}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
                color: "var(--text-color)", // Match the theme color for visibility
                "&:hover": {
                  color: "var(--primary-color)", // Highlight on hover
                },
              }}
            >
              <IconButton>
                <NotificationsIcon sx={{ color: "var(--text-color)" }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <SidebarDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      {/* Notifications Modal */}
      <NotificationsPanel isOpen={isNotificationsOpen} onClose={closeNotifications} />
    </>
  );
};

export default TopNavbar;
  