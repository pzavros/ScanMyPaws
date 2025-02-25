import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import InputField from "../ReusableComponents/InputField";
import Button from "../ReusableComponents/Button";
import { createSchedule, updateSchedule, getUserIDFromToken } from "./api";

const ScheduleForm = ({ isOpen, onClose, onSave, selectedSchedule }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    if (selectedSchedule) {
      setFormData({
        title: selectedSchedule.title || "",
        date: selectedSchedule.date ? selectedSchedule.date.split("T")[0] : "",
        time: selectedSchedule.time || "",
        description: selectedSchedule.description || "",
      });
    }
  }, [selectedSchedule]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const scheduleData = {
      scheduleID: selectedSchedule?.scheduleID ?? 0,
      userID: parseInt(getUserIDFromToken()),
      title: formData.title,
      date: new Date(formData.date).toISOString(),
      time: formData.time + ":00",
      description: formData.description,
    };
  
    try {
      let updatedSchedule;
      if (selectedSchedule) {
        updatedSchedule = await updateSchedule(scheduleData);
      } else {
        updatedSchedule = await createSchedule(scheduleData);
      }
  
      if (!updatedSchedule || !updatedSchedule.scheduleID) {
        console.error("Schedule creation failed, invalid scheduleID:", updatedSchedule);
        return;
      }
  
      onSave({ ...updatedSchedule, scheduleID: updatedSchedule.scheduleID });
  
      setFormData({ title: "", date: "", time: "", description: "" });
      onClose();
    } catch (error) {
      console.error("Failed to save schedule:", error);
    }
  };
  

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      // Apply a dark background + white text to the entire dialog
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        },
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        sx={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold">
          {selectedSchedule ? "Edit Schedule" : "Add New Schedule"}
        </Typography>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent
        sx={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              "& .MuiInputBase-root": {
                color: "var(--text-color)",
              },
              "& .MuiInputLabel-root": {
                color: "var(--text-color)",
              },
            }}
          />
          <InputField
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              "& .MuiInputBase-root": {
                color: "var(--text-color)",
              },
              "& .MuiInputLabel-root": {
                color: "var(--text-color)",
              },
            }}
          />
          <InputField
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              "& .MuiInputBase-root": {
                color: "var(--text-color)",
              },
              "& .MuiInputLabel-root": {
                color: "var(--text-color)",
              },
            }}
          />
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            sx={{
              "& .MuiInputBase-root": {
                color: "var(--text-color)",
              },
              "& .MuiInputLabel-root": {
                color: "var(--text-color)",
              },
            }}
          />
        </Box>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions
        sx={{
          padding: 2,
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          {selectedSchedule ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleForm;
