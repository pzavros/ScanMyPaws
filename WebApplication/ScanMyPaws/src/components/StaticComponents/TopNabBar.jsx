import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Settings, HelpOutline, Logout, Person } from "@mui/icons-material";
import ThemeToggle from "../../contexts/ThemeToggle";

const TopNavbar = () => {
  const navigate = useNavigate();

  // State for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for the Profile Menu
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    // Check if the user is logged in (example using localStorage)
    const userToken = localStorage.getItem("token"); // Replace with your auth logic
    setIsLoggedIn(!!userToken);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token"); // Clear the token or session data
    setIsLoggedIn(false);
    handleMenuClose();
    navigate("/signin"); // Redirect to login page
  };

  const handleLogin = () => {
    navigate("/signin"); // Redirect to login page
    handleMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        boxShadow: "none",
        borderBottom: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile Menu Button */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
          aria-controls={isMenuOpen ? "profile-menu" : undefined}
          aria-haspopup="true"
          sx={{
            backgroundColor: "var(--card-background)",
            borderRadius: "50%",
            padding: "8px",
            "&:hover": {
              backgroundColor: "var(--card-hover)",
            },
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Person />
        </IconButton>

        {/* Profile Menu */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root": {
              color: "var(--text-color)",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              minWidth: "200px",
              border: "1px solid var(--divider-color)", // Border for better visibility
            },
          }}
        >
          {isLoggedIn ? (
            <>
              {/* Profile Section */}
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <Person fontSize="small" sx={{ color: "var(--primary-color)" }} />
                </ListItemIcon>
                Profile
              </MenuItem>

              <Divider sx={{ backgroundColor: "var(--divider-color)" }} />

              {/* Settings Section */}
              <MenuItem
                onClick={() => {
                  navigate("/settings");
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" sx={{ color: "var(--primary-color)" }} />
                </ListItemIcon>
                Settings
              </MenuItem>

              {/* Help Section */}
              <MenuItem
                onClick={() => {
                  navigate("/help");
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <HelpOutline fontSize="small" sx={{ color: "var(--primary-color)" }} />
                </ListItemIcon>
                Help
              </MenuItem>

              <Divider sx={{ backgroundColor: "var(--divider-color)" }} />

              {/* Logout Section */}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: "var(--error-color)" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleLogin}>
              <ListItemIcon>
                <Person fontSize="small" sx={{ color: "var(--primary-color)" }} />
              </ListItemIcon>
              Login
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
