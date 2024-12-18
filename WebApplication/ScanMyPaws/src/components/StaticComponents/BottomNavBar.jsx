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
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
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
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Pets" icon={<PetsIcon />} />
        <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="Planner" icon={<CalendarTodayIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
