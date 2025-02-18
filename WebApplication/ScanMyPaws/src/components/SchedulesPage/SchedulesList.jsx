import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  Box,
  Typography,
  Tabs,
  Tab,
  Fab, // ✅ Floating Action Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import AddIcon from "@mui/icons-material/Add"; // ✅ Add Icon
import Section from "../ReusableComponents/Section";
import { fetchSchedules, deleteSchedule, updateSchedule } from "./api";
import ScheduleForm from "./ScheduleForm";
import { formatDate } from "../ReusableComponents/dateUtils";

const SchedulesList = () => {
  const [schedules, setSchedules] = useState([]);
  const [pastSchedules, setPastSchedules] = useState([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const data = await fetchSchedules();
        const today = new Date();

        const past = data.filter((schedule) => new Date(schedule.date) < today);
        const upcoming = data.filter((schedule) => new Date(schedule.date) >= today);

        setPastSchedules(past);
        setUpcomingSchedules(upcoming);
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    loadSchedules();
  }, []);

  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedSchedule(null);
  };

  const handleAddSchedule = () => {
    setSelectedSchedule(null); // ✅ Ensure new form starts fresh
    setIsFormOpen(true);
  };

  const handleSaveSchedule = async (updatedSchedule) => {
    try {
      const fullSchedule = {
        scheduleID: updatedSchedule.scheduleID,
        userID: updatedSchedule.userID,
        title: updatedSchedule.title || selectedSchedule?.title,
        date: updatedSchedule.date ? new Date(updatedSchedule.date).toISOString() : selectedSchedule?.date,
        time: updatedSchedule.time || selectedSchedule?.time,
        description: updatedSchedule.description || selectedSchedule?.description,
        isCompleted: updatedSchedule.isCompleted !== undefined ? updatedSchedule.isCompleted : selectedSchedule?.isCompleted,
      };

      const response = await updateSchedule(fullSchedule);
      if (response) {
        setSchedules((prev) =>
          prev.map((item) => (item.scheduleID === updatedSchedule.scheduleID ? fullSchedule : item))
        );

        setPastSchedules((prev) =>
          prev.map((item) => (item.scheduleID === updatedSchedule.scheduleID ? fullSchedule : item))
        );
        setUpcomingSchedules((prev) =>
          prev.map((item) => (item.scheduleID === updatedSchedule.scheduleID ? fullSchedule : item))
        );

        handleCloseForm();
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleDeleteClick = (schedule) => {
    setSelectedSchedule(schedule);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSchedule(null);
  };

  return (
    <Section>
      {/* Title Section */}
      <Box textAlign="center" marginBottom={4}>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #FFC1A1, #FF6F61)",
            borderRadius: "50%",
            marginBottom: 1,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <EventIcon sx={{ color: "#fff", fontSize: "1.8rem" }} />
        </Box>
        <Typography variant="h5" fontWeight="bold" color="var(--text-color)" marginBottom={1}>
          My Schedules
        </Typography>
      </Box>

      {/* Tabs for Upcoming & Past Schedules */}
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#FF6F61",
          },
          "& .MuiTab-root": {
            color: "var(--text-color)",
          },
          "& .Mui-selected": {
            color: "#FF6F61 !important",
            backgroundColor: "transparent !important",
          },
        }}
      >
        <Tab label="Upcoming Schedules" />
        <Tab label="Past Schedules" />
      </Tabs>

      {/* Schedule Grid */}
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {(tabIndex === 0 ? upcomingSchedules : pastSchedules).map((schedule) => (
          <Grid item xs={12} sm={6} md={4} key={schedule.scheduleID}>
            <Card
              sx={{
                position: "relative",
                background: "linear-gradient(135deg, #FFB7C5, #92E6FF)",
                borderRadius: "16px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <CardContent sx={{ position: "relative", zIndex: 2, padding: 2 }}>
                <Typography variant="h6" fontWeight="bold" textAlign="center" color="var(--text-color)" marginBottom={0.5}>
                  {schedule.title}
                </Typography>
                <Typography variant="body2" textAlign="center" fontStyle="italic" color="var(--text-color)" marginBottom={1}>
                  {formatDate(schedule.date)}
                </Typography>
                <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 1 }}>
                  <IconButton onClick={() => handleEditClick(schedule)} sx={{ color: "#FF6F61" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(schedule)} sx={{ color: "#FF6F61" }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Restored Floating "Add Notification" Button at Bottom Right */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddSchedule} // ✅ Now it opens the form
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
          },
        }}
      >
        <AddIcon />
      </Fab>

      {/* ✅ Schedule Form - Opens on Add/Edit */}
      <ScheduleForm isOpen={isFormOpen} onClose={handleCloseForm} onSave={handleSaveSchedule} selectedSchedule={selectedSchedule} />
    </Section>
  );
};

export default SchedulesList;
