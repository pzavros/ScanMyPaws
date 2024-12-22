import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which tab is active based on the current URL path
  const getActiveTab = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/pets":
        return 1;
      case "/notifications":
        return 2;
      case "/planner":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "var(--background-color)", // Match page background color
          borderTop: "none", // Remove the border to avoid the line above the navbar
          height: "64px", // Explicit height for spacing
        }}
      >
        <BottomNavigation
          value={getActiveTab()}
          onChange={(event, newValue) => {
            switch (newValue) {
              case 0:
                navigate("/");
                break;
              case 1:
                navigate("/pets");
                break;
              case 2:
                navigate("/notifications");
                break;
              case 3:
                navigate("/planner");
                break;
              default:
                navigate("/");
            }
          }}
          showLabels
          sx={{
            backgroundColor: "transparent", // Transparent to blend with the Paper
            "& .Mui-selected": {
              color: "var(--primary-color)", // Use primary color for selected tab
              fontWeight: "bold", // Emphasize selected tab
              backgroundColor: "transparent !important", // Remove hover effect for the selected tab
            },
            "& .MuiBottomNavigationAction-root": {
              color: "var(--text-color)", // Default color for unselected tabs
              "&:hover": {
                backgroundColor: "transparent", // Remove hover background effect
              },
            },
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Pets" icon={<PetsIcon />} />
          <BottomNavigationAction
            label="Notifications"
            icon={<NotificationsIcon />}
          />
          <BottomNavigationAction label="Planner" icon={<CalendarTodayIcon />} />
        </BottomNavigation>
      </Paper>

      {/* Add padding to prevent overlap */}
      <div
        style={{
          paddingBottom: "64px", // Same height as the navbar
        }}
      />
    </>
  );
};

export default BottomNavbar;
