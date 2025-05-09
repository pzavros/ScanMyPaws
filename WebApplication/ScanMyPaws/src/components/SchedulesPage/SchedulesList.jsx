import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import AddIcon from "@mui/icons-material/Add";
import Section from "../ReusableComponents/Section";
import Button from "../ReusableComponents/Button";
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

            const now = new Date();

            const past = data.filter((schedule) => {
                const scheduleDateTime = new Date(schedule.date);
                const [hours, minutes, seconds] = schedule.time.split(":").map(Number);
                scheduleDateTime.setHours(hours, minutes, seconds);
                return scheduleDateTime < now;
            });

            const upcoming = data.filter((schedule) => {
                const scheduleDateTime = new Date(schedule.date);
                const [hours, minutes, seconds] = schedule.time.split(":").map(Number);
                scheduleDateTime.setHours(hours, minutes, seconds);
                return scheduleDateTime >= now;
            });

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

  const handleSaveSchedule = async (updatedSchedule) => {
    if (!updatedSchedule || !updatedSchedule.scheduleID) {
      console.error(" Error: Invalid schedule update request!", updatedSchedule);
      return;
    }
  
    const payload = {
      scheduleID: updatedSchedule.scheduleID,
      userID: updatedSchedule.userID,
      title: updatedSchedule.title,
      date: updatedSchedule.date,
      time: typeof updatedSchedule.time === "string" ? updatedSchedule.time : updatedSchedule.time.toString(),
      description: updatedSchedule.description,
      isCompleted: updatedSchedule.isCompleted,
    };
  
    try {
      console.log("Sending update request with:", payload);
      const response = await updateSchedule(payload);
      console.log("Update API Response:", response);
  
      if (response.status === 200) {
        setSchedules((prev) =>
          prev.map((item) =>
            item.scheduleID === updatedSchedule.scheduleID ? updatedSchedule : item
          )
        );
        handleCloseForm();
        window.location.reload();
      } else {
        console.error("Unexpected response from update API:", response);
      }
    } catch (error) {
      console.error("Error updating schedule:", error.response?.data || error.message);
    }
  };
  
  



  const handleDeleteClick = (schedule) => {
    if (!schedule || !schedule.scheduleID) {
      console.error("Error: Schedule ID is undefined!", schedule);
      return;
    }
    console.log(`Deleting schedule ID: ${schedule.scheduleID}`);
    setSelectedSchedule(schedule);
    setOpen(true);
  };
  
  

  const handleClose = () => {
    setOpen(false);
    setSelectedSchedule(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSchedule || !selectedSchedule.scheduleID) {
      console.error("Error: Trying to delete a schedule with an undefined ID");
      return;
    }
  
    try {
      console.log(`Sending DELETE request for scheduleID: ${selectedSchedule.scheduleID}`);
      await deleteSchedule(selectedSchedule.scheduleID);
  
      setUpcomingSchedules((prev) => prev.filter((item) => item.scheduleID !== selectedSchedule.scheduleID));
      setPastSchedules((prev) => prev.filter((item) => item.scheduleID !== selectedSchedule.scheduleID));
      setSchedules((prev) => prev.filter((item) => item.scheduleID !== selectedSchedule.scheduleID));
  
      console.log(`Schedule ${selectedSchedule.scheduleID} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      handleClose();
    }
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
        {tabIndex === 0 && upcomingSchedules.length === 0 ? (
          <Box sx={{ width: "100%", textAlign: "center", marginTop: 4 }}>
            <Typography variant="h6" sx={{ color: "var(--text-color)", fontStyle: "italic" }}>
              No upcoming schedules.
            </Typography>
          </Box>
        ) : tabIndex === 1 && pastSchedules.length === 0 ? (
          <Box sx={{ width: "100%", textAlign: "center", marginTop: 4 }}>
            <Typography variant="h6" sx={{ color: "var(--text-color)", fontStyle: "italic" }}>
              No past schedules.
            </Typography>
          </Box>
        ) : (
          (tabIndex === 0 ? upcomingSchedules : pastSchedules).map((schedule) => (
            <Grid item xs={12} sm={6} md={4} key={schedule.scheduleID}>
              <Card
                sx={{
                  position: "relative",
                  background: "linear-gradient(135deg, #FFB7C5, #92E6FF)",
                  borderRadius: "16px",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.25)",
                  },
                }}
              >
                <CardContent sx={{ position: "relative", zIndex: 2, padding: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                      height: 40,
                      background: "linear-gradient(135deg, #FFC1A1, #FF6F61)",
                      borderRadius: "50%",
                      margin: "0 auto 10px",
                      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <EventIcon sx={{ color: "#fff", fontSize: "1.2rem" }} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold" textAlign="center" color="var(--text-color)" marginBottom={0.5}>
                    {schedule.title}
                  </Typography>
                  <Typography variant="body2" textAlign="center" fontStyle="italic" color="var(--text-color)" marginBottom={1}>
                    {formatDate(schedule.date)}
                  </Typography>
                  <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 1 }}>
                    <IconButton onClick={() => handleEditClick(schedule)} sx={{ background: "rgba(255, 255, 255, 0.3)", color: "#FF6F61", "&:hover": { background: "#FFAB91" } }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(schedule)} sx={{ background: "rgba(255, 255, 255, 0.3)", color: "#FF6F61", "&:hover": { background: "#FFAB91" } }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this schedule? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button onClick={handleConfirmDelete} variant="contained" color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>

      <ScheduleForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveSchedule}
        selectedSchedule={selectedSchedule}
      />

      {/* Add button (+) */}
      <Button
        onClick={() => {
          setSelectedSchedule(null);
          setIsFormOpen(true);
        }}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          minWidth: "56px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          padding: 0,
          background:
            "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
          color: "#fff",
          borderRadius: "50px",
          "&:hover": {
            background:
              "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
          },
        }}
      >
        <AddIcon sx={{ fontSize: "2rem" }} />
      </Button>
    </Section>
  );
};

export default SchedulesList;
