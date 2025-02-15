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
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import Button from "../ReusableComponents/Button";
import { fetchSchedules, createSchedule, deleteSchedule } from "./api";
import ScheduleForm from "./ScheduleForm";
import { formatDate } from "../ReusableComponents/dateUtils";

const SchedulesList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadSchedules = async () => {
      setLoading(true);
      try {
        const data = await fetchSchedules();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  const handleDeleteClick = (schedule) => {
    setSelectedSchedule(schedule);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSchedule(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedSchedule) {
      try {
        await deleteSchedule(selectedSchedule.scheduleID);
        setSchedules((prev) => prev.filter((item) => item.scheduleID !== selectedSchedule.scheduleID));
      } catch (error) {
        console.error("Error deleting schedule:", error);
      }
    }
    handleClose();
  };

  // Add new schedule
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleAddSchedule = (createdSchedule) => {
    if (!createdSchedule) return;
    setSchedules((prev) => [...prev, createdSchedule]);
  };
  

  return (
    <Section>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Text variant="h5" weight="bold" color="primary" align="center">
          Upcoming Schedules
        </Text>
      </Box>

      <Grid container spacing={4}>
        {schedules.map((schedule) => (
          <Grid item xs={12} sm={6} md={4} key={schedule.scheduleID}>
            <Card sx={{ borderRadius: "16px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 2 }}>
                  <EventIcon sx={{ fontSize: "2rem", color: "#FF6F61" }} />
                </Box>
                <Text variant="h6" weight="bold" align="center">{schedule.title}</Text>
                <Text variant="body2" align="center">{formatDate(schedule.date)}</Text>
                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                  <Button onClick={() => console.log("Edit Schedule")} variant="secondary">Edit</Button>
                  <IconButton onClick={() => handleDeleteClick(schedule)} sx={{ marginLeft: 2 }}>
                    <DeleteIcon sx={{ color: "#FF6F61" }} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenForm}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          background:
            "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
          color: "#fff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
          "&:hover": {
            background:
              "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
          },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Add Schedule Form Dialog */}
      <ScheduleForm isOpen={isFormOpen} onClose={handleCloseForm} onSave={handleAddSchedule} />

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><Text variant="h6">Confirm Deletion</Text></DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this schedule?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="danger">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Section>
  );
};

export default SchedulesList;
