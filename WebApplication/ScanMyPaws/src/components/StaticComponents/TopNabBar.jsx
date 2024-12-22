import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../../contexts/ThemeToggle";

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      <Toolbar>
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile Menu Button */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
          aria-controls={isMenuOpen ? "profile-menu" : undefined}
          aria-haspopup="true"
        >
          👤
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
        >
          {isLoggedIn ? (
            <>
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  handleMenuClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
